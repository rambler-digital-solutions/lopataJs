# lopataJs
[![Build Status](https://api.travis-ci.org/rambler-digital-solutions/lopataJs.svg)](https://travis-ci.org/rambler-digital-solutions/lopataJs)
[![Dependency Status](https://gemnasium.com/badges/github.com/rambler-digital-solutions/lopataJs.svg)](https://gemnasium.com/github.com/rambler-digital-solutions/lopataJs)
[![Coverage Status](https://coveralls.io/repos/github/rambler-digital-solutions/lopataJs/badge.svg?branch=master)](https://coveralls.io/github/rambler-digital-solutions/lopataJs?branch=master)

Various tools for jqueryless development.

![](https://pp.vk.me/c626916/v626916242/223f2/I9G6VF_31yw.jpg)

This is collection of crutches for fast development w/out jquery-like libraries.

## We have:
- getCookie(name) - gets cookies for ya;
- setCookie(name, value, props)  - sets cookies;
- outerHeight(element, margins) - accepts element who you wanna measure, margins is an optional Boolean to take margins into account;
- forEach(array, callback, scope) - primitive and fast forEach implementation;
- extend(object1, object2) - shallow object merge;
- isEmpty(object) - checks if object is empty;
- isElement(element) - checks if object is an element;
- inArray(element, array) - check is some element is part of array;
- updateQuery(uri, key, value) - enrich your urls with different query values;
- ajax(url, success, failure) - simple get request with success and failure callbacks;
- jsonpRequest(url, callback) - jsonp implementation, good for overriding cross-origin policies;

## Installation

```
npm i lopataJs -save
```

## Usage

```
const Lopata = require('lopataJs');
let elemHeight = Lopata.outerHeight(element, true);
```

## License
MIT

## Authors
- Yan Brodetsky
- Eugene Abbakumov
- Ruslan Koshkarov

