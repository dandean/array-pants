;(function() {
  'use strict';

  var slice = Array.prototype.slice;

  var Extensions = {

    /**
     * Array#invoke(method, arg, arg, arg...) -> Array
    **/
    invoke: function(method) {
      var args = slice.call(arguments, 1);
      for (var i = 0; i < this.length; i++) {
        this[i][method].apply(this[i], args);
      };
      return this;
    },

    /**
     * Array#pluck(method) -> Array
    **/
    pluck: function(property) {
      var result = [];
      for (var i = 0; i < this.length; i++) {
        result.push(this[i][property]);
      };
      return result;
    }
  };

  var Module = {

    /**
     * install([debug]) -> undefined
     * - debug (Boolean): If debug messages should printed when a function is installed on `Object`.
     *
     * Installs all module functions (except Module.install) on `Array.prototype`.
    **/
    install: function(debug) {
      Object.keys(Extensions).forEach(function(method) {
        if (!Array.prototype.hasOwnProperty(method)) {
          Object.defineProperty(Array.prototype, method, {
            value: Extensions[method],
            enumerable: false, configurable: true, writable: true
          });
          if (debug && console) console.log("Installed Array#" + method + "()");
        }
      });
    }
  };

  // Copy methods over to the Module object.
  Object.keys(Extensions).forEach(function(method) {
    Module[method] = function(array, arg) {
      Extensions[method].call(array, arg);
    }
  });

  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // RequireJS
    define(function() { return Module; });

  } else if (typeof module == 'object') {
    // CommonJS
    module.exports = Module;

  } else if (typeof window == 'object') {
    // No module system
    Module.install();
  }

}(this));
