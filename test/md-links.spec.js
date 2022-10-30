const { mdLinks } = require('../index');
const { statsLinks } = require('../functions')
const dataMocks = require('./data-mocks.js');

describe('mdLinks', () => {

  it('checks when user does not write a path', () => {

    return mdLinks({ validate: false }).then((value) => {
      expect(value).toEqual('That path does not exist')
    })
  });

  it('checks when user writes a wrong path', () => {

    return mdLinks('hola', { validate: false }).then((value) => {
      expect(value).toEqual('That path does not exist')
    })
  });

  it('checks a file that is not markdown', () => {

    return mdLinks('index.js', { validate: false }).then((value) => {
      expect(value).toEqual('There are no markdown files')
    })
  });

  it('checks a markdown file without http links', () => {

    return mdLinks('file-test.md', { validate: false }).then((value) => {
      expect(value).toEqual('There are no links')
    })
  });

  it('checks an empty folder (absolute path)', () => {

    return mdLinks('C:/Users/jelim/OneDrive/Documentos/laboratoria/BOG005-md-links/empty-dir', { validate: true }).then((value) => {
      expect(value).toEqual('There are no markdown files')
    })
  });

  it('checks option validate: false, with a folder that has files and another folder inside', () => {

    return mdLinks(dataMocks.pathDir, { validate: false }).then((value) => {
      expect(value).toEqual(dataMocks.arrayValidateFalse)
    })
  });

  it('checks option validate: true, with a folder that has files and another folder inside', () => {

    return mdLinks(dataMocks.pathDir, { validate: true }).then((value) => {
      expect(value).toEqual(dataMocks.arrayValidateTrue)
    })
  });

});

describe('statsLinks', () => {

  it('checks all the stats when validate: true', () => {

    expect(statsLinks(dataMocks.arrayValidateTrue)).toEqual(dataMocks.stats)
  });

  it('checks when function receives an empty array', () => {

    expect(statsLinks([])).toEqual({ Total: 0, Unique: 0, Broken: 0 })
  });

})
