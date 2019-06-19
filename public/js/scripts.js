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
/******/ 	return __webpack_require__(__webpack_require__.s = 72);
/******/ })
/************************************************************************/
/******/ ({

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(73);


/***/ }),

/***/ 73:
/***/ (function(module, exports) {

// Loaders
// -------------------------------------------
$(".loader-on-change").on('change', function () {
    $('#full-loader').removeClass('Hidden');
    return true;
});

$(".loader-on-submit").on('submit', function () {
    $('#full-loader').removeClass('Hidden');
    return true;
});

$('.dont-submit-on-enter, .dson').keypress(function (e) {
    console.log("ENTER");
    if (e.which == 13) return false;
    if (e.which == 13) e.preventDefault();
});

// Store Filters
// -------------------------------------------

window.collapseFilter = function (elem) {
    var filter = elem.siblings('ul');
    if (filter.hasClass('collapsed')) {
        filter.removeClass('collapsed');
        filter.show(100);
        elem.html('-');
    } else {
        filter.addClass('collapsed');
        filter.hide(100);
        elem.html('+');
    }
};

// Modify cart item quantity 
// -------------------------------------------
$('.InputBtnQ').on('change keyup', function () {
    //  Original Article Price
    var value = $(this).siblings('.ArticlePrice').val();
    // Quantity
    var quantity = $(this).val();
    // Ner Value
    var newValue = value * quantity;
    // New Price Target
    var newPriceTarget = $(this).parent().parent().parent().siblings('.TotalItemPrice');

    console.log(value, quantity, newValue);
    modifyCartItemQ($(this), newPriceTarget, newValue);
});

function modifyCartItemQ(e, newPriceTarget, newValue) {
    e.siblings('.InputBtnQ').removeClass('Hidden');
    newPriceTarget.html('$ ' + newValue);
}

$('#MainOverlay').click(function () {
    checkoutSidebar('hide');
});

// Checkout sidebar
// -------------------------------------------		
window.checkoutSidebar = function (state) {

    var sidebar = $('.CheckoutCart');
    // const wrapper = $('.main-wrapper');

    var show = function show() {
        sidebar.addClass('active');
        // wrapper.addClass('allow-sidebar');
    };

    var hide = function hide() {
        sidebar.removeClass('active');
        // wrapper.removeClass('allow-sidebar');
    };

    if (state == undefined) {
        if (sidebar.hasClass('active')) {
            hide();
        } else {
            show();
        }
    } else if (state == 'show') {
        show();
        return false;
    } else if (state == 'hide') {
        hide();
        return false;
    }
};

window.openCheckoutDesktop = function () {
    if ($(window).width() > 768) {
        checkoutSidebar('show');
    }
    return false;
};

window.openFilters = function () {
    var selector = $('.FilterSelector');
    console.log(selector.hasClass('inactive'));
    if (selector.hasClass('inactive')) {
        selector.removeClass('inactive');
    } else {
        selector.addClass('inactive');
    }
    // $('.FilterSelector').
    //const filters = $('#SearchFilters');
    //const trigger = $('#SearchFiltersTrigger');
    //if(filters.hasClass('active'))
    //{
    //    filters.removeClass('active');
    //    trigger.show();
    //}
    //else
    //{
    //    filters.addClass('active');
    //    trigger.hide();
    //}
};

/*
|--------------------------------------------------------------------------
| CART
|--------------------------------------------------------------------------
*/

window.sumAllItems = function () {
    sum = 0;
    $('.TotalItemPrice').each(function (index) {
        sum += parseInt($(this).html());
    });
    $('.SubTotal').html(sum);
};

// Sum divs text
window.sumDivs = function (origins, target) {
    var sum = 0;
    origins.each(function () {
        sum += parseFloat($(this).text());
    });
    target.text(sum);
};

// Check product variant stock
// -------------------------------------------
window.checkVariantStock = function () {
    var form = $('#AddToCartForm');
    var data = form.serialize();
    var allowSubmit = false;
    var submitButton = $('#AddToCartFormBtn');
    $.ajax({
        url: form.data('route'),
        method: 'GET',
        dataType: 'JSON',
        async: false,
        data: data,
        success: function success(data) {
            console.log(data);
            if (data.response == true) {
                if (data.message == '0') {
                    $('.AvailableStock').html("No hay stock disponible");
                    submitButton.prop('disabled', true);
                } else {
                    console.log(data);
                    $('.AvailableStock').html("Stock disponible: " + data.message);
                    submitButton.prop('disabled', false);
                    allowSubmit = true;
                    console.log("checkVariantStock success");
                }
                $('#MaxQuantity').prop("max", data.message);
            } else {
                // console.log(data);
                // $('#Error').html(data.responseText);
                $('.AvailableStock').html(data.message);
                submitButton.prop('disabled', true);
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            // location.reload();
            allowSubmit = false;
            submitButton.prop('disabled', true);
            console.log(data);
            console.log("Error en CheckVariantStock() - store/scripts.js");
        }
    });
    return allowSubmit;
};

// Set cart items JSON
// -------------------------------------------
window.setItemsData = function () {
    itemData = [];

    $('.Item-Data').each(function () {
        var id = $(this).data('id');
        var price = $(this).data('price');
        var variant_id = $(this).data('variant');
        var quantity = $(this).val();

        item = {};
        item['id'] = id;
        item['variant_id'] = variant_id;
        item['price'] = price;
        item['quantity'] = quantity;
        // Update display total item price
        total = price * quantity;
        $('.' + id + '-TotalItemPrice').html(total);

        itemData.push(item);
    });
    // Update Total
    console.info(itemData);
    sumAllItems();
    $('#Items-Data').val(itemData);
};

// Add product to cart
// -------------------------------------------
window.addToCart = function (route, data) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: data,
        success: function success(data) {
            // console.log(data);
            if (data.response == 'success') {
                $('.AvailableStock').html("Stock disponible: " + data.newStock);
                toast_success('Ok!', data.message, 'bottomCenter', '', 2500);
                updateTotals();
                setItemsData();
                setTimeout(function () {
                    setItemsData();
                    sumAllItems();
                    // openCheckoutDesktop();
                }, 100);
            } else if (data.response == 'warning') {
                toast_success('Ups!', data.message, 'bottomCenter');
            }
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log("Error en addtoCart()");
            // location.reload();
            console.log(data);
        }
    });
};

