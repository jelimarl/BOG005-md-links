const { pathIsAbsolute, getFiles, getFilesMD, getLinks } = require('./functions.js')
const chalk = require('chalk')

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const absolutePath = pathIsAbsolute(path);
    const files = getFiles(absolutePath);
    const filesMD = getFilesMD(files)

    if (options.validate === true) {
      resolve('En construcción')
    }

    else {
      const links = getLinks(filesMD)
      resolve(links)
    }
  })
}

//mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/test/md-links.spec.js').then((val) => console.log(val))
mdLinks('functions.js', { validate: false }).then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba1', { validate: false }).then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba2', { validate: false }).then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/node_modules', { validate: false }).then((val) => console.log(val))

module.exports = () => {
  // ...
};
