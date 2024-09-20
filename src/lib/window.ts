import type { IpcRenderer, IpcFunctions } from '@/electron/typed_ipc'
const electron = window.require('electron')

export const ipc_renderer = electron.ipcRenderer as IpcRenderer

export const ipc_listen: IpcFunctions['ipcListen'] = (channel, listener) => {
	ipc_renderer.on(channel, listener)
	return () => {
		ipc_renderer.removeListener(channel, listener)
	}
}
