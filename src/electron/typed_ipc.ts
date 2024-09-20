import type {
	IpcMain as ElectronIpcMain,
	IpcMainEvent,
	IpcMainInvokeEvent as ElectronIpcMainInvokeEvent,
	IpcRenderer as ElectronIpcRenderer,
	IpcRendererEvent,
	WebContents as ElectronWebContents,
	dialog,
} from 'electron'
import { ipcMain as electronIpcMain } from 'electron'

type OptionalPromise<T> = T | Promise<T>
type InputMap = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[key: string]: (...args: any[]) => any
}

interface TypedWebContents<IpcEvents extends InputMap> extends ElectronWebContents {
	send<K extends keyof IpcEvents>(channel: K, ...args: Parameters<IpcEvents[K]>): void
}

interface TypedIpcMainInvokeEvent<IpcEvents extends InputMap> extends ElectronIpcMainInvokeEvent {
	sender: TypedWebContents<IpcEvents>
}

interface TypedIpcMain<IpcEvents extends InputMap, IpcCommands extends InputMap>
	extends ElectronIpcMain {
	on<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcMainEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): this
	once<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcMainEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): this
	removeListener<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcMainEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): this
	removeAllListeners<K extends keyof IpcEvents>(channel?: K): this
	handle<K extends keyof IpcCommands>(
		channel: K,
		listener: (
			event: TypedIpcMainInvokeEvent<IpcEvents>,
			...args: Parameters<IpcCommands[K]>
		) => OptionalPromise<ReturnType<IpcCommands[K]>>,
	): void
	handleOnce<K extends keyof IpcCommands>(
		channel: K,
		listener: (
			event: TypedIpcMainInvokeEvent<IpcEvents>,
			...args: Parameters<IpcCommands[K]>
		) => OptionalPromise<ReturnType<IpcCommands[K]>>,
	): void
	removeHandler<K extends keyof IpcCommands>(channel: K): void
}

interface TypedIpcRenderer<IpcEvents extends InputMap, IpcCommands extends InputMap>
	extends ElectronIpcRenderer {
	on<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcRendererEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): this
	once<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcRendererEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): this
	removeListener<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcRendererEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): this
	removeAllListeners<K extends keyof IpcEvents>(channel: K): this
	send<K extends keyof IpcEvents>(channel: K, ...args: Parameters<IpcEvents[K]>): void
	sendSync<K extends keyof IpcEvents>(
		channel: K,
		...args: Parameters<IpcEvents[K]>
	): ReturnType<IpcEvents[K]>
	sendTo<K extends keyof IpcEvents>(
		webContentsId: number,
		channel: K,
		...args: Parameters<IpcEvents[K]>
	): void
	sendToHost<K extends keyof IpcEvents>(channel: K, ...args: Parameters<IpcEvents[K]>): void
	invoke<K extends keyof IpcCommands>(
		channel: K,
		...args: Parameters<IpcCommands[K]>
	): Promise<ReturnType<IpcCommands[K]>>
}

type Events = {
	readyToQuit: () => void
	gonnaQuit: () => void
}

type Commands = {
	app_loaded: () => void
	showMessageBox: (
		attached: boolean,
		options: Parameters<typeof dialog.showMessageBox>[0],
	) => ReturnType<typeof dialog.showMessageBox>
}

export type IpcMain = TypedIpcMain<Events, Commands>
export type IpcRenderer = TypedIpcRenderer<Events, Commands>
export type WebContents = TypedWebContents<Events>

export const ipc_main = electronIpcMain as IpcMain

interface TypedIpcFunctions<IpcEvents extends InputMap> extends ElectronIpcRenderer {
	ipcListen<K extends keyof IpcEvents>(
		channel: K,
		listener: (event: IpcRendererEvent, ...args: Parameters<IpcEvents[K]>) => void,
	): () => void
}
export type IpcFunctions = TypedIpcFunctions<Events>
