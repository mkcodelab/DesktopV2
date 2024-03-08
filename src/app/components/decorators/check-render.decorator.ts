export function CheckRender(): ClassDecorator {

  return function (constructor: Function) {

    // console.log(constructor, propertyKey, descriptor)

    constructor.prototype.checkRenderFn = function checkRenderFn() {
      console.log('checkRender')
    }


    const orginalOnInit = constructor.prototype.ngOnInit
    const component = constructor.name;

    // overriding ngOnInit with additional code
    constructor.prototype.ngOnInit = function () {
      console.log(`%c ${component} - ${orginalOnInit}`, `color: #4CAF50; font-weight: bold`);

      // calling orginal onInit
      orginalOnInit.apply(this)
    }
  }


}
