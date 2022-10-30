const fs = require('fs');
const path = require('path');
const marked = require('marked')
const axios = require('axios');

function processFile(file) {
  return new Promise((resolve, reject) => {
    let arrayLinks = []

    fs.readFile(file, 'utf8', (error, dataFile) => {
      if (error) {
        resolve(error)
      }

      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        const linkData = {
          'href': href,
          'text': text.split('').slice(0, 50).join(''),
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

function processLink(link) {
  return new Promise((resolve, reject) => {

    axios.get(link.href)
      .then((response) => {
        link.status = response.status
        link.ok = response.statusText
        resolve(link)
      })
      .catch((error) => {
        if (error.response) {
          link.status = error.response.status
        }
        else {
          link.status = 'Without response from server'
        }
        link.ok = 'fail'
        resolve(link)
      })
  })
}

function validateLinks(arrayLinks) {
  return new Promise((resolve, reject) => {
    const arrayValidated = arrayLinks.map((link) => processLink(link))
    Promise.all(arrayValidated).then((val) => resolve(val))
  })
}

function getLinks(arrayFilesMD) {
  return new Promise((resolve, reject) => {
    const arrayAllLinks = arrayFilesMD.map((file) => processFile(file))
    Promise.all(arrayAllLinks).then((val) => resolve(val.flat()))
  })
}

function getFilesMD(arrayFiles) {
  const arrayFilesMD = arrayFiles.filter((file) => path.extname(file) === '.md')
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
    arrayDirectory.forEach((element) => {
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

function statsLinks(arrayLinks) {
  const arrayHref = []
  arrayLinks.forEach((link) => arrayHref.push(link.href))
  const arrayBrokenLinks = arrayLinks.filter((link) => link.ok === 'fail')

  return {
    Total: arrayLinks.length,
    Unique: new Set(arrayHref).size,
    Broken: arrayBrokenLinks.length
  }
}

module.exports = { getLinks, pathIsAbsolute, getFiles, getFilesMD, validateLinks, statsLinks }