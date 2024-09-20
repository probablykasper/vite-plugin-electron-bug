import { dialog, BrowserWindow } from 'electron'
import { ipc_main } from './typed_ipc'

ipc_main.handle('showMessageBox', async (e, attached, options) => {
	const window = BrowserWindow.fromWebContents(e.sender)
	if (attached && window) {
		return await dialog.showMessageBox(window, options)
	} else {
		return await dialog.showMessageBox(options)
	}
})
