module.exports = {
  getCookie(name) {
    let matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
  },
  setCookie: (name, _value, _props) => {
    let props = _props || {};
    let exp = props.expires;
    let d;
    let value = encodeURIComponent(_value);
    let updatedCookie;
    let propName;
    let propValue;
    if (typeof exp === 'number' && exp) {
      d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }
    if (exp && exp.toUTCString) props.expires = exp.toUTCString();
    updatedCookie = name + '=' + value;
    for (propName in props) {
      if (!props.hasOwnProperty(propName)) continue;
      updatedCookie += '; ' + propName;
      propValue = props[propName];
      if (propValue !== true) updatedCookie += '=' + propValue;
    }
    document.cookie = updatedCookie;
  },
  outerHeight(el, margins) {
    let height = el.offsetHeight;
    let style;
    if (!margins) return height;
    style = getComputedStyle(el);
    height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
    return height;
  },
  forEach(array, callback, scope) {
    var i;
    for (i = 0; i < array.length; i++) callback.call(scope, i, array[i]);
  },

  extend: (obj1, obj2) => {
    let extended = {};
    let merge = (obj, cb) => {
      let keys = Object.keys(obj);
      let keysLength = keys.length;
      let i = 0;
      for (; i < keysLength; i++) {
        let key = keys[i];
        extended[key] = obj[key];
      }
      if (typeof cb === 'function') cb();
    };
    merge(obj1);
    merge(obj2);
    return extended;
  },
  isEmpty(obj) {
    if (obj === null) return true;
    if (obj && obj.length > 0) return false;
    if (obj && obj.length === 0) return true;
    for (let key in obj) {
      if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
  },
  isElement(obj) {
    try {
      return obj instanceof HTMLElement;
    } catch (e) {
      return (typeof obj === 'object') &&
        (obj.nodeType === 1) && (typeof obj.style === 'object') &&
        (typeof obj.ownerDocument === 'object');
    }
  },
  inArray(needle, haystack) {
    let length = haystack.length;
    for (let i = 0; i < length; i++) {
      if (haystack[i] === needle) return true;
    }
    return false;
  },
  updateQuery: (uri, key, value) => {
    let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    let separator = uri.indexOf('?') !== -1 ? '&' : '?';
    let res = '';
    if (uri.match(re)) {
      res = uri.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      res = uri + separator + key + '=' + value;
    }
    return res;
  },
  ajax: (url, success, failure) => {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      // TODO: check data type!
      if (xhr.readyState === 4 && xhr.status === 200) {
        // TODO: make cross browser implementation
        let response = document.implementation.createHTMLDocument('');
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

  jsonpRequest(url) {
    let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    let script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }

};
