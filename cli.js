#!/usr/bin/env node

const { mdLinks } = require('./index.js')
const { statsLinks } = require('./functions.js')
const chalk = require('chalk')

const route = process.argv[2]
const args = process.argv

function cli(route, args) {
  if (args.length === 3) {
    mdLinks(route, { validate: false }).then((value) => {
      if (value === 'There are no markdown files' || value === 'There are no links' || value === 'That path does not exist') { console.log(chalk.bgRed(value)) }
      else { value.forEach((element) => console.log(element.file, element.href, chalk.greenBright(element.text))) }
    })
  }

  else if (args.length === 4 && args[3] === '--validate') {
    mdLinks(route, { validate: true }).then((value) => {
      if (value === 'There are no markdown files' || value === 'There are no links' || value === 'That path does not exist') { console.log(chalk.bgRed(value)) }
      else { value.forEach((element) => console.log(element.file, element.href, chalk.greenBright(element.ok), element.status, chalk.greenBright(element.text))) }
    })
  }

  else if (args.length === 4 && args[3] === '--stats') {
    mdLinks(route, { validate: false }).then((value) => {
      if (value === 'There are no markdown files' || value === 'There are no links' || value === 'That path does not exist') { console.log(chalk.bgRed(value)) }
      else {
        const stats = statsLinks(value)
        console.log(`Total: ${chalk.greenBright(stats.Total)}\nUnique: ${chalk.greenBright(stats.Unique)}`)
      }
    })
  }

  else if (args.length === 5 && args.includes('--stats') && args.includes('--validate')) {
    mdLinks(route, { validate: true }).then((value) => {
      if (value === 'There are no markdown files' || value === 'There are no links' || value === 'That path does not exist') { console.log(chalk.bgRed(value)) }
      else {
        const stats = statsLinks(value)
        console.log(`Total: ${chalk.greenBright(stats.Total)}\nUnique: ${chalk.greenBright(stats.Unique)}\nBroquen: ${chalk.greenBright(stats.Broken)}`)
      }
    })
  }

  else { console.log(chalk.bgRed('Write valid options after your path')) }
}

cli(route, args)






