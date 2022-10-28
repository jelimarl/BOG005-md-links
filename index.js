const { pathIsAbsolute, getFiles, getFilesMD, getLinks, validateLinks } = require('./functions.js')

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {

    try {
      const absolutePath = pathIsAbsolute(path);
      const files = getFiles(absolutePath);
      const filesMD = getFilesMD(files)
      const links = getLinks(filesMD)

      if (options.validate === true) {

        if (filesMD.length === 0) {
          resolve('There are no .md files')
        }

        links.then((value) => {
          if (value.length === 0) {
            resolve('There are no links')
          }
          const validatedLinks = validateLinks(value)
          resolve(validatedLinks)
        })
      }

      else {
        if (filesMD.length === 0) {
          resolve('There are no .md files')
        }
        links.then((value) => {
          if (value.length === 0) {
            resolve('There are no links')
          }
          resolve(value)
        })
      }
    } catch (error) {
      console.log('That path does not exist')
    }

  })
}

// mdLinks('functions.js', { validate: true }).then((val) => console.log(val))
// mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba1', { validate: true }).then((val) => console.log(val))
// mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: true }).then((val) => console.log(val))
// mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/node_modules', { validate: true }).then((val) => console.log(val))

module.exports = { mdLinks }
