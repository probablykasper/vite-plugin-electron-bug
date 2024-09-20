import fs from 'node:fs'
import path from 'node:path'
import cp from 'node:child_process'
import type { AddressInfo } from 'node:net'
import { builtinModules } from 'node:module'
import {
  type InlineConfig,
  type ViteDevServer,
  mergeConfig,
} from 'vite'
import type { ElectronOptions } from '.'

export interface PidTree {
  pid: number
  ppid: number
  children?: PidTree[]
}

/** Resolve the default Vite's `InlineConfig` for build Electron-Main */
export function resolveViteConfig(options: ElectronOptions): InlineConfig {
  const packageJson = resolvePackageJson() ?? {}
  const esmodule = packageJson.type === 'module'
  const defaultConfig: InlineConfig = {
    // 🚧 Avoid recursive build caused by load config file
    configFile: false,
    publicDir: false,

    build: {
      // @ts-ignore
      lib: options.entry && {
        entry: options.entry,
        // Since Electron(28) supports ESModule
        formats: esmodule ? ['es'] : ['cjs'],
        fileName: () => '[name].js',
      },
      outDir: 'dist-electron',
      // Avoid multiple entries affecting each other
      emptyOutDir: false,
    },
    resolve: {
      // @ts-ignore
      browserField: false,
      conditions: ['node'],
      // #98
      // Since we're building for electron (which uses Node.js), we don't want to use the "browser" field in the packages.
      // It corrupts bundling packages like `ws` and `isomorphic-ws`, for example.
      mainFields: ['module', 'jsnext:main', 'jsnext'],
    },
    define: {
      // @see - https://github.com/vitejs/vite/blob/v5.0.11/packages/vite/src/node/plugins/define.ts#L20
      'process.env': 'process.env',
    },
  }

  return mergeConfig(defaultConfig, options?.vite || {})
}

export function withExternalBuiltins(config: InlineConfig) {
  const builtins = builtinModules.filter(e => !e.startsWith('_')); builtins.push('electron', ...builtins.map(m => `node:${m}`))

  config.build ??= {}
  config.build.rollupOptions ??= {}

  let external = config.build.rollupOptions.external
  if (
    Array.isArray(external) ||
    typeof external === 'string' ||
    external instanceof RegExp
  ) {
    external = builtins.concat(external as string[])
  } else if (typeof external === 'function') {
    const original = external
    external = function (source, importer, isResolved) {
      if (builtins.includes(source)) {
        return true
      }
      return original(source, importer, isResolved)
    }
  } else {
    external = builtins
  }
  config.build.rollupOptions.external = external

  return config
}

/**
 * @see https://github.com/vitejs/vite/blob/v4.0.1/packages/vite/src/node/constants.ts#L137-L147
 */
export function resolveHostname(hostname: string) {
  const loopbackHosts = new Set([
    'localhost',
    '127.0.0.1',
    '::1',
    '0000:0000:0000:0000:0000:0000:0000:0001',
  ])
  const wildcardHosts = new Set([
    '0.0.0.0',
    '::',
    '0000:0000:0000:0000:0000:0000:0000:0000',
  ])

  return loopbackHosts.has(hostname) || wildcardHosts.has(hostname) ? 'localhost' : hostname
}

export function resolveServerUrl(server: ViteDevServer) {
  const addressInfo = server.httpServer?.address()
  const isAddressInfo = (x: any): x is AddressInfo => x?.address

  if (isAddressInfo(addressInfo)) {
    const { address, port } = addressInfo
    const hostname = resolveHostname(address)

    const options = server.config.server
    const protocol = options.https ? 'https' : 'http'
    const devBase = server.config.base

    const path = typeof options.open === 'string' ? options.open : devBase
    const url = path.startsWith('http')
      ? path
      : `${protocol}://${hostname}:${port}${path}`

    return url
  }
}

export function resolvePackageJson(root = process.cwd()): {
  type?: 'module' | 'commonjs'
  [key: string]: any
} | null {
  const packageJsonPath = path.join(root, 'package.json')
  const packageJsonStr = fs.readFileSync(packageJsonPath, 'utf8')
  try {
    return JSON.parse(packageJsonStr)
  } catch {
    return null
  }
}

/**
 * Inspired `tree-kill`, implemented based on sync-api. #168
 * @see https://github.com/pkrumins/node-tree-kill/blob/v1.2.2/index.js
 */
export function killTreeWin32(pid: number) {
  cp.execSync(`taskkill /pid ${pid} /T /F`)
}

export function pidTree(tree: PidTree) {
  const command = process.platform === 'darwin'
    ? `pgrep -P ${tree.pid}` // Mac
    : `ps -o pid --no-headers --ppid ${tree.ppid}` // Linux

  try {
    const childs = cp
      .execSync(command, { encoding: 'utf8' })
      .match(/\d+/g)
      ?.map(id => +id)

    if (childs) {
      tree.children = childs.map(cid => pidTree({ pid: cid, ppid: tree.pid }))
    }
  } catch { }

  return tree
}

export function killTree(tree: PidTree) {
  if (tree.children) {
    for (const child of tree.children) {
      killTree(child)
    }
  }

  try {
    process.kill(tree.pid) // #214
  } catch { /* empty */ }
}
