declare interface String {
  getInitials(glue?: boolean): string | Array<string>;
  capitalize(): string;
}


String.prototype.getInitials = (glue: boolean = true) => {

  let initials = this.replace(/[^a-zA-Z- ]/g, '').match(/\b\w/g) || [];

  if (glue) {
    return initials.join('');
  }

  return initials;
};

String.prototype.capitalize = function () {
  return this.toLowerCase().replace(/\b\w/g, function (m) {
    return m.toUpperCase();
  });
};
