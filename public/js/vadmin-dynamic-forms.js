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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 80);
/******/ })
/************************************************************************/
/******/ ({

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(81);


/***/ }),

/***/ 81:
/***/ (function(module, exports) {

/*
|--------------------------------------------------------------------------
| SERIALIZABLE LIST UPDATER
|--------------------------------------------------------------------------
*/

// Changes values from columns of a list.
// -------------------------------------------
window.dataSetter = function (fields) {
    var row = $('.SerializableItem');
    items = [];

    $(row).each(function () {
        // This is the row id
        var id = $(this).data('id');

        item = {};
        // Store row id in array
        item['id'] = id;

        item['fields'] = {};
        // Store columns data in array
        for (var i = 0; i < fields.length; i++) {
            var field = $(this).children(fields[i]).children('input').data('field');
            item['fields'][field] = $(this).children(fields[i]).children('input').val();
        }

        // Push row with cols data to array
        items.push(item);
    });
    console.info(items);
};

$(document).ready(function () {
    $(document).on("click", "#UpdateList", function () {
        if (items == undefined || items == '' || items == null) {
            alert_error("", "Aún no se realizaron cambios");
        } else {
            var route = $(this).data("route");
            updateList(items, route);
        }
    });
});

function updateList(items, route) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { data: items },
        success: function success(data) {
            console.log(data);
            alert_ok('OK!', 'Items actualizados');
        },
        error: function error(data) {
            // $('#Error').html(data.responseText);
            alert_error("", "Ha ingresado un dato incorrecto. Solo puede ingresar números enteros positivos.");
            console.log("Error en updateList()");
            console.log(data);
        }
    });
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY1YTM4ZDcyMjUxYWQ2OWVmYTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy92YWRtaW4tZHluYW1pYy1mb3Jtcy5qcyJdLCJuYW1lcyI6WyJ3aW5kb3ciLCJkYXRhU2V0dGVyIiwiZmllbGRzIiwicm93IiwiJCIsIml0ZW1zIiwiZWFjaCIsImlkIiwiZGF0YSIsIml0ZW0iLCJpIiwibGVuZ3RoIiwiZmllbGQiLCJjaGlsZHJlbiIsInZhbCIsInB1c2giLCJjb25zb2xlIiwiaW5mbyIsImRvY3VtZW50IiwicmVhZHkiLCJvbiIsInVuZGVmaW5lZCIsImFsZXJ0X2Vycm9yIiwicm91dGUiLCJ1cGRhdGVMaXN0IiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImxvZyIsImFsZXJ0X29rIiwiZXJyb3IiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQzdEQTs7Ozs7O0FBTUE7QUFDQTtBQUNBQSxPQUFPQyxVQUFQLEdBQW9CLFVBQVVDLE1BQVYsRUFBa0I7QUFDbEMsUUFBSUMsTUFBTUMsRUFBRSxtQkFBRixDQUFWO0FBQ0FDLFlBQVEsRUFBUjs7QUFFQUQsTUFBRUQsR0FBRixFQUFPRyxJQUFQLENBQVksWUFBWTtBQUNwQjtBQUNBLFlBQUlDLEtBQUtILEVBQUUsSUFBRixFQUFRSSxJQUFSLENBQWEsSUFBYixDQUFUOztBQUVBQyxlQUFPLEVBQVA7QUFDQTtBQUNBQSxhQUFLLElBQUwsSUFBYUYsRUFBYjs7QUFFQUUsYUFBSyxRQUFMLElBQWlCLEVBQWpCO0FBQ0E7QUFDQSxhQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSVIsT0FBT1MsTUFBM0IsRUFBbUNELEdBQW5DLEVBQXdDO0FBQ3BDLGdCQUFJRSxRQUFRUixFQUFFLElBQUYsRUFBUVMsUUFBUixDQUFpQlgsT0FBT1EsQ0FBUCxDQUFqQixFQUE0QkcsUUFBNUIsQ0FBcUMsT0FBckMsRUFBOENMLElBQTlDLENBQW1ELE9BQW5ELENBQVo7QUFDQUMsaUJBQUssUUFBTCxFQUFlRyxLQUFmLElBQXdCUixFQUFFLElBQUYsRUFBUVMsUUFBUixDQUFpQlgsT0FBT1EsQ0FBUCxDQUFqQixFQUE0QkcsUUFBNUIsQ0FBcUMsT0FBckMsRUFBOENDLEdBQTlDLEVBQXhCO0FBQ0g7O0FBRUQ7QUFDQVQsY0FBTVUsSUFBTixDQUFXTixJQUFYO0FBQ0gsS0FqQkQ7QUFrQkFPLFlBQVFDLElBQVIsQ0FBYVosS0FBYjtBQUNILENBdkJEOztBQXlCQUQsRUFBRWMsUUFBRixFQUFZQyxLQUFaLENBQWtCLFlBQVc7QUFDekJmLE1BQUVjLFFBQUYsRUFBWUUsRUFBWixDQUFlLE9BQWYsRUFBdUIsYUFBdkIsRUFBcUMsWUFBVztBQUM1QyxZQUFHZixTQUFTZ0IsU0FBVCxJQUFzQmhCLFNBQVMsRUFBL0IsSUFBcUNBLFNBQVMsSUFBakQsRUFDQTtBQUNJaUIsd0JBQVksRUFBWixFQUFnQiw4QkFBaEI7QUFDSCxTQUhELE1BS0E7QUFDSSxnQkFBSUMsUUFBUW5CLEVBQUUsSUFBRixFQUFRSSxJQUFSLENBQWEsT0FBYixDQUFaO0FBQ0FnQix1QkFBV25CLEtBQVgsRUFBa0JrQixLQUFsQjtBQUNIO0FBQ0osS0FWRDtBQVdILENBWkQ7O0FBZUEsU0FBU0MsVUFBVCxDQUFvQm5CLEtBQXBCLEVBQTJCa0IsS0FBM0IsRUFDQTtBQUNLbkIsTUFBRXFCLElBQUYsQ0FBTztBQUNKQyxhQUFLSCxLQUREO0FBRUpJLGdCQUFRLE1BRko7QUFHSkMsa0JBQVUsTUFITjtBQUlKcEIsY0FBTSxFQUFDQSxNQUFNSCxLQUFQLEVBSkY7QUFLSndCLGlCQUFTLGlCQUFVckIsSUFBVixFQUFnQjtBQUN6QlEsb0JBQVFjLEdBQVIsQ0FBWXRCLElBQVo7QUFDSXVCLHFCQUFTLEtBQVQsRUFBZSxvQkFBZjtBQUNILFNBUkc7QUFTSkMsZUFBTyxlQUFVeEIsSUFBVixFQUFnQjtBQUNuQjtBQUNBYyx3QkFBWSxFQUFaLEVBQWdCLGlGQUFoQjtBQUNBTixvQkFBUWMsR0FBUixDQUFZLHVCQUFaO0FBQ0FkLG9CQUFRYyxHQUFSLENBQVl0QixJQUFaO0FBQ0g7QUFkRyxLQUFQO0FBZ0JKLEMiLCJmaWxlIjoiL2pzL3ZhZG1pbi1keW5hbWljLWZvcm1zLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDgwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAwZjVhMzhkNzIyNTFhZDY5ZWZhNCIsIi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IFNFUklBTElaQUJMRSBMSVNUIFVQREFURVJcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG4vLyBDaGFuZ2VzIHZhbHVlcyBmcm9tIGNvbHVtbnMgb2YgYSBsaXN0LlxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5kYXRhU2V0dGVyID0gZnVuY3Rpb24gKGZpZWxkcykge1xyXG4gICAgbGV0IHJvdyA9ICQoJy5TZXJpYWxpemFibGVJdGVtJyk7XHJcbiAgICBpdGVtcyA9IFtdO1xyXG4gICAgXHJcbiAgICAkKHJvdykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgcm93IGlkXHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIGl0ZW0gPSB7fVxyXG4gICAgICAgIC8vIFN0b3JlIHJvdyBpZCBpbiBhcnJheVxyXG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcclxuICAgICAgICBcclxuICAgICAgICBpdGVtWydmaWVsZHMnXSA9IHt9O1xyXG4gICAgICAgIC8vIFN0b3JlIGNvbHVtbnMgZGF0YSBpbiBhcnJheVxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBmaWVsZCA9ICQodGhpcykuY2hpbGRyZW4oZmllbGRzW2ldKS5jaGlsZHJlbignaW5wdXQnKS5kYXRhKCdmaWVsZCcpO1xyXG4gICAgICAgICAgICBpdGVtWydmaWVsZHMnXVtmaWVsZF0gPSAkKHRoaXMpLmNoaWxkcmVuKGZpZWxkc1tpXSkuY2hpbGRyZW4oJ2lucHV0JykudmFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQdXNoIHJvdyB3aXRoIGNvbHMgZGF0YSB0byBhcnJheVxyXG4gICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICB9KTtcclxuICAgIGNvbnNvbGUuaW5mbyhpdGVtcyk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiI1VwZGF0ZUxpc3RcIixmdW5jdGlvbigpIHtcclxuICAgICAgICBpZihpdGVtcyA9PSB1bmRlZmluZWQgfHwgaXRlbXMgPT0gJycgfHwgaXRlbXMgPT0gbnVsbClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGFsZXJ0X2Vycm9yKFwiXCIsIFwiQcO6biBubyBzZSByZWFsaXphcm9uIGNhbWJpb3NcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCByb3V0ZSA9ICQodGhpcykuZGF0YShcInJvdXRlXCIpO1xyXG4gICAgICAgICAgICB1cGRhdGVMaXN0KGl0ZW1zLCByb3V0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVwZGF0ZUxpc3QoaXRlbXMsIHJvdXRlKVxyXG57XHJcbiAgICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YToge2RhdGE6IGl0ZW1zfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBhbGVydF9vaygnT0shJywnSXRlbXMgYWN0dWFsaXphZG9zJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8gJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGFsZXJ0X2Vycm9yKFwiXCIsIFwiSGEgaW5ncmVzYWRvIHVuIGRhdG8gaW5jb3JyZWN0by4gU29sbyBwdWVkZSBpbmdyZXNhciBuw7ptZXJvcyBlbnRlcm9zIHBvc2l0aXZvcy5cIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gdXBkYXRlTGlzdCgpXCIpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICAgfSk7XHJcbn1cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3ZhZG1pbi1keW5hbWljLWZvcm1zLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==