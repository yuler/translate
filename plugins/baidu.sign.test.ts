import {assertEquals} from 'https://deno.land/std@0.75.0/testing/asserts.ts'

import {sign} from './baidu.sign.ts'

Deno.test(
	`{ query: 'demo', gtk: '320305.131321201' } => sign: '163551.433646'`,
	() => {
		assertEquals('163551.433646', sign('demo', '320305.131321201'))
	},
)
