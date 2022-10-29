const dataMocks = {
  pathDir: 'dir-test1',
  arrayValidateTrue: [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\jelim\\OneDrive\\Documentos\\laboratoria\\BOG005-md-links\\dir-test1\\file-test2.md',
      status: 200,
      ok: 'OK'
    },
    {
      href: 'https://n.odejs.org/',
      text: 'Node.js',
      file: 'C:\\Users\\jelim\\OneDrive\\Documentos\\laboratoria\\BOG005-md-links\\dir-test1\\file-test2.md',
      status: 'Without response from server',
      ok: 'fail'
    }
  ],
  arrayValidateFalse: [
    {
      href: 'https://es.wikipedia.org/wiki/Markdown',
      text: 'Markdown',
      file: 'C:\\Users\\jelim\\OneDrive\\Documentos\\laboratoria\\BOG005-md-links\\dir-test1\\file-test2.md'
    },
    {
      href: 'https://n.odejs.org/',
      text: 'Node.js',
      file: 'C:\\Users\\jelim\\OneDrive\\Documentos\\laboratoria\\BOG005-md-links\\dir-test1\\file-test2.md'
    }
  ],
  stats: { Total: 2, Unique: 2, Broken: 1 }
}

module.exports = dataMocks 