const { mdLinks } = require('./index.js')
const { statsLinks } = require('./functions.js')
const route = process.argv[2]
const args = process.argv

function cli(route, args) {
  if (args.length === 3) {
    mdLinks(route, { validate: false }).then((value) => {
      if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
      else { value.forEach((element) => console.log(element.file, element.href, element.text)) }
    })
  }

  if (args.length === 4 && args[3] === '--validate') {
    mdLinks(route, { validate: true }).then((value) => {
      if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
      else { value.forEach((element) => console.log(element.file, element.href, element.ok, element.status, element.text)) }
    })
  }

  if (args.length === 4 && args[3] === '--stats') {
    mdLinks(route, { validate: false }).then((value) => {
      if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
      else {
        const stats = statsLinks(value)
        console.log(`Total: ${stats.Total}\nUnique: ${stats.Unique}`)
      }
    })
  }

  if (args.length === 5 && args.includes('--stats') && args.includes('--validate')) {
    mdLinks(route, { validate: true }).then((value) => {
      if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
      else {
        const stats = statsLinks(value)
        console.log(`Total: ${stats.Total}\nUnique: ${stats.Unique}\nBroquen: ${stats.Broken}`)
      }
    })
  }

  console.log('Write valid options after your path')
}

mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: false }).then((value) => {
  if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
  else { value.forEach((element) => console.log(element.file, element.href, element.text)) }
})

mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: true }).then((value) => {
  if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
  else { value.forEach((element) => console.log(element.file, element.href, element.ok, element.status, element.text)) }
})

mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: false }).then((value) => {
  if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
  else {
    const stats = statsLinks(value)
    console.log(`Total: ${stats.Total}\nUnique: ${stats.Unique}`)
  }
})

mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: true }).then((value) => {
  if (value === 'There are no .md files' || value === 'There are no links') { console.log(value) }
  else {
    const stats = statsLinks(value)
    console.log(`Total: ${stats.Total}\nUnique: ${stats.Unique}\nBroquen: ${stats.Broken}`)
  }
})






