(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('api', ['exports'], factory) :
    (global = global || self, factory(global.api = {}));
}(this, (function (exports) { 'use strict';

    async function RequestApi() {
      await fetch('http://localhost:4000/getJson', {
        method: 'get' // opcional

      }).then(result => {
        result.json().then(result => {
          console.log(result);
        });
      });
    }
    RequestApi();

    exports.RequestApi = RequestApi;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
