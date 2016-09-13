// var expect = require('chai').expect;
// var sinon = require('sinon');
var Lopata = require('./../index.js');

describe('working with cookies', function() {
  it('sets mutliple and separated cookies', function() {
    Lopata.setCookie('name', 'oeschger');
    Lopata.setCookie('age', '10');
    expect(document.cookie).to.equal('name=oeschger; age=10');
  });

  it('gets cookies', function() {
    document.cookie = 'name=oeschger';
    expect(Lopata.getCookie('name')).to.equal('oeschger');
  });
});

describe('working with dimensions', function() {
  var element;

  beforeEach(function() {
    element = document.createElement('div');
    element.style.height = '100px';
    document.body.appendChild(element);
  })

  it('count height without margins', function() {
    expect(Lopata.outerHeight(element)).to.equal(100);
  });

  it('count height without margins', function() {
    element.style.margin = '10px';
    expect(Lopata.outerHeight(element, true)).to.equal(120);
  });
});

describe('iterator', function() {
  it('iterates through all objects and calls functions', function() {
    var result = 0;
    Lopata.forEach([1, 2, 3], function() { result++; });
    expect(result).to.equal(3);
  });
});

describe('object merge', function() {
  it('merges two objects', function() {
    var a = { foo: 1 };
    var b = { bar: 2 };
    var c = Lopata.extend(a, b);

    expect(c.foo).to.equal(1);
    expect(c.bar).to.equal(2);
    expect(c.baz).to.be.undefined;
  });
});

describe('check for empty values', function() {
  it('checks for null', function() {
    expect(Lopata.isEmpty(null)).to.be.true;
  });

  it('checks for empty arrays', function() {
    expect(Lopata.isEmpty([])).to.be.true;
  });

  it('checks for filled arrays', function() {
    expect(Lopata.isEmpty([1, 2, 3])).to.be.false;
  });

  it('checks for empty objects', function() {
    expect(Lopata.isEmpty({})).to.be.true;
  });

  it('checks for non-empty objects', function() {
    expect(Lopata.isEmpty({ name: 'Bob' })).to.be.false;
  });
});

describe('check for element', function() {
  it('checks for nodetype', function() {
    var element = document.createTextNode('div');
    expect(Lopata.isElement(element)).to.be.false;
  });

  it('checks that element in HTMLElement', function() {
    var element = document.createElement('div');
    expect(Lopata.isElement(element)).to.be.true;
  });
});

describe('check for element in array', function() {
  it('check that element exists in array', function() {
    expect(Lopata.inArray(1, [1, 2, 3])).to.be.true;
  });

  it('check that element is not in array', function() {
    expect(Lopata.inArray(1, [2, 3])).to.be.false;
  });
});

describe('updateQuery', function() {
  it('adds params to url', function() {
    expect(Lopata.updateQuery('http://text.com', 'name', 'John')).to.equal("http://text.com?name=John");
  });

  it('updates params', function() {
    expect(Lopata.updateQuery('http://text.com?name=John', 'age', '30')).to.equal("http://text.com?name=John&age=30");
  });
});

describe('ajax', function() {
  var requests;

  beforeEach(function() {
    global.XMLHttpRequest = sinon.useFakeXMLHttpRequest();
    requests = [];
    global.XMLHttpRequest.onCreate = function(xhr) {
      requests.push(xhr);
    };
  });

  afterEach(function() {
    global.XMLHttpRequest.restore();
  });

  it('sends ajax requests', function() {
    var callback = sinon.spy();
    Lopata.ajax('/example', callback, function(){});
    requests[0].respond(200, { 'Content-Type': 'application/json' }, 'Hey there');
    expect(callback.calledWith('Hey there')).to.be.true;
  });
});

