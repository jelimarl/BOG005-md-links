# md-links 

jleon-md-links is a library that can get http links from markdown files. Besides basic information about links, it gives some stats:

*Total* <br> 
*Unique links* <br>
*Broken links* 

## Table of Contents

* [1 Installation](#1-installation)
* [2 Usage](#2-usage)
* [2.1 API](#21-api)
* [2.2 CLI](#22-cli)

## 1 Installation

On the command line run this:
  ```
  npm install jleon-md-links
  ```

## 2 Usage

### 2.1 API

**Import** the library with `require()`
```js
const {mdLinks} = require('jleon-md-links');
```

This is the function you will use:
##### `mdLinks(path, options)`

* `path`: *absolute* or *relative* route to the *file* or *directory*.
* `options`: An object with only this property:
  - `validate`: Boolean that determines if links need to be validated.

It *returns* a `Promise` that is *resolved* with an `Array` of objects, where every `Object` represents a link and contains these properties:

With `validate:false` :
* `href`: URL that was found.
* `text`: Text inside the link (`<a>`).
* `file`: Files's route where the link was found.

With `validate:true` :
* `href`: URL that was found.
* `text`: Text inside the link (`<a>`).
* `file`: Files's route where the link was found.
* `status`: Response HTTP Code.
* `ok`: Message `fail` or `ok` (if it was successful).

Examples (results as comments):
```js
const {mdLinks} = require("jleon-md-links");

mdLinks("./some/example.md", { validate: false })
  .then(links => console.log(links)
    // => [{ href, text, file }, ...]
  )
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => console.log(links)
    // => [{ href, text, file, status, ok }, ...]
  )
  .catch(console.error);

mdLinks("./some/dir", { validate: false })
  .then(links => console.log(links)
    // => [{ href, text, file }, ...]
  )
  .catch(console.error);

mdLinks("./some/dir", { validate: true })
  .then(links => console.log(links)
    // => [{ href, text, file, status, ok }, ...]
  )
  .catch(console.error);
```

### 2.2 CLI

This is the way you can use the executable file by the command line:

`md-links <path-to-file> [options]`

An example:
```sh
$ md-links ./some/example.md
./some/example.md http://something.com/2/3/ Link to something
./some/example.md https://otra-cosa.net/any-doc.html any doc
./some/example.md http://google.com/ Google
```

##### Options

##### `--validate`

An example:
```sh
$ md-links ./some/example.md --validate
./some/example.md http://something.com/2/3/ ok 200 Link to something
./some/example.md https://otra-cosa.net/any-doc.html fail 404 any doc
./some/example.md http://google.com/ ok 301 Google
```

##### `--stats`

An example:
```sh
$ md-links ./some/example.md --stats
Total: 3
Unique: 3
```

Also you can use both `--stats` and `--validate` (it does not matter the order).

Examples:
```sh
$ md-links ./some/example.md --stats --validate
Total: 3
Unique: 3
Broken: 1
```

```sh
$ md-links ./some/example.md --validate --stats
Total: 3
Unique: 3
Broken: 1
```