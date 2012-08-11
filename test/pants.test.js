if (typeof window === 'undefined') {
  var assert = require("assert");
  var pants = require("../index");
}

describe('Array Pants', function() {
  function Thing(value) {
    this.value = value;
  }

  Thing.prototype.toString = function() {
    return this.value;
  };

  Thing.prototype.toUpperCase = function() {
    this.value = this.value.toUpperCase();
  }

  var things;

  beforeEach(function() {
    // Re-create `things` for each test.
    things = [new Thing('abc'), new Thing('abc'), new Thing('abc')];
  });

  if (typeof pants != 'undefined') {
    describe('when used as a Module', function() {

      it('should invoke the method on every instance in the array', function() {
        pants.invoke(things, 'toUpperCase');
        things.forEach(function(thing) {
          assert.ok(thing.toString() == 'ABC');
        });
      });

      it('should collect the property from every instance in the array', function() {
        var values = pants.pluck(things, 'value');
        values.forEach(function(value) {
          assert.ok(value == 'abc');
        });
        assert.ok(values.length == things.length);
      });

    });
  }

  it('should invoke the method on every instance in the array', function() {
    if (pants && pants.install) pants.install();

    things.invoke('toUpperCase');
    things.forEach(function(thing) {
      assert.ok(thing.toString() == 'ABC');
    });
  });

  it('should collect the property from every instance in the array', function() {
    if (pants && pants.install) pants.install();

    var values = things.pluck('value');
    values.forEach(function(value) {
      assert.ok(value == 'abc');
    });
    assert.ok(values.length == things.length);
  });
});
