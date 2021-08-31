// refs: https://github.com/vitalets/google-translate-api

import {Options} from '../index.ts'

function extract(key: string, html: string) {
	var re = new RegExp(`"${key}":".*?"`)
	var result = re.exec(html)
	if (result !== null) {
		return result[0].replace(`"${key}":"`, '').slice(0, -1)
	}
	return ''
}

export async function translate(content: string, options: Options) {
	const {to, from} = options
	// https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

	let url = 'https://translate.google.cn'
	let data = {}
	// Generate data
	{
		const response = await fetch(url)
		const html = await response.text()
		data = {
			rpcids: 'MkEWBc',
			'f.sid': extract('FdrFJe', html),
			bl: extract('cfb2h', html),
			hl: 'en-US',
			'soc-app': 1,
			'soc-platform': 1,
			'soc-device': 1,
			_reqid: Math.floor(1000 + Math.random() * 9000),
			rt: 'c',
		}
	}

	// Fetch
	{
		const params = new URLSearchParams(data)
		url = `${url}/_/TranslateWebserverUi/data/batchexecute?${params.toString()}`
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'content-type':
					'application/x-www-form-urlencoded; charset=UTF-8',
			},
			body: `f.req=${encodeURIComponent(
				JSON.stringify([
					[
						[
							'MkEWBc',
							JSON.stringify([[content, from, to, true], [null]]),
							null,
							'generic',
						],
					],
				]),
			)}&`,
		})
		let json = await response.text()
		json = json.slice(6)

		let length = ''
		const result = {
			text: '',
			raw: '',
		}

		try {
			length = /^\d+/.exec(json)![0]
			json = JSON.parse(
				json.slice(length.length, parseInt(length, 10) + length.length),
			)
			json = JSON.parse(json[0][2])
			result.raw = json
			console.log(json)
		} catch (error) {
			console.log(error)
		}

		if (json[1][0][0][5] === undefined || json[1][0][0][5] === null) {
			// translation not found, could be a hyperlink or gender-specific translation?
			result.text = json[1][0][0][0]
		} else {
			result.text = (json[1][0][0][5] as any)
				.map(function (obj: any) {
					return obj[0]
				})
				.filter(Boolean)
				// Google api seems to split text per sentences by <dot><space>
				// So we join text back with spaces.
				// See: https://github.com/vitalets/google-translate-api/issues/73
				.join(' ')
		}

		// TODO
		console.log(result)
	}
}

translate('demo', {
	to: 'zh-CN',
	from: 'en',
	engine: 'google',
})
