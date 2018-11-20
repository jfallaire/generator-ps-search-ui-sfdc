export class LexUtils {
  static getCoveoSearchUI = (cmp) => {
    return cmp.getElements().find(function (el) {
      return Coveo.$$(el).find('#' + cmp.get('v.name')) || Coveo.$$(el).find('.CoveoSearchInterface');
    });
  }
  static getSearchInterfaceElement = (cmp) => {
    var coveoSearchUI = LexUtils.getCoveoSearchUI(cmp);
    return coveoSearchUI ? Coveo.$$(coveoSearchUI).find('#' + cmp.get('v.name')) || Coveo.$$(coveoSearchUI).find('.CoveoSearchInterface') : null;
  }
}
