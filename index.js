module.exports = {
  getCookie: function(name) {
    let matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  setCookie: function(name, value, props) {
    var _props = props || {};
    var exp = _props.expires;
    var d;
    var _value = encodeURIComponent(value);
    var updatedCookie;
    var propName;
    var propValue;
    if (typeof exp === 'number' && exp) {
      d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = _props.expires = d;
    }
    if (exp && exp.toUTCString) _props.expires = exp.toUTCString();
    updatedCookie = name + '=' + _value;
    for (propName in _props) {
      if (!_props.hasOwnProperty(propName)) continue;
      updatedCookie += '; ' + propName;
      propValue = _props[propName];
      if (propValue !== true) updatedCookie += '=' + propValue;
    }
    document.cookie = updatedCookie;
  },
  outerHeight: function (el, margins) {
    var height = el.offsetHeight;
    var style;
    if (!margins) return height;
    style = getComputedStyle(el);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  },
  forEach: function(array, callback, scope) {
    for (var i = 0; i < array.length; i++) callback.call(scope, i, array[i]);
  },
  extend: function(obj1, obj2) {
    var extended = {};
    var merge = function(obj, cb) {
      var keys = Object.keys(obj);
      var keysLength = keys.length;
      var i = 0;
      for (; i < keysLength; i++) {
        var key = keys[i];
        extended[key] = obj[key];
      }
      if (typeof cb === 'function') cb();
    };
    merge(obj1);
    merge(obj2);
    return extended;
  },
  isEmpty: function(obj) {
    if (obj === null) return true;
    if (obj && obj.length > 0) return false;
    if (obj && obj.length === 0) return true;
    for (var key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  isElement: function(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return (typeof obj === 'object') &&
        (obj.nodeType === 1) && (typeof obj.style === 'object') &&
        (typeof obj.ownerDocument === 'object');
    }
  },
  inArray: function(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
      if (haystack[i] === needle) return true;
    }
    return false;
  },
  updateQuery: function(uri, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = uri.indexOf('?') !== -1 ? '&' : '?';
    var res = '';
    if (uri.match(re)) {
      res = uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      res = uri + separator + key + '=' + value;
    }
    return res;
  },
  ajax: function (url, success, failure) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      // TODO: check data type!
      if (xhr.readyState === 4 && xhr.status === 200) {
        // TODO: make cross browser implementation
        var response = document.implementation.createHTMLDocument('');
        response.body.innerHTML = xhr.responseText;
        if (typeof success === 'function') success(response);
      } else if (xhr.readyState === 4) {
        if (typeof failure === 'function') failure();
      }
    };
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.send();
  },
  jsonpRequest: function(url, callback) {
    var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
    };

    var script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }
};
