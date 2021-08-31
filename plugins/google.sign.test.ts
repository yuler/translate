import {fetchToken} from './google.sign.ts'

Deno.test('Fetch token', async () => {
	await fetchToken()
})
