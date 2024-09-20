## 0.28.8 (2024-09-19)

- 3239718 fix: better exit app #251
- 927885d fix: unable to disable watch #252
- f043f74 chore: cleanup
- 149c4a9 Merge pull request #247 from think-flow/testfix
- f9bda13 fix: notBundle test is failed

## 0.28.7 (2024-04-27)

- b3cf74c chore: cleanup, code format
- 957b144 Merge pull request #233 from kuoruan/feat/config
- c0f2647 feat: inherit more config from base user config

**Contributors:**

- [#233](https://github.com/electron-vite/vite-plugin-electron/pull/233)@[kuoruan](https://github.com/kuoruan)

## 0.28.6 (2024-04-21)

- be94383 fix: `ElectronOptions['startup']` definition
- 96905d9 chore: compatible vite@4 resolve node first
- a16fe3c fix: hot-reload compatible vite@4

## 0.28.5 (2024-04-19)

- f325403 chore: update comments
- 5ebd3a6 Merge pull request #229 from ThatKawaiiSam/feat/custom-electron-fork
- dbc85dc feat: allow custom electron forks in `startup` call
- 8b076be chore: update deprecated API

**Contributors:**

- [#229](https://github.com/electron-vite/vite-plugin-electron/pull/229)@[ThatKawaiiSam](https://github.com/ThatKawaiiSam)

## 0.28.4 (2024-03-17)

- 4f7748c chore: restore `vite-plugin-electron-renderer` in `peerDependencies`
- 412ed9b fix(#214): catch the `process.kill(pid)` error

## 0.28.3 (2024-03-13)

- a300c08 fix: remove electron@28 version pre-deps

## 0.28.2 (2024-02-11)

- 5b0fc87 feat: use `treeKillSync()` instead `tree-kill`

## 0.28.1 (2024-02-06)

- efc5826 fix: correct `calcEntryCount()` for startup
- cf0e91f feat: startup support `SpawnOptions` #194
- 512a1c5 Merge pull request #204 from SanGongHappy/tree-kill-sync
- edf4bf6 refactor: better `treeKillSync` implemented
- 82cd32f Merge branch 'electron-vite:main' into tree-kill-sync
- 6e122a7 feat: polyfill `process.env` by default
- 45f28bb (github/main, main) chore: update CHANGELOG
- f9b81e4 chore(simple): update comments
- b5376a9 docs: add `Built format`
- e334366 copy tree-kill

## 0.28.0 (2024-01-07)

- 20170a5 refactor: preload built `format` use `esm` by default

#### Migration to v0.28.0

- **No break changes**. Just need to define `"type": "module"` in package.json for supports `esm` :)
- **By the way**. Recommend using the `vite-plugin-electron/simple` API. It is simpler, and the main difference is its adaptation to `preload` scripts.
- **electron@28** Preload scripts [👉 limitations](https://github.com/electron/electron/blob/v30.0.0-nightly.20240104/docs/tutorial/esm.md#preload-scripts).

#### Preload scripts

In most cases, use `cjs` format

```log
`require()` can usable matrix

@see - https://github.com/electron/electron/blob/v30.0.0-nightly.20240104/docs/tutorial/esm.md#preload-scripts
┏———————————————————————————————————┳——————————┳———————————┓
│ webPreferences: { }               │  import  │  require  │
┠———————————————————————————————————╂——————————╂———————————┨
│ nodeIntegration: false(undefined) │    ✘     │     ✔     │
┠———————————————————————————————————╂——————————╂———————————┨
│ nodeIntegration: true             │    ✔     │     ✔     │
┠———————————————————————————————————╂——————————╂———————————┨
│ sandbox: true(undefined)          │    ✘     │     ✔     │
┠———————————————————————————————————╂——————————╂———————————┨
│ sandbox: false                    │    ✔     │     ✘     │
┠———————————————————————————————————╂——————————╂———————————┨
│ nodeIntegration: false            │    ✘     │     ✔     │
│ sandbox: true                     │          │           │
┠———————————————————————————————————╂——————————╂———————————┨
│ nodeIntegration: false            │    ✔     │     ✘     │
│ sandbox: false                    │          │           │
┠———————————————————————————————————╂——————————╂———————————┨
│ nodeIntegration: true             │    ✘     │     ✔     │
│ sandbox: true                     │          │           │
┠———————————————————————————————————╂——————————╂———————————┨
│ nodeIntegration: true             │    ✔     │     ✔     │
│ sandbox: false                    │          │           │
┗———————————————————————————————————┸——————————┸———————————┛
- import(✘): SyntaxError: Cannot use import statement outside a module
- require(✘): ReferenceError: require is not defined in ES module scope, you can use import instead
```

#### Built format

This is just the default behavior, and you can modify them at any time through custom config in the `vite.config.js`

```log
{ "type": "module" }
┏————————————————————┳——————————┳———————————┓
│       built        │  format  │   suffix  │
┠————————————————————╂——————————╂———————————┨
│ main process       │   esm    │    .js    │
┠————————————————————╂——————————╂———————————┨
│ preload scripts    │   cjs    │   .mjs    │ diff
┠————————————————————╂——————————╂———————————┨
│ renderer process   │    -     │    .js    │
┗————————————————————┸——————————┸———————————┛

{ "type": "commonjs" } - default
┏————————————————————┳——————————┳———————————┓
│       built        │  format  │   suffix  │
┠————————————————————╂——————————╂———————————┨
│ main process       │   cjs    │    .js    │
┠————————————————————╂——————————╂———————————┨
│ preload scripts    │   cjs    │    .js    │ diff
┠————————————————————╂——————————╂———————————┨
│ renderer process   │    -     │    .js    │
┗————————————————————┸——————————┸———————————┛
```

## 0.28.0-beta.3 (2024-01-05)

- d7c0a91 feat: preload built `format` adapt to `esm`

## 0.28.0-beta.2 (2024-01-02)

- f557a98 feat: supports `"type": "module"`, better `esm` logic

#### Migration to v0.28.0-beta.2

- ~~**No break changes**. Just need to define `"type": "module"` in package.json for supports `esm` :)~~
- ~~**By the way**. Recommend using the `vite-plugin-electron/simple` API. It is simpler, and the main difference is its adaptation to `preload` scripts.~~
- ~~**electron@28** Preload scripts [👉 limitations](https://github.com/electron/electron/blob/v30.0.0-nightly.20231218/docs/tutorial/esm.md#preload-scripts).~~

## 0.28.0-beta.1 (2023-12-30)

- 9ec82b5 feat: supports electron@28, build `esm` by default
- 5dd3ccd feat: bump deps to vite@5, electron@28 and others
- 39520cc feat: upgrade to vite@5
- 3340cfc chore: prevent encounter problem

> Why `v0.28.0`? This is consistent with `electron@28`, meaning it is recommended to use electron@28+, which is the first version to support `esm`.

#### Migration to v0.28.0-beta.1

**🚨 deprecated**

- ~~Update `main` of `package.json` for `esm`~~

  ```diff
  {
  - "main": "dist-electron/main.js",
  + "main": "dist-electron/main.mjs",
  }
  ```

- ~~If you still need to use `cjs`, you need to make some changes~~

  **~~Simple API~~**

  ```diff
  import electron from 'vite-plugin-electron/simple'

  export default {
    plugins: [
      electron({
        main: {
  -       entry: 'electron/main.ts',
  +       vite: {
  +         build: {
  +           lib: {
  +             entry: 'electron/main.ts',
  +             formats: ['cjs'],
  +             fileName: () => '[name].js',
  +           },
  +         },
  +       },
        },
      }),
    ],
  }
  ```

  **~~Flat API~~**

  ```diff
  import electron from 'vite-plugin-electron'

  export default {
    plugins: [
      electron({
  -     entry: 'electron/main.ts',
  +     vite: {
  +       build: {
  +         lib: {
  +           entry: 'electron/main.ts',
  +           formats: ['cjs'],
  +           fileName: () => '[name].js',
  +         },
  +       },
        },
      }),
    ],
  }
  ```

## 0.15.5 (2023-12-12)

- f57a60a fix(#182, #187): correctly `options.reload()`
- f606551 Merge pull request #178 from electron-vite/v0.15.4

## 0.15.4 (2023-11-08)

- 532e0b4 Merge pull request #177 from Siykt/main
- 845c39b fix: add SIGKILL to tree-kill call

**Contributors:**

- [#177](https://github.com/electron-vite/vite-plugin-electron/pull/177)@[Siykt](https://github.com/Siykt)

## 0.15.3 (2023-11-07)

- 20907ef chore: recover `v0.15.1`

## 0.15.2 (2023-11-06)

- 9719203 chore: better exit `electron` logic

## 0.15.1 (2023-11-06)

- 2119108 fix: correct use `tree-kill`

## 0.15.0 (2023-11-06)

- 234be07 fix: `tree-kill` doesn't work
- 5e6c36d feat: `calcEntryCount()`
- bbd6bd1 Merge branch 'main' of github.com:electron-vite/vite-plugin-electron into main
- 9a910e5 Merge pull request #166 from CommandMC/fix/wait-for-all-files
- 3962718 fix: startup electron wait for all files built
- 7f75ae2 Merge branch 'fix/wait-for-all-files' of https://github.com/CommandMC/vite-plugin-electron into main
- 65b73c2 Merge pull request #122 from sevenc-nanashi/main
- e4033c3 Merge pull request #1 from caoxiemeihao/cleanup
- 8e70a39 chore: cleanup
- 20dd675 refactor: migrate examples to `github.com/caoxiemeihao/electron-vite-samples`
- de9259f Change: Use peer-dependency
- 8247192 Merge: main -> main
- ab990b9 Wait until the last file is done bundling before starting Electron
- 6e5a033 Merge pull request #163 from electron-vite/v0.14.1

**Fixs:**

- `electron` does not exit correctly | 使用ctrl + c 停止代码，electron后台不关闭 [#168](https://github.com/electron-vite/vite-plugin-electron/issues/168), [#122](https://github.com/electron-vite/vite-plugin-electron/pull/122)
- Fixed `electron` startup timing [#166](https://github.com/electron-vite/vite-plugin-electron/pull/166)

**Contributors:**

- [#122](https://github.com/electron-vite/vite-plugin-electron/pull/122)@[sevenc-nanashi](https://github.com/sevenc-nanashi)
- [#166](https://github.com/electron-vite/vite-plugin-electron/pull/166)@[CommandMC](https://github.com/CommandMC)

## 0.14.1 (2023-09-10)

- ba14f55 feat(simple): Preload scripts code not split by default

## 0.14.0 (2023-09-01)

- 3cc71ca feat(simple): build Preload scripts as `cjs` by default

## 0.14.0-beta.0 (2023-08-23)

- d3cf87f feat: simple API build
- d8c3c27 feat: simple API 🥳

See **[👉 Simple API](https://github.com/electron-vite/vite-plugin-electron/tree/v0.14.0-beta.0#simple-api)**

```js
import electron from 'vite-plugin-electron/simple'

electron({
  main: {},
  preload: {},
  renderer: {},
})
```

## 0.13.0-beta.3 (2023-08-22)

- 37e14b0 fix: remove `apply: 'serve'`
- 4f196e3 fix: export bare `vite-plugin-electron/plugin`
- 06c91f3 docs: v0.13.0

The user decides when `notBundle` should be used. See **[👉 Not Bundle](https://github.com/electron-vite/vite-plugin-electron/tree/v0.13.0-beta.3#not-bundle)**

```js
import electron from 'vite-plugin-electron'
import { notBundle } from 'vite-plugin-electron/plugin'

export default defineConfig(({ command }) => ({
  plugins: [
    electron({
      entry: 'electron/main.ts',
      vite: {
        plugins: [
          command === 'serve' && notBundle(/* NotBundleOptions */),
        ],
      },
    }),
  ],
}))
```

## 0.13.0-beta.2 (2023-08-21)

- 86d9a34 chore: update pnpm lock
- c6aceb3 refactor: standalone `Not Bundle` plugin
- b3decf4 Merge pull request #150 from haodaking/changelog
- 3f77d12 Update CHANGELOG.md

Users need to import the `notBundle` plugin explicitly. See **[👉 Not Bundle](https://github.com/electron-vite/vite-plugin-electron/tree/v0.13.0-beta.2#not-bundle)**

```js
import electron from 'vite-plugin-electron'
import { notBundle } from 'vite-plugin-electron/plugin'

export default {
  plugins: [
    electron({
      entry: 'electron/main.ts',
      vite: {
        plugins: [
          notBundle(/* NotBundleOptions */),
        ],
      },
    }),
  ],
}
```

## 0.13.0-beta.1 (2023-08-06)

- e5403c1 feat: check `cjs` availabe

## 0.13.0-beta.0 (2023-08-06)

- 5fbcf40 test: plugin `external_node_modules`
- 9803e26 feat: non-bundle during dev 🚀

Let's use the `electron-log` as an examples.

```js
┏—————————————————————————————————————┓
│ import log from 'electron-log'      │
┗—————————————————————————————————————┛
                   ↓
Modules in `node_modules` are not bundled during development, it's fast!
                   ↓
┏—————————————————————————————————————┓
│ const log = require('electron-log') │
┗—————————————————————————————————————┛
```

## 0.12.0 (2023-06-13)

- 6822409 docs: v0.12.0
- 9ec9d3b v0.12.0
- 53a0dd8 feat: disable minify during dev
- 3925cd1 refactor: remove `defineConfig`, `Configuration` -> `ElectronOptions`, config.ts -> utils.ts

## 0.11.2 (2023-04-15)

- b033bc5 v0.11.2
- 8190208 docs: typo
- 111d495 refactor(🔨): better build logic
- 76611a9 fix: disable `browserField` by default #136
- 241534f feat: add `.npmrc` for `pnpm`
- 65d4ab1 chore: bump deps
- b4308e3 chore: rename
- 036e52c docs: update
- a222c48 examples: update quick-start
- d04155c examples: add javascript-api
- 9213ba0 docs: update
- 9b8da83 fix: cannot find type definition #126
- e864b81 examples: update multiple-window, add multiple-renderer
- 0a226b5 docs: update
- ff5e9dc feat: add logo.svg
- 7cec6ad examples: add multiple-windows
- f8528ed Merge pull request #123 from xhayper/patch-1
- 1e9f9b0 feat: remove extra dependencies
- 8fa6ce4 feat: update package and example
- 1d7eca5 feat: add test 🌱
- 9ef3e8e chore: bump deps
- 56446e2 chore: cleanup

## 0.11.1 (2022-12-19)

- 2bf7d0b docs: `startup()`
- 401a44e refactor: cleanup

## 0.11.0 (2022-12-17)

#### Break!

```ts
// 0.10.0
function build(config: Configuration | Configuration[]): Promise<void>

// 0.11.0 - Same as Vite's build
function build(config: Configuration): Promise<RollupOutput | RollupOutput[] | RollupWatcher>
```

#### Features

**JavaScript API**

`vite-plugin-electron`'s JavaScript APIs are fully typed, and it's recommended to use TypeScript or enable JS type checking in VS Code to leverage the intellisense and validation.

- `Configuration` - type
- `defineConfig` - function
- `resolveViteConfig` - function, Resolve the default Vite's `InlineConfig` for build Electron-Main
- `withExternalBuiltins` - function
- `build` - function
- `startup` - function

Example:

```js
build(
  withExternalBuiltins( // external Node.js builtin modules
    resolveViteConfig( // with default config
      {
        entry: 'foo.ts',
        vite: {
          mode: 'foo-mode', // for .env file
          plugins: [{
            name: 'plugin-build-done',
            closeBundle() {
              // Startup Electron App
              startup()
            },
          }],
        },
      }
    )
  )
)
```

**V8 Bytecode support** 👉 [bytecode](https://github.com/electron-vite/vite-plugin-electron/tree/main/examples/bytecode)

Inspired by:

- [Nihiue/little-byte-demo](https://github.com/Nihiue/little-byte-demo)
- [通过字节码保护Node.js源码之原理篇 - 知乎](https://zhuanlan.zhihu.com/p/359235114)

#### Commit/PR

- Support Vite4.x | #118, 28d38b6
- Bytecode example | df170c2
- JavaScript API docs | 3049169
- Fix load `.env` | 758695d
- Refactor `build()` | d9c3343

## 0.10.4 (2022-11-13)

- e4f943f refactor: move `build.resolve` to `resolve`
- 91fb525 docs(zh-CN): update | @ggdream
- 41db615 Use mode from source config. | #105, #106

## 0.10.3 (2022-11-10)

- 0b24909 refactor: cleanup, provides some programmable APIs 🌱
- 58517d8 refactor(proj-struct): remove `vite-plugin-electron-renderer`
- d2b3c29 Merge pull request #98 from skyrpex/patch-1
- 1645be2 fix: ignore the browser field when bundling

## 0.10.2 (2022-10-24)

By default, the `dist` folder will be automatically removed by Vite. We build Electron related files into `dist-electron` to prevent it from being removed by mistake

1. Remove Vite `3.2.0` | #90
2. ad9bb3c refactor(electron-renderer)!: remove `options.resolve()`, use 'lib-esm' for resolve Node.js modules and `electron` | vite-plugin-electron-renderer
3. b500039 feat(electron-renderer): support `optimizeDeps` for Electron-Renderer 🚀
4. f28e66b faet(outDir)!: `dist/electron` -> `dist-electron` | vite-plugin-electron

## 0.10.1 (2022-10-12)

- 59a24df fix(electron-renderer): use `createRequire()` instead of `import()` 🐞
- 11cd4c3 feat(electron): `onstart` provides `reload()`

## 0.10.0 (2022-10-09)

#### Break!

This is a redesigned version of the API<sub><sup>(Only 3 APIs)</sub></sup>. Not compatible with previous versions!

```ts
export type Configuration = {
  /**
   * Shortcut of `build.lib.entry`
   */
  entry?: import('vite').LibraryOptions['entry']
  /**
   * Triggered when Vite is built.  
   * If passed this parameter will not automatically start Electron App.  
   * You can start Electron App through the `startup` function passed through the callback function.  
   */
  onstart?: (this: import('rollup').PluginContext, startup: (args?: string[]) => Promise<void>) => void
  vite?: import('vite').InlineConfig
}
```

In the past few weeks, some issues have been mentioned in many issues that cannot be solved amicably. So I refactored the API to avoid design flaws. But despite this, the new version will only be easier rather than harder.

For example, some common problems in the following issues.

#### Multiple entry files is not support #86

  Thanks to Vite@3.2.0's `lib.entry` supports multiple entries, which makes the configuration of the new version very simple. **So the `vite-plugin-electron@0.10.0` requires Vite at least `v3.2.0`**.

  **e.g.**

  ```ts
  import electron from 'vite-plugin-electron'

  // In plugins option
  electron({
    entry: [
      'electron/entry-1.ts',
      'electron/entry-2.ts',
    ],
  })

  // Or use configuration array
  electron([
    {
      entry: [
        'electron/entry-1.ts',
        'electron/entry-2.ts',
      ],
    },
    {
      entry: 'foo/bar.ts',
    },
  ])
  ```

#### require is not defined #48, #87

  `vite-plugin-electron-renderer` will change `output.format` to `cjs` format by default<sub><sup>(This is because currently Electron@21 only supports CommonJs)</sub></sup>, which will cause the built code to use `require` to import modules, if the user `nodeIntegration` is not enabled in the Electron-Main process which causes the error `require is not defined` to be thrown.

  `vite-plugin-electron-renderer@0.10.0` provides the `nodeIntegration` option. It is up to the user to decide whether to use Node.js(CommonJs).

  **e.g.**

  ```ts
  import renderer from 'vite-plugin-electron-renderer'

  // In plugins option
  renderer({
    nodeIntegration: true,
  })
  ```

#### Use `Worker` in Electron-Main or Electron-Renderer #77, #81

> You can see 👉 [examples/worker](https://github.com/caoxiemeihao/vite-plugin-electron/tree/main/examples/worker)

- Use Worker in Electron-Main

  **e.g.** <sub><sup>This looks the same as multiple entry</sub></sup>

  ```ts
  import electron from 'vite-plugin-electron'

  // In plugins option
  electron({
    entry: [
      'electron/main.ts',
      'electron/worker.ts',
    ],
  })

  // In electron/main.ts
  new Worker(path.join(__dirname, './worker.js'))
  ```

- Use Worker in Electron-Renderer

  **e.g.**

  ```ts
  import renderer, { worker } from 'vite-plugin-electron-renderer'

  export default {
    plugins: [
      renderer({
        // If you need use Node.js in Electron-Renderer process
        nodeIntegration: true,
      }),
    ],
    worker: {
      plugins: [
        worker({
          // If you need use Node.js in Worker
          nodeIntegrationInWorker: true,
        }),
      ],
    },
  }
  ```

#### TODO

- [ ] There is no way to differentiate between Preload-Scripts, which will cause the entire Electron App to restart after the preload update, not the Electron-Renderer reload.

#### PR

https://github.com/electron-vite/vite-plugin-electron/pull/89

## 0.9.3 (2022-09-10)

~~*vite-plugin-electron*~~

*vite-plugin-electron-renderer*

- 191afb8 feat: proxy `ipcRenderer` in `Worker` | #69

## 0.9.2 (2022-08-29)

*vite-plugin-electron*

- 715a1cd fix(electron): `VITE_DEV_SERVER_HOSTNAME` instead `VITE_DEV_SERVER_HOST`

*vite-plugin-electron-renderer*

## 0.9.1 (2022-08-24)

*vite-plugin-electron*

- db61e49 feat(electron): support custom start 🌱 | #57, #58

~~*vite-plugin-electron-renderer*~~

## 0.9.0 (2022-08-12)

🎉 `v0.9.0` is a stable version based on `vite@3.0.6`

~~*vite-plugin-electron*~~

*vite-plugin-electron-renderer*

- ebc6a3d chore(electron-renderer): remove `renderBuiltUrl()` based on vite@3.0.6 ([vite@3.0.6-8f2065e](https://github.com/vitejs/vite/pull/9381/commits/8f2065efcb6ba664f7dce6f3c7666b29e2c56027#diff-aa53520bfd53e6c24220c44494457cc66370fd2bee513c15f9be7eb537a363e7L874))

---


## [2022-08-11] v0.8.8

sync `vite-plugin-electron-renderer` version

## [2022-08-10] v0.8.7

70a8c6e fix: https://github.com/electron-vite/electron-vite-vue/issues/229

## [2022-08-08] v0.8.6

ESM -> CJS

## [2022-08-08] v0.8.5

PR: #51

1. feat: add `VITE_DEV_SERVER_URL` to electron
process env, so that it is easier to use

2. fix(🐞): VITE_DEV_SERVER_HOSTNAME cannot be used directly when
VITE_DEV_SERVER_HOSTNAME is a ipv6 address or
vite config `server.host` is true

3. fix(🐞): use vite config `mode` as default build
mode to avoid build mode not equal to vite config `mode` when
vite config `mode` !== 'development' which would lead to render env
not equal to electron main or preload

4. fix(🐞): build electron output after render to avoid the electron
output being deleted when the vite config emptyOutDir
is `true` and the vite command is `build`

5. fix(🐞): use `closeBundle` to replace `writeBundle`, because in
extreme cases, an error will be reported. For example,
`can't find preload module` will occur as an error
when `preload` update frequently

## [2022-07-31] v0.8.4

- 🌱 c8b59ba Support `envFile` options [electron-vite-vue/issues/209](https://github.com/electron-vite/electron-vite-vue/issues/209)
- 🌱 2d7f033 Add `ImportMeta['env']` declaration
- 🌱 20d0a22 Must use `pnpm publish` instead of `npm publish` #43

## [2022-07-25] v0.8.2

- 9ee720f chore(electron): remove `envFile: false`
- 0016d52 fix(🐞): `normalizePath()`

## [2022-07-21] v0.8.1

- 33b121a chore(deps): hoist `typescript`
- d3bd37a chore(electron): change import path

## [2022-07-19] v0.8.0

- 45f34d9 vite-plugin-electron@0.8.0
- daa1c52 docs: `vite-plugin-electron@0.8.0`
- e4e7ee0 chore: fix link
- d1d4c82 chroe: bump deps
- 581ef71 chore(deps): bump vite to 3.0.2
- 481368a chore: remove unused def
- 71d54c1 chore(🐞): update import path
- 3bae8e5 refactor: `checkPkgMain.buildElectronMainPlugin()`
- dba119d chore: format code
- 739e659 feat: use `checkPkgMain()`
- 192a8ca refactor: standlone `checkPkgMain` function
- aaa9030 chore: explicitly specify external modules
- 3eac722 chore: remove TODO
- c03abe9 feat: add `checkPkgMain()` plugin
- d8c0f8e chore: rename param
- 04c94dd feat: `checkPkgMain()`
- 7b9631a deps: add `rollup`
- cec6db6 deps(🐞): add rollup for import `InputOption`
- a4de86e monorepo: move `vite-plugin-electron` to `packages/electron`

## [2022-07-11] v0.7.5

- 1ed6e19 chore: bump vite-plugin-electron-renderer to v0.5.7

## [2022-07-11] v0.7.4

- c60fb17 chore: update params
- 13f0c70 chore: bump vite-plugin-electron-renderer to 0.5.6

## [2022-07-10] v0.7.3

- 2033256 chore: bump deps

## [2022-07-07] v0.7.2

- 8fb064e fix(🐞): bump vite-plugin-electron-renderer to 0.5.3
- 44006b2 chore: comments

## [2022-07-07] v0.7.1

- 42acf37 docs: update
- 6d878f7 refactor: use `resolveModules()`
- acf1751 chore: bump deps

## [2022-07-06] v0.7.0

- 661a146 docs: v0.7.0
- 8ee091d feat: support restart on `vite.config.ts` changed #24
- ca15795 add `electron-env.d.ts`
- 76863bb electron-env.d.ts
- 3fbef04 refactor: optimize code
- cc3c8c0 feat: `resolveBuildConfig()`
- 50c3afe feat: `resolveRuntime()`
- 1184dd3 `node.js.ts` -> `config.ts`

## [2022-07-01] v0.6.2

- 5779397 chore: bump vite-plugin-electron-renderer to 0.5.1
- 2a2f77d docs: `Put Node.js packages in dependencies`

## [2022-06-26] v0.6.1

- 5b736fa bump vite-plugin-electron-renderer to 0.5.0
- f70e030 fix(🐞): ensure always load into `buildConfig()`
- 73ae8f2 docs: update

## [2022-06-26] v0.6.0

- 5204eca docs: v0.6.0
- e885e54 feat: `withExternal()`
- dee6d6a feat: `CommonConfiguration`
- 55f9e11 node.js.ts
- 83d0b8d remove README.zh-CN.md
- 5f488b8 remove `polyfille-exports`
- e118fbd remove `renderer`
- 6e5761f refactor: integrate `vite-plugin-electron-renderer`
- 0e696ec add `vite-plugin-electron-renderer`
- 87bc5bb remove `vite-plugin-optimizer`

## [2022-06-25] v0.5.1

- ccf6b29 [feat: make prefix-only core module as external module](https://github.com/electron-vite/vite-plugin-electron/pull/22)

## [2022-06-24] v0.5.0

- 0c5155c chore: TODO
- 892940e fix app,getName() return error name

## [2022-06-14] v0.4.9

- abf460f chore: variable rename
- ceb559f chore: `build.cssCodeSplit=false`

## [2022-06-08] v0.4.8

- ab40088 fix(🐞): set `emptyOutDir=false` for prevent accidental deletion of files
- 7baafa0 break: set `electron` `build.outDir` value is `dist/electron` by default
- c13eb49 fix(🐞): assign default value `dist/electron/[process]` of `build.outDir`
  https://github.com/electron-vite/vite-plugin-electron/issues/10

## [2022-06-06] v0.4.7

- 1346707 refactor: better assign default `build.outDir`
- f489da1 chore: commnets
- 6db3bf3 fix: check `output` is Array

## [2022-06-04] v0.4.6

- 394cf6f feat: `config.build.emptyOutDir = false` by default
- 4a67688 feat(🐞): enabled `polyfill-exports` by default
