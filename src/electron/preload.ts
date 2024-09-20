import path from 'path'
import is from './is'

window.is_dev = is.dev
window.local_data_path = process.env.LOCAL_DATA ? path.resolve(process.env.LOCAL_DATA) : undefined
window.library_path = process.env.LIBRARY ? path.resolve(process.env.LIBRARY) : undefined
window.is_mac = is.mac
window.is_windows = is.windows

window.join_paths = (...args) => {
	const combined_path = path.join(...args)
	return combined_path
}
