// Baidu API
// https://fanyi.baidu.com/v2transapi?from=en&to=zh

import {sign} from './baidu.sign.ts'

const api = 'https://fanyi.baidu.com/v2transapi?from=en&to=zh'
const cookie = 'BAIDUID=0910869AA25ADCE1771F0773526F9874:FG=1;'

export async function translate(content: string, options: any = {}) {
	const {from = 'en', to = 'zh'} = options

	let token: string
	let gtk: string

	// 1. Get token & gtk
	{
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
		token = text.match(/token:\s'([^']+)'/)?.[1] || ''
		gtk = text.match(/window\.gtk\s=\s'([^']+)';/)?.[1] || ''
		console.log(`Parse html:`, {token, gtk})
	}

	// 2. lang detect
	// POST: https://fanyi.baidu.com/langdetect body: {query: $value}

	// 3. Fetch translate
	if (!token || !gtk) throw Error('Fetch token & gtk fail.')

	console.log(`Sign value:`, {sign: sign(content, gtk)})

	{
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

		console.log(await response.json())
	}
}

// Test
translate('This is test case')
