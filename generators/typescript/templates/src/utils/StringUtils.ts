declare interface String {
  getInitials(glue?: boolean): string | Array<string>;
  capitalize(): string;
}


String.prototype.getInitials = function (glue: boolean = true): string | Array<string> {

  var initials = this.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g) || [];

  if (glue) {
    return initials.join('');
  }

  return initials;
};

String.prototype.capitalize = function (): string {
  return this.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};
