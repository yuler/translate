import {sign} from './baidu.sign.ts'

// Define a fake cookie for request
const cookie = 'BAIDUID=0910869AA25ADCE1771F0773526F9874:FG=1;'

/**
 * Use `cookie` request web site for get `token` and `gtk`
 *
 * @returns Promise<{ token: string, gtk: string}>
 */
async function fetchTokens(): Promise<{token: string; gtk: string}> {
	const response = await fetch('https://fanyi.baidu.com/', {
		headers: {
			cookie,
		},
		referrerPolicy: 'strict-origin-when-cross-origin',
		body: null,
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
	})
	const text = await response.text()
	const token = text.match(/token:\s'([^']+)'/)?.[1] || ''
	const gtk = text.match(/window\.gtk\s=\s'([^']+)';/)?.[1] || ''

	if (!token || !gtk) throw Error('Fetch token & gtk fail.')
	return {token, gtk}
}

export async function detectLang(content: string): Promise<string> {
	const response = await fetch('https://fanyi.baidu.com/langdetect', {
		method: 'POST',
		headers: {
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
			cookie,
		},
		body: `query=${content}`,
	})
	// TODO: handler error
	// { error: 0, msg: "success", lan: "en" }
	const {lan} = await response.json()
	return lan
}

// TODO: options type
// deno-lint-ignore no-explicit-any
export async function translate(content: string, options: any = {}) {
	const {from = 'en', to = 'zh'} = options

	const {token, gtk} = await fetchTokens()

	const response = await fetch(
		`https://fanyi.baidu.com/v2transapi?from=${from}&to=${to}`,
		{
			method: 'POST',
			headers: {
				'content-type':
					'application/x-www-form-urlencoded; charset=UTF-8',
				cookie,
			},
			body: `from=${from}&to=${to}&query=${content}&simple_means_flag=3&sign=${sign(
				content,
				gtk,
			)}&token=${token}&domain=common`,
		},
	)

	// TODO: Normalize output
	return await response.json()
}
