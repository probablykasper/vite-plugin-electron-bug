import { app, ipcMain, session, BrowserWindow, protocol, net } from 'electron'
import path from 'path'
import url from 'url'
import { ipc_main } from './typed_ipc'

process.on('uncaughtException', (error) => {
	console.error('Unhandled Error', error)
})
process.on('unhandledRejection', (error: Error) => {
	console.error('Unhandled Promise Rejection', error)
})

app.setPath('userData', path.join(__dirname, 'electron_data'))

let quitting = false
let app_loaded = false

app.on('window-all-closed', () => {
	app.quit()
})

app.whenReady().then(async () => {
	let main_window: BrowserWindow | null = new BrowserWindow({
		width: 1305,
		height: 1000,
		minWidth: 850,
		minHeight: 400,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
		backgroundColor: '#0D1115',
		show: false,
	})

	session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
		callback({
			responseHeaders: {
				...details.responseHeaders,
				'Content-Security-Policy': ["script-src 'self' 'unsafe-inline';"],
			},
		})
	})

	const web_folder = path.join(path.dirname(__dirname), 'web')

	protocol.handle('app', (request) => {
		const accepts_html =
			request.headers
				.get('accept')
				?.split(',')
				.map((mime_type) => mime_type.trim())
				.includes('text/html') ?? false

		if (request.method === 'GET' && accepts_html) {
			const html_path = url.pathToFileURL(path.join(web_folder, 'index.html')).toString()
			return net.fetch(html_path)
		}

		const file_path = request.url.slice('app:'.length)
		const file_url = url.pathToFileURL(path.join(web_folder, file_path)).toString()
		return net.fetch(file_url)
	})

	const vite_dev_server_url = process.env.VITE_DEV_SERVER_URL ?? ''
	if (!vite_dev_server_url) {
		throw new Error('VITE_DEV_SERVER_URL missing')
	}
	main_window.loadURL(new URL(vite_dev_server_url).origin + '/playlist/root')

	main_window.webContents.openDevTools()

	main_window.once('ready-to-show', () => {
		main_window?.show()
	})

	main_window.on('close', (e) => {
		if (!quitting) {
			e.preventDefault()
			app.hide()
		}
	})
	main_window.on('closed', () => {
		main_window = null
	})
	ipc_main.handle('app_loaded', () => {
		app_loaded = true
	})

	// doesn't always fire on Windows :(
	app.on('before-quit', (e) => {
		if (quitting) {
			return
		} else if (app_loaded) {
			console.log('Preparing to quit')
			e.preventDefault()
			main_window?.webContents.send('gonnaQuit')
			ipcMain.once('readyToQuit', () => {
				console.log('Quitting gracefully')
				quitting = true
				main_window?.close()
			})
		} else {
			console.log('Quitting immediately')
			quitting = true
			main_window?.close()
		}
	})

	app.on('activate', () => {
		if (main_window !== null) {
			main_window.show()
		}
	})
})
