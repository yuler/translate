// Baidu API
// https://fanyi.baidu.com/v2transapi?from=en&to=zh

const api = 'https://fanyi.baidu.com/v2transapi?from=en&to=zh'

// fetch("https://fanyi.baidu.com/v2transapi?from=en&to=zh", {
//   "headers": {
//     "accept": "*/*",
//     "accept-language": "en-US,en;q=0.9",
//     "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
//     "sec-ch-ua": "\"Chromium\";v=\"92\", \" Not A;Brand\";v=\"99\", \"Google Chrome\";v=\"92\"",
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     "x-requested-with": "XMLHttpRequest",
//     "cookie": "BIDUPSID=0399953F17FEAA0C1A0D3B5A17CC651C; PSTM=1622800738; BAIDUID=0399953F17FEAA0CD299603487542168:FG=1; __yjs_duid=1_30131ea74fc2ab291611f4293642acef1622872643824; REALTIME_TRANS_SWITCH=1; FANYI_WORD_SWITCH=1; HISTORY_SWITCH=1; SOUND_SPD_SWITCH=1; SOUND_PREFER_SWITCH=1; MCITY=-%3A; Hm_lvt_64ecd82404c51e03dc91cb9e8c025574=1628329610,1629171390; delPer=0; BAIDUID_BFESS=1EE6B2752365E786543BAADF49E6D351:FG=1; BCLID=9058541556667588768; BDSFRCVID=WNtOJeC626PZKr6HKT4Sbhidsg3SOxnTH6aoQ8_HRWMzWk7dicTNEG0P-U8g0KubrqyqogKK0mOTHUkF_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF=tb48_CDMfIt3HJOmMJjE5bcHbxo0b-vtHD7XVM3kbp7keq8CD6jmWxPXj47iLT3gKDb00POjtMOcJbr2y5jHhpobBP7NLMrEQK0f0nTJQprpsIJMqq_WbT8U5f5HbRcDaKviaKJEBMb1SJvDBT5h2M4qMxtOLR3pWDTm_q5TtUJMeCnTD-Dhe4tX-NFJtj_O3e; BCLID_BFESS=9058541556667588768; BDSFRCVID_BFESS=WNtOJeC626PZKr6HKT4Sbhidsg3SOxnTH6aoQ8_HRWMzWk7dicTNEG0P-U8g0KubrqyqogKK0mOTHUkF_2uxOjjg8UtVJeC6EG0Ptf8g0f5; H_BDCLCKID_SF_BFESS=tb48_CDMfIt3HJOmMJjE5bcHbxo0b-vtHD7XVM3kbp7keq8CD6jmWxPXj47iLT3gKDb00POjtMOcJbr2y5jHhpobBP7NLMrEQK0f0nTJQprpsIJMqq_WbT8U5f5HbRcDaKviaKJEBMb1SJvDBT5h2M4qMxtOLR3pWDTm_q5TtUJMeCnTD-Dhe4tX-NFJtj_O3e; ZD_ENTRY=google; PSINO=1; H_PS_PSSID=34433_34445_34380_31660_34403_34004_34072_34092_34106_26350_34416_34390; __yjs_st=2_ODQ1NjRhOTNkMTQ4NWFmYjZmZTgyZDM0MDY3M2Q5ZGUwMzllMzAyYTM4MTMwMjM3ODAzY2I5ODI0Y2Y2YWNkMWE5YzcxNzk1ODNmNzJhMWYwMDA3OTZkYTAwNTczYjk1ZmNjYzgzMzY3MjE4MGVlOWY4MzQ4MzM5NDhjYjZmYmM5NzYyNWQyMjY1MjY2ZDFlM2Q0MzViZTEyNjI5YmM2M2NlOGE3NTEwOTYwOTIyYzkxNWE5MzRjN2I1OGFkMTNmNjYzNDJhMmE0NjE4ODljNjY5YjBlNThiMzdlMGIwNzk1MzVjZGFhM2Y2ZWQ5ZTdlODJjZDdhNDU5NDE0YmRhMl83X2NkNTQzZDY3; Hm_lpvt_64ecd82404c51e03dc91cb9e8c025574=1629878899; ab_sr=1.0.1_MjI1ZjU3ZGJhYjgwZmZhNzJmNzAzMDYxNzA2MDU1NWM4YzMzYWU1NGMxY2VmOTk5ZTJmZThlYTU1MTJmZGQzNTJiMjhjNDJiOWVhNzY3MmYzYzBiNzI2NTUzMGZjNjVkZTAyYWNkYjg1YWUzY2M5YjZjMzZhZTAwNjhhZWM5YTAzNGM1M2FmNDEzNWM1MmI5OTkxMmM3OTQ1ODI4OTY3Mw=="
//   },
//   "referrer": "https://fanyi.baidu.com/",
//   "referrerPolicy": "strict-origin-when-cross-origin",
//   "body": "from=en&to=zh&query=demo&simple_means_flag=3&sign=163551.433646&token=347f240cd62a082193266f3be496d853&domain=common",
//   "method": "POST",
//   "mode": "cors"
// });

// window.gtk = '320305.131321201'
// token: 'f10fac90f6f2a8ce0c570e4203522a17',

export async function translate(content: string, options: any = {}) {
	const response = await fetch(
		'https://fanyi.baidu.com/v2transapi?from=en&to=zh',
		{
			headers: {
				accept: '*/*',
				'accept-language': 'en-US,en;q=0.9',
				'content-type':
					'application/x-www-form-urlencoded; charset=UTF-8',
				'sec-ch-ua':
					'"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
				'sec-ch-ua-mobile': '?0',
				'sec-fetch-dest': 'empty',
				'sec-fetch-mode': 'cors',
				'sec-fetch-site': 'same-origin',
				'x-requested-with': 'XMLHttpRequest',
				cookie: 'BAIDUID=0399953F17FEAA0CD299603487542168:FG=1;',
			},
			referrer: 'https://fanyi.baidu.com/',
			referrerPolicy: 'strict-origin-when-cross-origin',
			body: 'from=en&to=zh&query=demo&simple_means_flag=3&sign=163551.433646&token=347f240cd62a082193266f3be496d853&domain=common',
			method: 'POST',
			mode: 'cors',
		},
	)
	// const response = await fetch(api, {
	// 	referrer: 'https://fanyi.baidu.com/',
	// 	method: 'POST',
	// 	body: JSON.stringify({
	// 		from: 'en',
	// 		to: 'zh',
	// 		query: 'demo',
	// 		simple_means_flag: '3',
	// 		sign: '163551.433646',
	// 		token: '347f240cd62a082193266f3be496d853',
	// 		domain: 'common',
	// 	}),
	// })
	console.log(await response.json())
}

translate('xxx')
