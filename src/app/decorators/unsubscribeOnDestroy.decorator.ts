export function UnsubscribeOnDestroy(): Function {
  return function (constructor: Function) {
    const orginalNgOnDestroy = constructor.prototype.ngOnDestroy;

    constructor.prototype.ngOnDestroy = function () {
      for (let prop in this) {
        const property = this[prop];
        if (property && typeof property.unsubscribe === 'function') {
          property.unsubscribe();
        }
      }

      orginalNgOnDestroy && orginalNgOnDestroy.apply(this);
    };
  };
}
