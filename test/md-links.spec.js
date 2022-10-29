const { mdLinks } = require('../index');
const { statsLinks } = require('../functions')
const dataMocks = require('./data-mocks.js');
const { default: axios } = require('axios');

// jest.mock("axios", () => {
//   return axios.get(() => Promise.resolve({ status: 200, statusText: "OK" }))
// });

// jest.mock("axios");

// axios.get.mockResolvedValueOnce({ status: 200, statusText: "OK" });

// jest.mock("axios", () => {
//   return axios.get.mockResolvedValueOnce({ status: 200, statusText: "OK" })
// });

describe('mdLinks', () => {

  it('should...', () => {

    return mdLinks('hola', { validate: false }).then((value) => {
      expect(value).toEqual('That path does not exist')
    })
  });

  it('should...', () => {

    return mdLinks('index.js', { validate: false }).then((value) => {
      expect(value).toEqual('There are no .md files')
    })
  });

  it('should...', () => {

    return mdLinks('file-test.md', { validate: false }).then((value) => {
      expect(value).toEqual('There are no links')
    })
  });

  it('should...', () => {

    return mdLinks('empty-dir', { validate: false }).then((value) => {
      expect(value).toEqual('There are no .md files')
    })
  });

  it('should...', () => {

    return mdLinks(dataMocks.pathDir, { validate: false }).then((value) => {
      expect(value).toEqual(dataMocks.arrayValidateFalse)
    })
  });

  it('should...', () => {

    return mdLinks(dataMocks.pathDir, { validate: true }).then((value) => {
      expect(value).toEqual(dataMocks.arrayValidateTrue)
    })
  });

});

describe('statsLinks', () => {

  it('should...', () => {

    expect(statsLinks(dataMocks.arrayValidateTrue)).toEqual(dataMocks.stats)
  });

})