// Remove product from cart
// -------------------------------------------
window.removeFromCart = function (route, cartItemId, variantId, quantity, div, action) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { cartItemId: cartItemId, variantId: variantId, quantity: quantity, action: action, method: 'ajax' },
        success: function success(data) {
            if (data.response == 'cart-removed') {
                // console.log(data);
                updateTotals();
                window.location = window.location.href.split("?")[0];
                setItemsData();
            } else if (data.response == 'success') {
                $(div).hide(100);
                $(div).remove();
                updateTotals();
                setItemsData();
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log("Error en removeFromCart()");
            console.log(data);
            // If an error pops when destroying an item, reload and prevent bad magic
            location.reload();
        }
    });
};

function updateTotals() {
    // Live Reloading stuff
    $("#SideContainerItemsFixed").load(window.location.href + " #SideContainerItemsFixed");
    $("#SideContainerItemsFloating").load(window.location.href + " #SideContainerItemsFloating");
    $(".TotalCartItems").load(window.location.href + " .TotalCartItems");
    $(".TotalCartItemsSidebar").load(window.location.href + " .TotalCartItemsSidebar");
    $(".CartSubTotal").load(window.location.href + " .CartSubTotal");
    $(".AvailableStock").load(window.location.href + " .AvailableStock");
}

// Submit Cart Form to Checkout
// -------------------------------------------
window.submitCartToCheckout = function (route, target, data, action) {
    //console.log("Ruta: " + route + " Target: " + target + " Data: " + data + "Action: "+ action);
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { data: data, action: action },
        success: function success(data) {
            console.log(data);
            if (data.response == 'success') {
                console.log(target);
                if (target == 'reload') {
                    // Refresh page, delete parametters and open checkout sidebar
                    window.location = window.location.href.split("?")[0] + "?checkout-on";
                } else {
                    window.location.href = target;
                }
            } else {
                console.log('Error en submitForm');
                console.log(data);
                toast_error('', data.message, 'bottomCenter', '');
                $('.SideContainerError').html(data.message);
                // $('#Error').html(data.responseText);
            }
            // $('#Error').html(data.responseText);
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log("Error en submitForm()");
            console.log(data);
            location.reload();
        }
    });
};

// Validate and set coupon
// -------------------------------------------
window.validateAndSetCoupon = function (route, code, cartid) {
    var couponDiv = $('#CouponDiv');
    var couponSet = $('#SettedCoupon');
    console.log(code, cartid);
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { code: code, cartid: cartid },
        beforeSend: function beforeSend() {
            console.log("Comprobando cupón...");
            $('.CouponLoader').removeClass('Hidden');
        },
        success: function success(data) {
            if (data.response == true) {
                $('#CouponValidationMessage').html("Cupón aceptado !");
                couponDiv.hide(200, function () {
                    couponSet.removeClass('Hidden');
                });
                location.reload();
            } else if (data.response == null) {
                $('#CouponValidationMessage').html(data.message);
            }
        },
        error: function error(data) {
            $('#CouponValidationMessage').html(data.responseText);
            console.log(data);
        },
        complete: function complete() {
            $('.CouponLoader').addClass('Hidden');
        }
    });
};

// Favs
// -------------------------------------------
window.addArticleToFavs = function (route, favid, articleid, action, displayButton) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { fav_id: favid, article_id: articleid },
        success: function success(data) {
            if (data.response == true && data.result == 'added') {
                switch (action) {
                    case 'reload':
                        location.reload();
                        break;
                    case 'show':
                        displayButton.removeClass('fav-icon-nofav');
                        displayButton.addClass('fav-icon-isfav');
                        toast_success('Ok!', 'Producto agregado a favoritos', 'bottomCenter', '', 1000);
                        break;
                    case 'none':
                        console.log('Actualizado - Sin Acción');
                    default:
                        console.log('No hay acción');
                        break;
                }
            } else if (data.response == true && data.result == 'removed') {
                displayButton.addClass('fav-icon-nofav');
                displayButton.removeClass('fav-icon-isfav');
                toast_success('Ok!', 'Producto eliminado de favoritos', 'bottomCenter', '', 1000);
            }
            setFavsTotalIcon(data.favsCount);
        },
        error: function error(data) {
            $('#Error').html(data.responseText);
            console.log(data);
        }
    });
};

function setFavsTotalIcon(favs) {
    if (favs > 0) {
        $('.FavMainIcon').removeClass('far');
        $('.FavMainIcon').addClass('fa');
    } else if (favs == 0) {
        $('.FavMainIcon').removeClass('fa');
        $('.FavMainIcon').addClass('far');
    } else {
        $('.FavMainIcon').removeClass('fa');
        $('.FavMainIcon').removeClass('far');
        $('.FavMainIcon').addClass('fa');
        console.log("Error en setFavsTotalIcon()");
    }
}

window.removeArticleFromFavs = function (route, favid, action) {
    var doaction = action;
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { fav_id: favid },
        success: function success(data) {
            $('#Error').html(data.responseText);
            console.log(data);
            if (data.response == true) {
                console.log(doaction);
                switch (doaction) {
                    case 'reload':
                        var action = 'reload';
                        toast_success('Ok!', 'Producto eliminado de favoritos', 'bottomCenter', action, 1000);
                        break;
                    default:
                        console.log('No hay acción');
                        break;
                }
            } else {
                //$('#Error').html(data.message['errorInfo']);
                console.log(data);
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log(data);
        }
    });
};

