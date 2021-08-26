import {assertEquals} from 'https://deno.land/std@0.75.0/testing/asserts.ts'

import {detectLang, translate} from './baidu.ts'

Deno.test('Detect language: `test` => `en`', async () => {
	const lang = await detectLang('test')
	assertEquals('en', lang)
})

Deno.test('Detect language: `中文` => `zh`', async () => {
	const lang = await detectLang('中文')
	assertEquals('zh', lang)
})

Deno.test('Translate test: `test` => `测试`', async () => {
	// TODO: result struct
	// deno-lint-ignore no-explicit-any
	const result: any = await translate('test')
	const translation = result.trans_result.data[0].dst
	assertEquals('测试', translation)
})
