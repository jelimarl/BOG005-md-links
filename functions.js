const fs = require('fs');
const path = require('path');
const marked = require('marked')

function processFile(file) {
  return new Promise((resolve, reject) => {
    let arrayLinks = []

    fs.readFile(file, 'utf8', (error, dataFile) => {
      if (error) {
        console.log(error);
        resolve(error)
      }

      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        const linkData = {
          'href': href,
          'text': text,
          'file': file
        }

        if (linkData.href.includes('http')) {
          arrayLinks.push(linkData)
        }
      }

      marked.marked(dataFile, { renderer })
      resolve(arrayLinks)
    })
  })
}

function getLinks(arrayFilesMD) {
  return new Promise((resolve, reject) => {

    if (arrayFilesMD.length === 0) {
      resolve('No hay archivos .md')
    }

    const arrayAllLinks = arrayFilesMD.map((file) => processFile(file))

    Promise.all(arrayAllLinks).then((val) => {
      if (val.flat().length === 0) {
        resolve('No hay links')
      }
      else {
        resolve(val.flat())
      }
    })
  })
}

function getFilesMD(arrayFiles) {
  const arrayFilesMD = arrayFiles.filter(element => path.extname(element) === '.md')

  return arrayFilesMD
}

function pathIsAbsolute(newPath) {
  switch (path.isAbsolute(newPath)) {
    case true:
      return newPath;
    case false:
      return path.resolve(newPath);
  }
}

function getFiles(newPath) {
  let arrayFiles = []

  if (fs.statSync(newPath).isFile()) {
    arrayFiles.push(newPath)
  }

  else {
    const arrayDirectory = fs.readdirSync(newPath)
    arrayDirectory.forEach(element => {
      let childPath = path.join(newPath, element)

      if (fs.statSync(childPath).isDirectory()) {
        arrayFiles = arrayFiles.concat(getFiles(childPath))
      }

      else {
        arrayFiles.push(childPath)
      }
    })
  }

  return arrayFiles;
}

module.exports = { getLinks, pathIsAbsolute, getFiles, getFilesMD }