window.removeAllArticlesFromFavs = function (route, customerid, action) {
    $.ajax({
        url: route,
        method: 'POST',
        dataType: 'JSON',
        data: { customer_id: customerid },
        success: function success(data) {
            console.log(data);
            //$('#Error').html(data.responseText);
            if (data.response == true) {
                switch (action) {
                    case 'reload':
                        location.reload();
                        break;
                    default:
                        console.log('No hay acción');
                        break;
                }
            } else {
                $('#Error').html(data.message['errorInfo']);
                console.log(data);
            }
        },
        error: function error(data) {
            //$('#Error').html(data.responseText);
            console.log(data);
        }
    });
};

/*
|--------------------------------------------------------------------------
| LOGIN AND REGISTER
|--------------------------------------------------------------------------
*/

$('#ResellerBox').hide();

window.openResellerRegistration = function () {
    $('#IsResellerCheckbox').prop('checked', true);
    $('.IfResellerEnable').prop('disabled', false);
    $('#ResellerBox').show(100);
    $('#ResellerCTA').hide(0);
    $('.NormaClientTitle').hide(0);
    $('.ResellerTitle').show(0);
};

window.closeResellerRegistration = function () {
    $('#IsResellerCheckbox').prop('checked', false);
    $('.IfResellerEnable').prop('disabled', true);
    $('#ResellerBox').hide(0);
    $('#ResellerCTA').show(100);
    $('.NormaClientTitle').show(0);
    $('.ResellerTitle').hide(0);
};

$(document).ready(function () {
    $('.GeoProvSelect').on('change', function () {
        var prov_id = $(this).val();
        getGeoLocs(prov_id);
    });
});

/*
|--------------------------------------------------------------------------
| MIX FUNCTIONS
|--------------------------------------------------------------------------
*/

window.closeElement = function (selector) {
    $(selector).hide(100);
};

window.getParam = function (parameterName) {
    var result = null,
        tmp = [];
    location.search.substr(1).split("&").forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
};

