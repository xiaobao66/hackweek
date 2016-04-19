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
	        $.ajax({}).done(function (data) {
	            $this.remove();
	            $('.result-item-container').append(searchResult(data));
	            $('.result-item-container').append(loadMore());
	            $('.load-more-report').on('click', loadMoreReport);
	        }).fail(function () {

	        });
	    }
	}

	var attachFastClick = Origami.fastclick;
	attachFastClick(document.body);
	$('#search-input').on('focus', function () {
	    $('.search').addClass('show-cancel-btn');
	    // $('.mask-layer').removeClass('hide');
	});

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
	        $('.loading-icon').removeClass('hide');
	        $.ajax({
	            url: '/search',
	            type: 'POST',
	            data: {keyword: searchContent}
	        }).done(function (data) {
	            $('.result-item-container').empty();
	            $('.load-more-container').remove();
	            $('.result-item-container').append(searchResult(data));
	            $('.result-item-container').append(loadMore());
	            $('.load-more-report').on('click', loadMoreReport);
	            $('.loading-icon').addClass('hide');
	        }).fail(function () {

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

	// $.ajax({
	//     url: '/main_page',
	//     type: 'GET'
	// }).done(function (data) {
	//
	// });

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

/***/ }
/******/ ]);