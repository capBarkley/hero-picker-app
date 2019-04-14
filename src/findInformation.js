const rp = require('request-promise')
const request = require('request')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const port = 3000

let heroes = []

rp('https://dota2.gamepedia.com/Heroes')
	.then( html => {
		process.stdout.write('Containing heroes')
		let $ = cheerio.load(html)
		let heroesData = []
		$('tbody > tr > td > div > div > a').map( (index, element) => {
			process.stdout.write('.')
			let hero = {}
			hero.id = index
			hero.name = element.attribs.title
			hero.url = `https://dota2.gamepedia.com${element.attribs.href}`
			heroesData.push(hero)
		})
		getHeroPA(heroesData)
	})
	.catch( err => console.log(err))

const getHeroPA = heroesData => {
	process.stdout.write('\nGetting roles')
	let i = 0
	const next = () => {
		if (i < heroesData.length) {
			rp(heroesData[i].url)
				.then( html => {
					process.stdout.write('.')
					let $ = cheerio.load(html)
					let attributes = []
					$('table.evenrowsgray > tbody > tr > td').map( (i, obj) => {
						process.stdout.write('.')
						attributes.push($(obj).text().replace("\n", "").replace("%", ""))
					})
					$('table.oddrowsgray > tbody > tr > td').map( (i, obj) => {
						process.stdout.write('.')
						attributes.push($(obj).text().replace("\n", "").replace("%", ""))
					})

					let  roles = []
					$("a[title='Role']").map( (i, obj) => {
						roles.push($(obj).text())
					})

					heroes[i] = {
						id: heroesData[i].id,
						name: heroesData[i].name,
						url: heroesData[i].url,
						imgUrl: $('.infobox > tbody > tr > td > a > img').attr('src'),
						primaryAttribute: $('#primaryAttribute > a').attr('title'),
						health: Number(attributes[1]),
						healthReg: Number(attributes[5]),
						mana: Number(attributes[13]),
						manaReg: Number(attributes[17]),
						armor: Number(attributes[25]),
						attackSpeed: Number(attributes[29]),
						damage: attributes[37],
						moveSpeed: Number(attributes[40]),
						attackRange: (attributes[43] <= 300) ? 'melee' : 'range',
						roles: roles
					}
					++i
					return next()
				})
		} else {
			getHeroCounters(heroes);
		}
	}
	return next()
}

const getHeroCounters = heroesData => {
	process.stdout.write('\nGetting counters')
	let i = 0
	const next = () => {
		if (i < heroesData.length) {
			rp(heroesData[i].url+'/Counters')
				.then( html => {
					process.stdout.write('.')
					let $ = cheerio.load(html);
					let counters = { badAgainst: [],
						goodAgainst: [],
						worksWell: []};

					$('div').map((i, el) => {
						if ($(el).css('box-shadow') == '0px 0px 2px 4px red') {
							return el
						}
					}).children('a').map( (i, el) => {
						counters.badAgainst.push($(el).attr('title'))
					});

					$('div').map((i, el) => {
						if ($(el).css('box-shadow') == '0px 0px 2px 4px chartreuse') {
							return el
						}
					}).children('a').map( (i, el) => {
						counters.goodAgainst.push($(el).attr('title'))
					});

					$('div').map((i, el) => {
						if ($(el).css('box-shadow') == '0px 0px 2px 4px skyblue') {
							return el
						}
					}).children('a').map( (i, el) => {
						counters.worksWell.push($(el).attr('title'))
					});

					heroes[i].counters = counters;
					++i
					return next()
				})
		} else {
			printData();
		}
	}
	return next()
}

const printData = () => {
	app.get('/', (req, res) => res.send(JSON.stringify(heroes)))

	app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}