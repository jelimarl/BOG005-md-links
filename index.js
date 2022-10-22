const { pathIsAbsolute, getFiles, getFilesMD, readFiles } = require('./functions.js')
const chalk = require('chalk')

function mdLinks(path, options) {
  return new Promise((resolve, reject) => {
    const absolutePath = pathIsAbsolute(path);
    const files = getFiles(absolutePath);
    const filesMD = getFilesMD(files)
    //console.log(filesMD)
    const filesContent = readFiles(filesMD)
    resolve(filesContent)
  })
}

//mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/test/md-links.spec.js').then((val) => console.log(val))
//mdLinks('lib/functions.js').then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/Prueba').then((val) => console.log(val))
mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/node_modules').then((val) => console.log(val))

module.exports = () => {
  // ...
};
