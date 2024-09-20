<script lang="ts">
	import { ipc_renderer } from '@/lib/window'

	ipc_renderer.invoke('app_loaded').catch(() => {
		ipc_renderer.invoke('showMessageBox', false, {
			type: 'error',
			message: 'Failed to signal app loading',
			detail: 'Graceful shutdown will not be possible.',
		})
	})
</script>

<p>Hello world</p>
