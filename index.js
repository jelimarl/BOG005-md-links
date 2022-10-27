const { pathIsAbsolute, getFiles, getFilesMD, getLinks, validateLinks } = require('./functions.js')
const chalk = require('chalk')

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
  
        links.then((val) => {
          if (val.length === 0) {
            resolve('There are no links')
          }
          const validatedLinks = validateLinks(val)
          resolve(validatedLinks)
        })
      }
  
      else {
        if (filesMD.length === 0) {
          resolve('There are no .md files')
        }
        links.then((val) => {
          if (val.length === 0) {
            resolve('There are no links')
          }
          resolve(val)
        })
      }
    } catch (error) {
      console.log('Path does not exist')
    }

  })
}

mdLinks('functions.js', { validate: true }).then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba1', { validate: true }).then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: true }).then((val) => console.log(val))
//mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/node_modules', { validate: true }).then((val) => console.log(val))

module.exports = () => {
  // ...
};
