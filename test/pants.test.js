if (typeof window === 'undefined') {
  var assert = require("assert");
  var pants = require("../index");
}

describe('Array Pants', function() {
  if (typeof pants != 'undefined') pants.install();

  function Thing(value) {
    this.value = value;
  }

  Thing.prototype.toString = function() {
    return this.value;
  };

  Thing.prototype.toUpperCase = function() {
    this.value = this.value.toUpperCase();
  }

  var things = [new Thing('abc'), new Thing('abc'), new Thing('abc')];

  it('should invoke the method on every instance in the array', function() {
    things.invoke('toUpperCase');
    things.forEach(function(thing) {
      assert.ok(thing.toString() == 'ABC');
    });
  });

  it('should collect the property from every instance in the array', function() {
    var values = things.pluck('value');

    values.forEach(function(value) {
      assert.ok(value == 'ABC');
    });
    assert.ok(values.length == things.length);
  });
});
