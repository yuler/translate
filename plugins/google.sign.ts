/**
 * This code is copy from https://github.com/matheuss/google-translate-token
 *
 * And modify something for works Deno.
 */

// @ts-nocheck
// deno-lint-ignore-file
function sM(a) {
	var b
	if (null !== yr) b = yr
	else {
		b = wr(String.fromCharCode(84))
		var c = wr(String.fromCharCode(75))
		b = [b(), b()]
		b[1] = c()
		b = (yr = window[b.join(c())] || '') || ''
	}
	var d = wr(String.fromCharCode(116)),
		c = wr(String.fromCharCode(107)),
		d = [d(), d()]
	d[1] = c()
	c = '&' + d.join('') + '='
	d = b.split('.')
	b = Number(d[0]) || 0
	for (var e = [], f = 0, g = 0; g < a.length; g++) {
		var l = a.charCodeAt(g)
		128 > l
			? (e[f++] = l)
			: (2048 > l
					? (e[f++] = (l >> 6) | 192)
					: (55296 == (l & 64512) &&
					  g + 1 < a.length &&
					  56320 == (a.charCodeAt(g + 1) & 64512)
							? ((l =
									65536 +
									((l & 1023) << 10) +
									(a.charCodeAt(++g) & 1023)),
							  (e[f++] = (l >> 18) | 240),
							  (e[f++] = ((l >> 12) & 63) | 128))
							: (e[f++] = (l >> 12) | 224),
					  (e[f++] = ((l >> 6) & 63) | 128)),
			  (e[f++] = (l & 63) | 128))
	}
	a = b
	for (f = 0; f < e.length; f++) (a += e[f]), (a = xr(a, '+-a^+6'))
	a = xr(a, '+-3^+b+-f')
	a ^= Number(d[1]) || 0
	0 > a && (a = (a & 2147483647) + 2147483648)
	a %= 1e6
	return c + (a.toString() + '.' + (a ^ b))
}

var yr = null
var wr = function (a) {
		return function () {
			return a
		}
	},
	xr = function (a, b) {
		for (var c = 0; c < b.length - 2; c += 3) {
			var d = b.charAt(c + 2),
				d = 'a' <= d ? d.charCodeAt(0) - 87 : Number(d),
				d = '+' == b.charAt(c + 1) ? a >>> d : a << d
			a = '+' == b.charAt(c) ? (a + d) & 4294967295 : a ^ d
		}
		return a
	}

// TODO: add cache for 1h
export async function fetchToken() {
	const response = await fetch('https://translate.google.com')
	const html = await response.text()
	console.log(html)
	const code = html.match(/tkk:'(\d+\.\d+)'/)
	console.log('xxx')
	console.log(code)
	// if (code) {
	// 	eval(code[0])
	// 	console.log(TTK)
	// }
}

// Deno localStorge
