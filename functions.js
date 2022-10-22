const fs = require('fs');
const path = require('path');

function readFiles(arrayFilesMD) {

  if (arrayFilesMD === 'No hay archivos .md') {
    return []
  }

  arrayFilesMD.map((file) => fs.readFile(file, 'utf8', (error, dataFile) => {
    if (error) {
      console.log(error);
      return;
    }
    console.log({
      data: dataFile,
      path: file
    });
    return {
      data: dataFile,
      path: file,
    }
  }))

}

function getFilesMD(arrayFiles) {
  const arrayFilesMD = arrayFiles.filter(element => path.extname(element) === '.md')
  const message = 'No hay archivos .md'

  if (arrayFilesMD.length === 0) {
    return message
  }

  else {
    return arrayFilesMD
  }
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

module.exports = { readFiles, pathIsAbsolute, getFiles, getFilesMD }