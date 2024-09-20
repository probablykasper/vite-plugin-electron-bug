<script lang="ts">
	import { ipc_renderer } from '@/lib/window'

	ipc_renderer.invoke('app_loaded').catch(() => {
		console.error('Could not invoke app_loaded')
	})

	ipc_renderer.on('gonnaQuit', async function () {
		ipc_renderer.send('readyToQuit')
	})
</script>

<p style="color: red; margin-top: 50px;">Hello world</p>
