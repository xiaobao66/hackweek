/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var searchResult = __webpack_require__(1);
	var loadMore = __webpack_require__(3);
	var endLine = __webpack_require__(4);
	var Reminder = __webpack_require__(5);

	var pageBegin = 0;
	var itemCount = 6;
	var mainFlag = 1;
	var searchInfo = '';

	// var test_data = {
	//     result: [{
	//         document_id: 1,
	//         document_name: 'C课设 代码&报告',
	//         uploader: '雪君',
	//         institude: '计算机学院13级',
	//         class: 'C语言课设',
	//         downloads: 234,
	//         type: 'doc',
	//         document_thumb: '这是一小段简洁的介绍，大致介绍文档中的部分内容。这是一小段简洁的介绍，大致介绍文档中的部分内容。'
	//     }, {
	//         document_id: 2,
	//         document_name: 'C课设 代码&报告',
	//         uploader: '雪君',
	//         institude: '计算机学院13级',
	//         class: 'C语言课设',
	//         downloads: 23,
	//         type: 'pdf',
	//         document_thumb: '这是一小段简洁的介绍，大致介绍文档中的部分内容。这是一小段简洁的介绍，大致介绍文档中的部分内容。'
	//     }, {
	//         document_id: 3,
	//         document_name: 'C课设 代码&报告',
	//         uploader: '雪君',
	//         institude: '计算机学院13级',
	//         class: 'C语言课设',
	//         downloads: 12,
	//         type: 'ppt',
	//         document_thumb: '这是一小段简洁的介绍，大致介绍文档中的部分内容。这是一小段简洁的介绍，大致介绍文档中的部分内容。'
	//     }, {
	//         document_id: 4,
	//         document_name: 'C课设 代码&报告',
	//         uploader: '雪君',
	//         institude: '计算机学院13级',
	//         class: 'C语言课设',
	//         downloads: 123,
	//         type: 'docx',
	//         document_thumb: '这是一小段简洁的介绍，大致介绍文档中的部分内容。这是一小段简洁的介绍，大致介绍文档中的部分内容。'
	//     }]
	// };

	function loadMoreReport(e) {
	    var $this = $(e.target);
	    if (parseInt($this.attr('disabled')) === 1) {
	        return;
	    } else {
	        $this.attr('disabled', 1);
	        $this.text('努力加载中...');
	        // setTimeout(function () {
	        //     $this.remove();
	        //     $('.result-item-container').append(searchResult(test_data));
	        //     $('.result-item-container').append(loadMore());
	        //     $('.load-more-report').on('click', loadMoreReport);
	        // }, 500);
	        if (mainFlag === 1) {
	            $.ajax({
	                url: '/main_page',
	                type: 'POST',
	                data: {
	                    begin: pageBegin,
	                    count: itemCount
	                }
	            }).done(function (data) {
	                $this.remove();
	                if (data.result.length === 0) {
	                    $('.result-item-container').append(endLine());
	                } else {
	                    pageBegin += itemCount;
	                    $('.result-item-container').append(searchResult(data));
	                    jumpDetail(false);
	                    $('.result-item-container').append(loadMore());
	                    $('.load-more-report').on('click', loadMoreReport);
	                }
	            }).fail(function () {
	                $('.loading-icon').addClass('hide');
	                reminder.show('加载失败，请重试');
	                $this.attr('disabled', 0);
	                $this.text('点击加载更多报告');
	            });
	        } else {
	            $.ajax({
	                url: '/search',
	                type: 'POST',
	                data: {
	                    keyword: searchInfo,
	                    begin: pageBegin,
	                    count: itemCount
	                }
	            }).done(function (data) {
	                $this.remove();
	                if (data.result.length === 0) {
	                    $('.result-item-container').append(endLine());
	                } else {
	                    pageBegin += itemCount;
	                    $('.result-item-container').append(searchResult(data));
	                    jumpDetail(false);
	                    $('.result-item-container').append(loadMore());
	                    $('.load-more-report').on('click', loadMoreReport);
	                }
	            }).fail(function () {
	                $('.loading-icon').addClass('hide');
	                reminder.show('加载失败，请重试');
	                $this.attr('disabled', 0);
	                $this.text('点击加载更多报告');
	            });
	        }
	    }
	}

	function jumpDetail(flag) {
	    if (flag) {
	        $('.result-item').on('tap', function (e) {
	            var inputElem = $(e.currentTarget).children('input'),
	                document_id = $(inputElem).val();
	            var url = "./report_detail.html?";
	            document_id = encodeURIComponent(document_id);
	            url = url + 'document_id=' + document_id;
	            window.location.href = url;
	        });
	    } else {
	        $('.result-item').off('tap').on('tap', function (e) {
	            var inputElem = $(e.currentTarget).children('input'),
	                document_id = $(inputElem).val();
	            var url = "./report_detail.html?";
	            document_id = encodeURIComponent(document_id);
	            url = url + 'document_id=' + document_id;
	            window.location.href = url;
	        });
	    }
	}

	var attachFastClick = Origami.fastclick;
	attachFastClick(document.body);
	$('#search-input').on('focus', function () {
	    $('.search').addClass('show-cancel-btn');
	    // $('.mask-layer').removeClass('hide');
	});

	var reminder = new Reminder();
	reminder.init();

	$('#search-input').on('blur', function () {
	    $('.search').removeClass('show-cancel-btn');
	});

	$('#search-input').on('keyup', function (e) {
	    if (e.keyCode === 13) {
	        // $('.result-item-container').empty();
	        // $('.load-more-container').remove();
	        // $('.loading-icon').removeClass('hide');
	        // setTimeout(function () {
	        //     $('.result-item-container').append(searchResult(test_data));
	        //     $('.result-item-container').append(loadMore());
	        //     $('.load-more-report').on('click', loadMoreReport);
	        //     $('.loading-icon').addClass('hide');
	        // }, 500);
	        var searchContent = $(e.target).val();
	        if (!searchContent) {
	            return;
	        }
	        searchInfo = searchContent;
	        $('.loading-icon').removeClass('hide');
	        var pageBeginbak = pageBegin,
	            mainFlagbak = mainFlag;
	        pageBegin = 0;
	        mainFlag = 0;
	        $.ajax({
	            url: '/search',
	            type: 'POST',
	            data: {
	                keyword: searchContent,
	                begin: pageBegin,
	                count: itemCount
	            }
	        }).done(function (data) {
	            $('.loading-icon').addClass('hide');
	            $('.result-item-container').empty();
	            if (data.result.length === 0) {
	                $('.result-item-container').append(endLine());
	            } else {
	                pageBegin += itemCount;
	                $('.result-item-container').append(searchResult(data));
	                jumpDetail(true);
	                $('.result-item-container').append(loadMore());
	                $('.load-more-report').on('click', loadMoreReport);
	            }
	        }).fail(function () {
	            $('.loading-icon').addClass('hide');
	            reminder.show('网络连接错误，请重试');
	            pageBegin = pageBeginbak;
	            mainFlag = mainFlagbak;
	        });
	    }
	});

	$('.cancel-btn').on('click', function (e) {
	    e.preventDefault();
	    $('#search-input').val('').blur();
	    $('.search').removeClass('show-cancel-btn');
	});

	// $('.result-item-container').append(searchResult(test_data));
	// $('.result-item-container').append(loadMore());

	$.ajax({
	    url: '/main_page',
	    type: 'POST',
	    data: {
	        begin: pageBegin,
	        count: itemCount
	    }
	}).done(function (data) {
	    $('.loading-icon').addClass('hide');
	    if (data.result.length === 0) {
	        $('.result-item-container').append(endLine());
	    } else {
	        pageBegin += itemCount;
	        $('.result-item-container').append(searchResult(data));
	        jumpDetail(true);
	        $('.result-item-container').append(loadMore());
	        $('.load-more-report').on('click', loadMoreReport);
	    }
	}).fail(function (xhr, errorType, error) {
	    $('.loading-icon').addClass('hide');
	    reminder.show('网络连接错误，请重试');
	});

	// jumpDetail();

	// $('.load-more-report').on('click', loadMoreReport);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/search-result',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$each=$utils.$each,result=$data.result,$value=$data.$value,$index=$data.$index,$escape=$utils.$escape,$out='';$each(result,function($value,$index){
	$out+=' <div class="result-item"> <input type="hidden" value="';
	$out+=$escape($value.document_id);
	$out+='"> ';
	if($value.type === 'doc' || $value.type === 'docx'){
	$out+=' <img class="result-filetype-icon" src="images/word.png"> ';
	}else if($value.type === 'ppt' || $value.type === 'pptx'){
	$out+=' <img class="result-filetype-icon" src="images/ppt.png"> ';
	}else if($value.type === 'pdf'){
	$out+=' <img class="result-filetype-icon" src="images/pdf.png"> ';
	}
	$out+=' <h3 class="filename">';
	$out+=$escape($value.document_name);
	$out+='</h3> <p class="file-thumb-info">    ';
	$out+=$escape($value.grade);
	$out+=$escape($value.institude);
	$out+=' ';
	$out+=$escape($value.class);
	$out+=' ';
	$out+=$escape($value.uploader);
	$out+=' </p> <p class="file-download-info"> 已有<span class="download-num">';
	$out+=$escape($value.downloads);
	$out+='</span>人下载 </p> <p class="file-thumb-content"> ';
	$out+=$escape($value.document_thumb);
	$out+=' </p> </div> ';
	});
	return new String($out);
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	/*TMODJS:{}*/
	!function () {
		function a(a, b) {
			return (/string|function/.test(typeof b) ? h : g)(a, b)
		}

		function b(a, c) {
			return "string" != typeof a && (c = typeof a, "number" === c ? a += "" : a = "function" === c ? b(a.call(a)) : ""), a
		}

		function c(a) {
			return l[a]
		}

		function d(a) {
			return b(a).replace(/&(?![\w#]+;)|[<>"']/g, c)
		}

		function e(a, b) {
			if (m(a))for (var c = 0, d = a.length; d > c; c++)b.call(a, a[c], c, a); else for (c in a)b.call(a, a[c], c)
		}

		function f(a, b) {
			var c = /(\/)[^\/]+\1\.\.\1/, d = ("./" + a).replace(/[^\/]+$/, ""), e = d + b;
			for (e = e.replace(/\/\.\//g, "/"); e.match(c);)e = e.replace(c, "/");
			return e
		}

		function g(b, c) {
			var d = a.get(b) || i({filename: b, name: "Render Error", message: "Template not found"});
			return c ? d(c) : d
		}

		function h(a, b) {
			if ("string" == typeof b) {
				var c = b;
				b = function () {
					return new k(c)
				}
			}
			var d = j[a] = function (c) {
				try {
					return new b(c, a) + ""
				} catch (d) {
					return i(d)()
				}
			};
			return d.prototype = b.prototype = n, d.toString = function () {
				return b + ""
			}, d
		}

		function i(a) {
			var b = "{Template Error}", c = a.stack || "";
			if (c)c = c.split("\n").slice(0, 2).join("\n"); else for (var d in a)c += "<" + d + ">\n" + a[d] + "\n\n";
			return function () {
				return "object" == typeof console && console.error(b + "\n\n" + c), b
			}
		}

		var j = a.cache = {}, k = this.String, l = {
			"<": "&#60;",
			">": "&#62;",
			'"': "&#34;",
			"'": "&#39;",
			"&": "&#38;"
		}, m = Array.isArray || function (a) {
				return "[object Array]" === {}.toString.call(a)
			}, n = a.utils = {
			$helpers: {}, $include: function (a, b, c) {
				return a = f(c, a), g(a, b)
			}, $string: b, $escape: d, $each: e
		}, o = a.helpers = n.$helpers;
		a.get = function (a) {
			return j[a.replace(/^\.\//, "")]
		}, a.helper = function (a, b) {
			o[a] = b
		}, module.exports = a
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/load-more','<div class="load-more-container"> <a href="javascript:;" class="load-more-report" disabled="0">点击加载更多报告</a> </div>');

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/end-line','<div class="end-line"> <span class="end-line-info">END</span> </div>');

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(6);
	var reminderTpl = __webpack_require__(10);

	function Reminder() {

	}

	function _bind($confirmBtn, $this) {
	    $confirmBtn.on('tap', function (e) {
	        $this.reminder.addClass('reminder-container-hide');
	        $this.defer.resolve();
	    });
	}

	Reminder.prototype.init = function (content) {
	    content = content || '';
	    $('body').append(reminderTpl({content: content}));
	    _bind($('#confirm-reminder'), this);
	    this.reminder = $('.reminder-container');
	    this.reminderContent = $('.reminder-content');
	};

	Reminder.prototype.show = function (content) {
	    this.defer = $.Deferred();
	    this.reminder.removeClass('reminder-container-hide');
	    this.reminderContent.text(content);
	    return this.defer.promise();
	};

	module.exports = Reminder;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(7);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(9)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!./reminder.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?minimize&-autoprefixer!./reminder.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(8)();
	// imports


	// module
	exports.push([module.id, ".reminder-container{position:absolute;top:45%;left:50%;-moz-transform:translate(-50%,-50%);-ms-transform:translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);width:60%;background-color:#999;color:#fff;border-radius:15px;z-index:4}.reminder-content{font-size:16px;text-align:center;line-height:1.2;padding:.4rem}[data-dpr=\"2\"] .reminder-content{font-size:32px}[data-dpr=\"3\"] .reminder-content{font-size:48px}.reminder-control{border-top:.01333rem solid #fff}.reminder-control a{display:block;padding:.2rem 0;text-align:center;color:#fff}.reminder-container-hide{display:none}", ""]);

	// exports


/***/ },
/* 8 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var template=__webpack_require__(2);
	module.exports=template('mobile/tpl/modules/reminder/reminder',function($data,$filename
	/**/) {
	'use strict';var $utils=this,$helpers=$utils.$helpers,$escape=$utils.$escape,content=$data.content,$out='';$out+='<section class="reminder-container reminder-container-hide"> <p class="reminder-content">';
	$out+=$escape(content);
	$out+='</p> <div class="reminder-control"> <a href="javascript:;" id="confirm-reminder">确定</a> </div> </section>';
	return new String($out);
	});

/***/ }
/******/ ]);