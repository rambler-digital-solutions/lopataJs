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
  jsonpRequest(url) {
    let callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
    let script = document.createElement('script');
    script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
    document.body.appendChild(script);
  }
};
