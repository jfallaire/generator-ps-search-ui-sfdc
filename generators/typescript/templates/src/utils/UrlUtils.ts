export class UrlUtils {
  static getUrlParams = query => {
    if (!query) {
      return {};
    }

    var parser = document.createElement('a');
    var search = '';
    parser.href = query;
    var hash = parser.hash.substring(1);
    if (hash) {
      var hashParser = document.createElement('a');
      hashParser.href = hash;
      search = hashParser.search.substring(1);
    } else {
      search = parser.search.substring(1);
    }

    search = search || query;

    return (/^[?#]/.test(search) ? search.slice(1) : search)
      .split('&')
      .reduce((params, param) => {
        let [key, value] = param.split('=');
        params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
        return params;
      }, {});
  }
};

