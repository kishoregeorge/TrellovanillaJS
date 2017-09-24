/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_utils__ = __webpack_require__(1);
//initialise globals
var templates = {};
var controllers = {};
var views = {};

 

window.onload = function () {
    console.log('Application loaded at ' + Date.now());

    //register router
    window.addEventListener(
        "hashchange",
        function () { __WEBPACK_IMPORTED_MODULE_0__utils_utils__["a" /* default */].router() }
    );

    __WEBPACK_IMPORTED_MODULE_0__utils_utils__["a" /* default */].router();

    var Dashboard = { "order": ["C1", "C3", "C2"], "cards": {"C2":{ "title": "C2", "createdat": Date.now(), "hasmanytasks": true, "order": ["T2", "T3", "T1"],"tasks":{"T1":{"title":"T1","text":"sadsa","createdat":Date.now(),"editedat":Date.now()}} }} }

    // Put the object into storage
    localStorage.setItem('testObject', JSON.stringify(Dashboard));

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject));
};

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

    
        var extract_params = function(params_string){
            var params = {};
            var raw_params = params_string.split('&');
            
            var j = 0;
            for(var i = raw_params.length - 1; i >= 0; i--){
                var url_params = raw_params[i].split('=');
                if(url_params.length == 2){
                    params[url_params[0]] = url_params[1];
                }
                else if(url_params.length == 1){
                    params[j] = url_params[0];
                    j += 1;
                }
                else{
                    //param not readable. pass.
                }
            }
    
            return params;
        }
    
        /* harmony default export */ __webpack_exports__["a"] = ({
            router: function(route, data){
                route = route || location.hash.slice(1) || 'home';
    
                var temp = route.split('?');
                var route_split = temp.length;
                var function_to_invoke = temp[0] || false;
                
                if(route_split > 1){
                    var params  = extract_params(temp[1]);
                }
    
                //fire away...
                if(function_to_invoke){
                    views[function_to_invoke](data, params);
                }
            },
    
            render: function(element_id, content, convert_markdown){
                convert_markdown = convert_markdown || false;
                if(!convert_markdown){
                    document.getElementById(element_id).innerHTML = content;
                }
                else{
                    var converter = new showdown.Converter();
                    document.getElementById(element_id).innerHTML = converter.makeHtml(content);   
                }
                document.getElementById(element_id).scrollIntoView();
            },
    
            //This function is for illustration as there is really no need for ajax here...
            request: function(api_stub, success_callback, error_callback, callback_params){
                api_stub = api_stub || '';
                callback_params = callback_params || {};
    
                controllers.show_loader('page-content');
    
                var url = config.api_server + api_stub;
    
                var x = new XMLHttpRequest();
                x.onreadystatechange = function(){
                    if (x.readyState == XMLHttpRequest.DONE) {
                        if(x.status == 200){
                            controllers[success_callback](
                                x.responseText, 
                                callback_params
                            );
                        }
                        else{
                            controllers[error_callback](
                                x.status, 
                                callback_params
                            );
                        }
                    }
                };
                //other methods can be implemented here
                x.open('GET', url, true);
                x.send();
            },
    
            get_link: function(post){
                var link = '#post?'+post.post;
                if(post.external_link){
                    link = post.external_link;
                }
                return link;
            }
        });
    

/***/ })
/******/ ]);