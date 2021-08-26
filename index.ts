// Baidu API
// https://fanyi.baidu.com/v2transapi?from=en&to=zh

import {translate as baidu} from './plugins/baidu.ts'

// deno-lint-ignore no-explicit-any
export async function translate(content: string, options: any = {}) {
	const engine = 'baidu'

	switch (engine) {
		case 'baidu':
			return await baidu(content, options)
	}
}