window.getParams = function (url) {
    var params = {};
    var parser = document.createElement('a');
    parser.href = url;
    var query = parser.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        params[pair[0]] = decodeURIComponent(pair[1]);
    }
    return params;
};

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGY1YTM4ZDcyMjUxYWQ2OWVmYTQiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9zdG9yZS9zY3JpcHRzLmpzIl0sIm5hbWVzIjpbIiQiLCJvbiIsInJlbW92ZUNsYXNzIiwia2V5cHJlc3MiLCJlIiwiY29uc29sZSIsImxvZyIsIndoaWNoIiwicHJldmVudERlZmF1bHQiLCJ3aW5kb3ciLCJjb2xsYXBzZUZpbHRlciIsImVsZW0iLCJmaWx0ZXIiLCJzaWJsaW5ncyIsImhhc0NsYXNzIiwic2hvdyIsImh0bWwiLCJhZGRDbGFzcyIsImhpZGUiLCJ2YWx1ZSIsInZhbCIsInF1YW50aXR5IiwibmV3VmFsdWUiLCJuZXdQcmljZVRhcmdldCIsInBhcmVudCIsIm1vZGlmeUNhcnRJdGVtUSIsImNsaWNrIiwiY2hlY2tvdXRTaWRlYmFyIiwic3RhdGUiLCJzaWRlYmFyIiwidW5kZWZpbmVkIiwib3BlbkNoZWNrb3V0RGVza3RvcCIsIndpZHRoIiwib3BlbkZpbHRlcnMiLCJzZWxlY3RvciIsInN1bUFsbEl0ZW1zIiwic3VtIiwiZWFjaCIsImluZGV4IiwicGFyc2VJbnQiLCJzdW1EaXZzIiwib3JpZ2lucyIsInRhcmdldCIsInBhcnNlRmxvYXQiLCJ0ZXh0IiwiY2hlY2tWYXJpYW50U3RvY2siLCJmb3JtIiwiZGF0YSIsInNlcmlhbGl6ZSIsImFsbG93U3VibWl0Iiwic3VibWl0QnV0dG9uIiwiYWpheCIsInVybCIsIm1ldGhvZCIsImRhdGFUeXBlIiwiYXN5bmMiLCJzdWNjZXNzIiwicmVzcG9uc2UiLCJtZXNzYWdlIiwicHJvcCIsImVycm9yIiwic2V0SXRlbXNEYXRhIiwiaXRlbURhdGEiLCJpZCIsInByaWNlIiwidmFyaWFudF9pZCIsIml0ZW0iLCJ0b3RhbCIsInB1c2giLCJpbmZvIiwiYWRkVG9DYXJ0Iiwicm91dGUiLCJuZXdTdG9jayIsInRvYXN0X3N1Y2Nlc3MiLCJ1cGRhdGVUb3RhbHMiLCJzZXRUaW1lb3V0IiwicmVzcG9uc2VUZXh0IiwicmVtb3ZlRnJvbUNhcnQiLCJjYXJ0SXRlbUlkIiwidmFyaWFudElkIiwiZGl2IiwiYWN0aW9uIiwibG9jYXRpb24iLCJocmVmIiwic3BsaXQiLCJyZW1vdmUiLCJyZWxvYWQiLCJsb2FkIiwic3VibWl0Q2FydFRvQ2hlY2tvdXQiLCJ0b2FzdF9lcnJvciIsInZhbGlkYXRlQW5kU2V0Q291cG9uIiwiY29kZSIsImNhcnRpZCIsImNvdXBvbkRpdiIsImNvdXBvblNldCIsImJlZm9yZVNlbmQiLCJjb21wbGV0ZSIsImFkZEFydGljbGVUb0ZhdnMiLCJmYXZpZCIsImFydGljbGVpZCIsImRpc3BsYXlCdXR0b24iLCJmYXZfaWQiLCJhcnRpY2xlX2lkIiwicmVzdWx0Iiwic2V0RmF2c1RvdGFsSWNvbiIsImZhdnNDb3VudCIsImZhdnMiLCJyZW1vdmVBcnRpY2xlRnJvbUZhdnMiLCJkb2FjdGlvbiIsInJlbW92ZUFsbEFydGljbGVzRnJvbUZhdnMiLCJjdXN0b21lcmlkIiwiY3VzdG9tZXJfaWQiLCJvcGVuUmVzZWxsZXJSZWdpc3RyYXRpb24iLCJjbG9zZVJlc2VsbGVyUmVnaXN0cmF0aW9uIiwiZG9jdW1lbnQiLCJyZWFkeSIsInByb3ZfaWQiLCJnZXRHZW9Mb2NzIiwiY2xvc2VFbGVtZW50IiwiZ2V0UGFyYW0iLCJwYXJhbWV0ZXJOYW1lIiwidG1wIiwic2VhcmNoIiwic3Vic3RyIiwiZm9yRWFjaCIsImRlY29kZVVSSUNvbXBvbmVudCIsImdldFBhcmFtcyIsInBhcmFtcyIsInBhcnNlciIsImNyZWF0ZUVsZW1lbnQiLCJxdWVyeSIsInN1YnN0cmluZyIsInZhcnMiLCJpIiwibGVuZ3RoIiwicGFpciJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNB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WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNzIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDBmNWEzOGQ3MjI1MWFkNjllZmE0IiwiLy8gTG9hZGVyc1xyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiQoXCIubG9hZGVyLW9uLWNoYW5nZVwiKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2Z1bGwtbG9hZGVyJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgcmV0dXJuIHRydWU7XHJcbn0pO1xyXG5cclxuJChcIi5sb2FkZXItb24tc3VibWl0XCIpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKCcjZnVsbC1sb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICByZXR1cm4gdHJ1ZTtcclxufSk7XHJcblxyXG4kKCcuZG9udC1zdWJtaXQtb24tZW50ZXIsIC5kc29uJykua2V5cHJlc3MoZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKFwiRU5URVJcIik7XHJcbiAgICBpZiAoZS53aGljaCA9PSAxMykgcmV0dXJuIGZhbHNlO1xyXG4gICAgaWYgKGUud2hpY2ggPT0gMTMpIGUucHJldmVudERlZmF1bHQoKTtcclxufSk7XHJcblxyXG4vLyBTdG9yZSBGaWx0ZXJzXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbndpbmRvdy5jb2xsYXBzZUZpbHRlciA9IGZ1bmN0aW9uKGVsZW0pIHtcclxuICAgIGNvbnN0IGZpbHRlciA9IGVsZW0uc2libGluZ3MoJ3VsJyk7XHJcbiAgICBpZihmaWx0ZXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKVxyXG4gICAge1xyXG4gICAgICAgIGZpbHRlci5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICAgICAgZmlsdGVyLnNob3coMTAwKTtcclxuICAgICAgICBlbGVtLmh0bWwoJy0nKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBmaWx0ZXIuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgICAgIGZpbHRlci5oaWRlKDEwMCk7XHJcbiAgICAgICAgZWxlbS5odG1sKCcrJyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIE1vZGlmeSBjYXJ0IGl0ZW0gcXVhbnRpdHkgXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuJCgnLklucHV0QnRuUScpLm9uKCdjaGFuZ2Uga2V5dXAnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgT3JpZ2luYWwgQXJ0aWNsZSBQcmljZVxyXG4gICAgbGV0IHZhbHVlID0gJCh0aGlzKS5zaWJsaW5ncygnLkFydGljbGVQcmljZScpLnZhbCgpO1xyXG4gICAgLy8gUXVhbnRpdHlcclxuICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XHJcbiAgICAvLyBOZXIgVmFsdWVcclxuICAgIGxldCBuZXdWYWx1ZSA9ICh2YWx1ZSAqIHF1YW50aXR5KTtcclxuICAgIC8vIE5ldyBQcmljZSBUYXJnZXRcclxuICAgIGxldCBuZXdQcmljZVRhcmdldCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuc2libGluZ3MoJy5Ub3RhbEl0ZW1QcmljZScpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKHZhbHVlLCBxdWFudGl0eSwgbmV3VmFsdWUpO1xyXG4gICAgbW9kaWZ5Q2FydEl0ZW1RKCQodGhpcyksIG5ld1ByaWNlVGFyZ2V0LCBuZXdWYWx1ZSk7XHJcbn0pXHJcblxyXG5mdW5jdGlvbiBtb2RpZnlDYXJ0SXRlbVEoZSwgbmV3UHJpY2VUYXJnZXQsIG5ld1ZhbHVlKSB7XHJcbiAgICBlLnNpYmxpbmdzKCcuSW5wdXRCdG5RJykucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgbmV3UHJpY2VUYXJnZXQuaHRtbCgnJCAnICsgbmV3VmFsdWUpO1xyXG59XHJcblxyXG4kKCcjTWFpbk92ZXJsYXknKS5jbGljayhmdW5jdGlvbigpe1xyXG4gICAgY2hlY2tvdXRTaWRlYmFyKCdoaWRlJyk7XHJcbn0pXHJcblxyXG4vLyBDaGVja291dCBzaWRlYmFyXHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cdFx0XHJcbndpbmRvdy5jaGVja291dFNpZGViYXIgPSBmdW5jdGlvbiAoc3RhdGUpIHtcclxuXHJcbiAgICBjb25zdCBzaWRlYmFyID0gJCgnLkNoZWNrb3V0Q2FydCcpO1xyXG4gICAgLy8gY29uc3Qgd3JhcHBlciA9ICQoJy5tYWluLXdyYXBwZXInKTtcclxuXHJcbiAgICBjb25zdCBzaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIC8vIHdyYXBwZXIuYWRkQ2xhc3MoJ2FsbG93LXNpZGViYXInKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNpZGViYXIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgIC8vIHdyYXBwZXIucmVtb3ZlQ2xhc3MoJ2FsbG93LXNpZGViYXInKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKHN0YXRlID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGlmIChzaWRlYmFyLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xyXG4gICAgICAgICAgICBoaWRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2hvdygpO1xyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gJ3Nob3cnKSB7XHJcbiAgICAgICAgc2hvdygpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gJ2hpZGUnKSB7XHJcbiAgICAgICAgaGlkZSgpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93Lm9wZW5DaGVja291dERlc2t0b3AgPSBmdW5jdGlvbigpXHJcbntcclxuICAgIGlmICgkKHdpbmRvdykud2lkdGgoKSA+IDc2OCkge1xyXG4gICAgICAgIGNoZWNrb3V0U2lkZWJhcignc2hvdycpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG53aW5kb3cub3BlbkZpbHRlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBzZWxlY3RvciA9ICQoJy5GaWx0ZXJTZWxlY3RvcicpXHJcbiAgICBjb25zb2xlLmxvZyhzZWxlY3Rvci5oYXNDbGFzcygnaW5hY3RpdmUnKSk7XHJcbiAgICBpZihzZWxlY3Rvci5oYXNDbGFzcygnaW5hY3RpdmUnKSlcclxuICAgIHtcclxuICAgICAgICBzZWxlY3Rvci5yZW1vdmVDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICBzZWxlY3Rvci5hZGRDbGFzcygnaW5hY3RpdmUnKTtcclxuICAgIH1cclxuICAgIC8vICQoJy5GaWx0ZXJTZWxlY3RvcicpLlxyXG4gICAgLy9jb25zdCBmaWx0ZXJzID0gJCgnI1NlYXJjaEZpbHRlcnMnKTtcclxuICAgIC8vY29uc3QgdHJpZ2dlciA9ICQoJyNTZWFyY2hGaWx0ZXJzVHJpZ2dlcicpO1xyXG4gICAgLy9pZihmaWx0ZXJzLmhhc0NsYXNzKCdhY3RpdmUnKSlcclxuICAgIC8ve1xyXG4gICAgLy8gICAgZmlsdGVycy5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAvLyAgICB0cmlnZ2VyLnNob3coKTtcclxuICAgIC8vfVxyXG4gICAgLy9lbHNlXHJcbiAgICAvL3tcclxuICAgIC8vICAgIGZpbHRlcnMuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgLy8gICAgdHJpZ2dlci5oaWRlKCk7XHJcbiAgICAvL31cclxuXHJcbn1cclxuXHJcbi8qXHJcbnwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG58IENBUlRcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG5cclxud2luZG93LnN1bUFsbEl0ZW1zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgc3VtID0gMDtcclxuICAgICQoJy5Ub3RhbEl0ZW1QcmljZScpLmVhY2goZnVuY3Rpb24gKGluZGV4KSB7XHJcbiAgICAgICAgc3VtICs9IHBhcnNlSW50KCQodGhpcykuaHRtbCgpKTtcclxuICAgIH0pO1xyXG4gICAgJCgnLlN1YlRvdGFsJykuaHRtbChzdW0pO1xyXG59XHJcblxyXG5cclxuLy8gU3VtIGRpdnMgdGV4dFxyXG53aW5kb3cuc3VtRGl2cyA9IGZ1bmN0aW9uIChvcmlnaW5zLCB0YXJnZXQpIHtcclxuICAgIGxldCBzdW0gPSAwO1xyXG4gICAgb3JpZ2lucy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBzdW0gKz0gcGFyc2VGbG9hdCgkKHRoaXMpLnRleHQoKSk7XHJcbiAgICB9KTtcclxuICAgIHRhcmdldC50ZXh0KHN1bSk7XHJcbn1cclxuXHJcblxyXG4vLyBDaGVjayBwcm9kdWN0IHZhcmlhbnQgc3RvY2tcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuY2hlY2tWYXJpYW50U3RvY2sgPSBmdW5jdGlvbigpIHtcclxuICAgIGxldCBmb3JtID0gJCgnI0FkZFRvQ2FydEZvcm0nKTtcclxuICAgIGxldCBkYXRhID0gZm9ybS5zZXJpYWxpemUoKTtcclxuICAgIGxldCBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgbGV0IHN1Ym1pdEJ1dHRvbiA9ICAkKCcjQWRkVG9DYXJ0Rm9ybUJ0bicpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IGZvcm0uZGF0YSgncm91dGUnKSxcclxuICAgICAgICBtZXRob2Q6ICdHRVQnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgYXN5bmM6IGZhbHNlLFxyXG4gICAgICAgIGRhdGE6IGRhdGEsXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGlmKGRhdGEucmVzcG9uc2UgPT0gdHJ1ZSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoZGF0YS5tZXNzYWdlID09ICcwJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiTm8gaGF5IHN0b2NrIGRpc3BvbmlibGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0QnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLkF2YWlsYWJsZVN0b2NrJykuaHRtbChcIlN0b2NrIGRpc3BvbmlibGU6IFwiICsgZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsb3dTdWJtaXQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2hlY2tWYXJpYW50U3RvY2sgc3VjY2Vzc1wiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICQoJyNNYXhRdWFudGl0eScpLnByb3AoXCJtYXhcIiwgZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIC8vIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICBhbGxvd1N1Ym1pdCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzdWJtaXRCdXR0b24ucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRXJyb3IgZW4gQ2hlY2tWYXJpYW50U3RvY2soKSAtIHN0b3JlL3NjcmlwdHMuanNcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICByZXR1cm4gYWxsb3dTdWJtaXQ7XHJcbn1cclxuXHJcbi8vIFNldCBjYXJ0IGl0ZW1zIEpTT05cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuc2V0SXRlbXNEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaXRlbURhdGEgPSBbXTtcclxuXHJcbiAgICAkKCcuSXRlbS1EYXRhJykuZWFjaChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgbGV0IGlkID0gJCh0aGlzKS5kYXRhKCdpZCcpO1xyXG4gICAgICAgIGxldCBwcmljZSA9ICQodGhpcykuZGF0YSgncHJpY2UnKTtcclxuICAgICAgICBsZXQgdmFyaWFudF9pZCA9ICQodGhpcykuZGF0YSgndmFyaWFudCcpO1xyXG4gICAgICAgIGxldCBxdWFudGl0eSA9ICQodGhpcykudmFsKCk7XHJcblxyXG4gICAgICAgIGl0ZW0gPSB7fVxyXG4gICAgICAgIGl0ZW1bJ2lkJ10gPSBpZDtcclxuICAgICAgICBpdGVtWyd2YXJpYW50X2lkJ10gPSB2YXJpYW50X2lkO1xyXG4gICAgICAgIGl0ZW1bJ3ByaWNlJ10gPSBwcmljZTtcclxuICAgICAgICBpdGVtWydxdWFudGl0eSddID0gcXVhbnRpdHk7XHJcbiAgICAgICAgLy8gVXBkYXRlIGRpc3BsYXkgdG90YWwgaXRlbSBwcmljZVxyXG4gICAgICAgIHRvdGFsID0gcHJpY2UgKiBxdWFudGl0eTtcclxuICAgICAgICAkKCcuJyArIGlkICsgJy1Ub3RhbEl0ZW1QcmljZScpLmh0bWwodG90YWwpO1xyXG5cclxuICAgICAgICBpdGVtRGF0YS5wdXNoKGl0ZW0pO1xyXG4gICAgfSk7XHJcbiAgICAvLyBVcGRhdGUgVG90YWxcclxuICAgIGNvbnNvbGUuaW5mbyhpdGVtRGF0YSk7XHJcbiAgICBzdW1BbGxJdGVtcygpO1xyXG4gICAgJCgnI0l0ZW1zLURhdGEnKS52YWwoaXRlbURhdGEpO1xyXG59XHJcblxyXG4vLyBBZGQgcHJvZHVjdCB0byBjYXJ0XHJcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxud2luZG93LmFkZFRvQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgZGF0YSkge1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogZGF0YSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuQXZhaWxhYmxlU3RvY2snKS5odG1sKFwiU3RvY2sgZGlzcG9uaWJsZTogXCIgKyBkYXRhLm5ld1N0b2NrKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsIGRhdGEubWVzc2FnZSwgJ2JvdHRvbUNlbnRlcicsICcnLCAyNTAwKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscygpO1xyXG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgICAgICAgICBzdW1BbGxJdGVtcygpO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW5DaGVja291dERlc2t0b3AoKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGF0YS5yZXNwb25zZSA9PSAnd2FybmluZycpIHtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ1VwcyEnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIGFkZHRvQ2FydCgpXCIpO1xyXG4gICAgICAgICAgICAvLyBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbiBcclxuXHJcbi8vIFJlbW92ZSBwcm9kdWN0IGZyb20gY2FydFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5yZW1vdmVGcm9tQ2FydCA9IGZ1bmN0aW9uIChyb3V0ZSwgY2FydEl0ZW1JZCwgdmFyaWFudElkLCBxdWFudGl0eSwgZGl2LCBhY3Rpb24pIHtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IHsgY2FydEl0ZW1JZDogY2FydEl0ZW1JZCwgdmFyaWFudElkOiB2YXJpYW50SWQsIHF1YW50aXR5OiBxdWFudGl0eSwgYWN0aW9uOiBhY3Rpb24sIG1ldGhvZDogJ2FqYXgnIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ2NhcnQtcmVtb3ZlZCcpIHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdXBkYXRlVG90YWxzKCk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF07XHJcbiAgICAgICAgICAgICAgICBzZXRJdGVtc0RhdGEoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09ICdzdWNjZXNzJykge1xyXG4gICAgICAgICAgICAgICAgJChkaXYpLmhpZGUoMTAwKTtcclxuICAgICAgICAgICAgICAgICQoZGl2KS5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIHVwZGF0ZVRvdGFscygpO1xyXG4gICAgICAgICAgICAgICAgc2V0SXRlbXNEYXRhKCk7XHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHJlbW92ZUZyb21DYXJ0KClcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAvLyBJZiBhbiBlcnJvciBwb3BzIHdoZW4gZGVzdHJveWluZyBhbiBpdGVtLCByZWxvYWQgYW5kIHByZXZlbnQgYmFkIG1hZ2ljXHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVUb3RhbHMoKSB7XHJcbiAgICAvLyBMaXZlIFJlbG9hZGluZyBzdHVmZlxyXG4gICAgJChcIiNTaWRlQ29udGFpbmVySXRlbXNGaXhlZFwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgI1NpZGVDb250YWluZXJJdGVtc0ZpeGVkXCIpO1xyXG4gICAgJChcIiNTaWRlQ29udGFpbmVySXRlbXNGbG9hdGluZ1wiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgI1NpZGVDb250YWluZXJJdGVtc0Zsb2F0aW5nXCIpO1xyXG4gICAgJChcIi5Ub3RhbENhcnRJdGVtc1wiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLlRvdGFsQ2FydEl0ZW1zXCIpO1xyXG4gICAgJChcIi5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5Ub3RhbENhcnRJdGVtc1NpZGViYXJcIik7XHJcbiAgICAkKFwiLkNhcnRTdWJUb3RhbFwiKS5sb2FkKHdpbmRvdy5sb2NhdGlvbi5ocmVmICsgXCIgLkNhcnRTdWJUb3RhbFwiKTtcclxuICAgICQoXCIuQXZhaWxhYmxlU3RvY2tcIikubG9hZCh3aW5kb3cubG9jYXRpb24uaHJlZiArIFwiIC5BdmFpbGFibGVTdG9ja1wiKTtcclxufVxyXG5cclxuLy8gU3VibWl0IENhcnQgRm9ybSB0byBDaGVja291dFxyXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbndpbmRvdy5zdWJtaXRDYXJ0VG9DaGVja291dCA9IGZ1bmN0aW9uIChyb3V0ZSwgdGFyZ2V0LCBkYXRhLCBhY3Rpb24pIHtcclxuICAgIC8vY29uc29sZS5sb2coXCJSdXRhOiBcIiArIHJvdXRlICsgXCIgVGFyZ2V0OiBcIiArIHRhcmdldCArIFwiIERhdGE6IFwiICsgZGF0YSArIFwiQWN0aW9uOiBcIisgYWN0aW9uKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdXJsOiByb3V0ZSxcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ0pTT04nLFxyXG4gICAgICAgIGRhdGE6IHsgZGF0YSwgYWN0aW9uOiBhY3Rpb24gfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVzcG9uc2UgPT0gJ3N1Y2Nlc3MnKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0YXJnZXQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PSAncmVsb2FkJykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlZnJlc2ggcGFnZSwgZGVsZXRlIHBhcmFtZXR0ZXJzIGFuZCBvcGVuIGNoZWNrb3V0IHNpZGViYXJcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdChcIj9cIilbMF0gKyBcIj9jaGVja291dC1vblwiO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHRhcmdldDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBlbiBzdWJtaXRGb3JtJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X2Vycm9yKCcnLCBkYXRhLm1lc3NhZ2UsICdib3R0b21DZW50ZXInLCAnJyk7XHJcbiAgICAgICAgICAgICAgICAkKCcuU2lkZUNvbnRhaW5lckVycm9yJykuaHRtbChkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgLy8gJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBlcnJvcjogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgLy8kKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJFcnJvciBlbiBzdWJtaXRGb3JtKClcIik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufVxyXG5cclxuLy8gVmFsaWRhdGUgYW5kIHNldCBjb3Vwb25cclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cudmFsaWRhdGVBbmRTZXRDb3Vwb24gPSBmdW5jdGlvbiAocm91dGUsIGNvZGUsIGNhcnRpZCkge1xyXG4gICAgbGV0IGNvdXBvbkRpdiA9ICQoJyNDb3Vwb25EaXYnKTtcclxuICAgIGxldCBjb3Vwb25TZXQgPSAkKCcjU2V0dGVkQ291cG9uJyk7XHJcbiAgICBjb25zb2xlLmxvZyhjb2RlLCBjYXJ0aWQpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBjb2RlOiBjb2RlLCBjYXJ0aWQ6IGNhcnRpZCB9LFxyXG4gICAgICAgIGJlZm9yZVNlbmQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb21wcm9iYW5kbyBjdXDDs24uLi5cIik7XHJcbiAgICAgICAgICAgICQoJy5Db3Vwb25Mb2FkZXInKS5yZW1vdmVDbGFzcygnSGlkZGVuJyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcjQ291cG9uVmFsaWRhdGlvbk1lc3NhZ2UnKS5odG1sKFwiQ3Vww7NuIGFjZXB0YWRvICFcIik7XHJcbiAgICAgICAgICAgICAgICBjb3Vwb25EaXYuaGlkZSgyMDAsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb3Vwb25TZXQucmVtb3ZlQ2xhc3MoJ0hpZGRlbicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICQoJyNDb3Vwb25WYWxpZGF0aW9uTWVzc2FnZScpLmh0bWwoZGF0YS5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQoJy5Db3Vwb25Mb2FkZXInKS5hZGRDbGFzcygnSGlkZGVuJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbi8vIEZhdnNcclxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG53aW5kb3cuYWRkQXJ0aWNsZVRvRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFydGljbGVpZCwgYWN0aW9uLCBkaXNwbGF5QnV0dG9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGZhdl9pZDogZmF2aWQsIGFydGljbGVfaWQ6IGFydGljbGVpZCB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ2FkZGVkJykge1xyXG4gICAgICAgICAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWxvYWQnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnc2hvdyc6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24ucmVtb3ZlQ2xhc3MoJ2Zhdi1pY29uLW5vZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlCdXR0b24uYWRkQ2xhc3MoJ2Zhdi1pY29uLWlzZmF2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBhZ3JlZ2FkbyBhIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCAnJywgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25vbmUnOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQWN0dWFsaXphZG8gLSBTaW4gQWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUgJiYgZGF0YS5yZXN1bHQgPT0gJ3JlbW92ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBkaXNwbGF5QnV0dG9uLmFkZENsYXNzKCdmYXYtaWNvbi1ub2ZhdicpO1xyXG4gICAgICAgICAgICAgICAgZGlzcGxheUJ1dHRvbi5yZW1vdmVDbGFzcygnZmF2LWljb24taXNmYXYnKTtcclxuICAgICAgICAgICAgICAgIHRvYXN0X3N1Y2Nlc3MoJ09rIScsICdQcm9kdWN0byBlbGltaW5hZG8gZGUgZmF2b3JpdG9zJywgJ2JvdHRvbUNlbnRlcicsICcnLCAxMDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzZXRGYXZzVG90YWxJY29uKGRhdGEuZmF2c0NvdW50KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGVycm9yOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCcjRXJyb3InKS5odG1sKGRhdGEucmVzcG9uc2VUZXh0KTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHNldEZhdnNUb3RhbEljb24oZmF2cykge1xyXG4gICAgaWYgKGZhdnMgPiAwKSB7XHJcbiAgICAgICAgJCgnLkZhdk1haW5JY29uJykucmVtb3ZlQ2xhc3MoJ2ZhcicpO1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLmFkZENsYXNzKCdmYScpO1xyXG4gICAgfSBlbHNlIGlmIChmYXZzID09IDApIHtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5yZW1vdmVDbGFzcygnZmEnKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmFyJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYScpO1xyXG4gICAgICAgICQoJy5GYXZNYWluSWNvbicpLnJlbW92ZUNsYXNzKCdmYXInKTtcclxuICAgICAgICAkKCcuRmF2TWFpbkljb24nKS5hZGRDbGFzcygnZmEnKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yIGVuIHNldEZhdnNUb3RhbEljb24oKVwiKTtcclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnJlbW92ZUFydGljbGVGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgZmF2aWQsIGFjdGlvbikge1xyXG4gICAgdmFyIGRvYWN0aW9uID0gYWN0aW9uO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB1cmw6IHJvdXRlLFxyXG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnSlNPTicsXHJcbiAgICAgICAgZGF0YTogeyBmYXZfaWQ6IGZhdmlkIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXNwb25zZSA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkb2FjdGlvbik7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGRvYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9ICdyZWxvYWQnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2FzdF9zdWNjZXNzKCdPayEnLCAnUHJvZHVjdG8gZWxpbWluYWRvIGRlIGZhdm9yaXRvcycsICdib3R0b21DZW50ZXInLCBhY3Rpb24sIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gaGF5IGFjY2nDs24nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAvLyQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG53aW5kb3cucmVtb3ZlQWxsQXJ0aWNsZXNGcm9tRmF2cyA9IGZ1bmN0aW9uIChyb3V0ZSwgY3VzdG9tZXJpZCwgYWN0aW9uKSB7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHVybDogcm91dGUsXHJcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdKU09OJyxcclxuICAgICAgICBkYXRhOiB7IGN1c3RvbWVyX2lkOiBjdXN0b21lcmlkIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVsb2FkJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdObyBoYXkgYWNjacOzbicpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICQoJyNFcnJvcicpLmh0bWwoZGF0YS5tZXNzYWdlWydlcnJvckluZm8nXSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZXJyb3I6IGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgIC8vJCgnI0Vycm9yJykuaHRtbChkYXRhLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG4vKlxyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxufCBMT0dJTiBBTkQgUkVHSVNURVJcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbiovXHJcblxyXG4kKCcjUmVzZWxsZXJCb3gnKS5oaWRlKCk7XHJcblxyXG53aW5kb3cub3BlblJlc2VsbGVyUmVnaXN0cmF0aW9uID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIHRydWUpO1xyXG4gICAgJCgnLklmUmVzZWxsZXJFbmFibGUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcclxuICAgICQoJyNSZXNlbGxlckJveCcpLnNob3coMTAwKTtcclxuICAgICQoJyNSZXNlbGxlckNUQScpLmhpZGUoMCk7XHJcbiAgICAkKCcuTm9ybWFDbGllbnRUaXRsZScpLmhpZGUoMCk7XHJcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLnNob3coMCk7XHJcbn1cclxuXHJcbndpbmRvdy5jbG9zZVJlc2VsbGVyUmVnaXN0cmF0aW9uID0gZnVuY3Rpb24oKVxyXG57XHJcbiAgICAkKCcjSXNSZXNlbGxlckNoZWNrYm94JykucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcclxuICAgICQoJy5JZlJlc2VsbGVyRW5hYmxlJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcclxuICAgICQoJyNSZXNlbGxlckJveCcpLmhpZGUoMCk7XHJcbiAgICAkKCcjUmVzZWxsZXJDVEEnKS5zaG93KDEwMCk7XHJcbiAgICAkKCcuTm9ybWFDbGllbnRUaXRsZScpLnNob3coMCk7XHJcbiAgICAkKCcuUmVzZWxsZXJUaXRsZScpLmhpZGUoMCk7XHJcbn1cclxuXHJcbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAkKCcuR2VvUHJvdlNlbGVjdCcpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBwcm92X2lkID0gJCh0aGlzKS52YWwoKTtcclxuICAgICAgICBnZXRHZW9Mb2NzKHByb3ZfaWQpO1xyXG4gICAgfSk7XHJcbn0pO1xyXG5cclxuLypcclxufC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcbnwgTUlYIEZVTkNUSU9OU1xyXG58LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuKi9cclxuXHJcbndpbmRvdy5jbG9zZUVsZW1lbnQgPSBmdW5jdGlvbihzZWxlY3Rvcilcclxue1xyXG4gICAgJChzZWxlY3RvcikuaGlkZSgxMDApO1xyXG59XHJcblxyXG53aW5kb3cuZ2V0UGFyYW0gPSBmdW5jdGlvbihwYXJhbWV0ZXJOYW1lKSB7XHJcbiAgICB2YXIgcmVzdWx0ID0gbnVsbCxcclxuICAgICAgICB0bXAgPSBbXTtcclxuICAgIGxvY2F0aW9uLnNlYXJjaFxyXG4gICAgICAgIC5zdWJzdHIoMSlcclxuICAgICAgICAuc3BsaXQoXCImXCIpXHJcbiAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICB0bXAgPSBpdGVtLnNwbGl0KFwiPVwiKTtcclxuICAgICAgICBpZiAodG1wWzBdID09PSBwYXJhbWV0ZXJOYW1lKSByZXN1bHQgPSBkZWNvZGVVUklDb21wb25lbnQodG1wWzFdKTtcclxuICAgICAgICB9KTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbndpbmRvdy5nZXRQYXJhbXMgPSBmdW5jdGlvbih1cmwpIHtcclxuICAgIHZhciBwYXJhbXMgPSB7fTtcclxuXHR2YXIgcGFyc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xyXG5cdHBhcnNlci5ocmVmID0gdXJsO1xyXG5cdHZhciBxdWVyeSA9IHBhcnNlci5zZWFyY2guc3Vic3RyaW5nKDEpO1xyXG5cdHZhciB2YXJzID0gcXVlcnkuc3BsaXQoJyYnKTtcclxuXHRmb3IgKHZhciBpID0gMDsgaSA8IHZhcnMubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBwYWlyID0gdmFyc1tpXS5zcGxpdCgnPScpO1xyXG5cdFx0cGFyYW1zW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pO1xyXG5cdH1cclxuXHRyZXR1cm4gcGFyYW1zO1xyXG59XHJcblxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9yZXNvdXJjZXMvYXNzZXRzL2pzL3N0b3JlL3NjcmlwdHMuanMiXSwic291cmNlUm9vdCI6IiJ9