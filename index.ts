import {translate as baidu} from './plugins/baidu.ts'
import {translate as google} from './plugins/google.ts'

export interface Options {
	engine: 'baidu' | 'google' | 'youdao'
	// TODO: List langs
	from: 'en' | string
	to: 'zh' | string
}

export async function translate(
	content: string,
	options: Options = {
		engine: 'baidu',
		from: 'en',
		to: 'zh',
	},
) {
	switch (options.engine) {
		case 'baidu':
			return await baidu(content, options)
		case 'google':
			return await google(content, options)
	}
}
