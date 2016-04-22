var searchResult = require('../../tpl/search-result.tpl');
var loadMore = require('../../tpl/load-more.tpl');
var endLine = require('../../tpl/end-line.tpl');
var Reminder = require('./reminder');

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
                    pageBegin += 1;
                    $('.result-item-container').append(searchResult(data));
                    jumpDetail(false);
                    $('.result-item-container').append(loadMore());
                    $('.load-more-report').on('click', loadMoreReport);
                }
            }).fail(function () {
                $('.loading-icon').addClass('hide');
                reminder.show('加载失败，请重试');
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
                    pageBegin += 1;
                    $('.result-item-container').append(searchResult(data));
                    jumpDetail(false);
                    $('.result-item-container').append(loadMore());
                    $('.load-more-report').on('click', loadMoreReport);
                }
            }).fail(function () {
                $('.loading-icon').addClass('hide');
                reminder.show('加载失败，请重试');
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
                pageBegin += 1;
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
        pageBegin += 1;
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