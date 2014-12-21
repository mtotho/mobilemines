'use strict';

describe('Service: mine.factory', function () {

  // load the service's module
  beforeEach(module('mobileminesApp'));

  // instantiate service
  var mine.factory;
  beforeEach(inject(function (_mine.factory_) {
    mine.factory = _mine.factory_;
  }));

  it('should do something', function () {
    expect(!!mine.factory).toBe(true);
  });

});
