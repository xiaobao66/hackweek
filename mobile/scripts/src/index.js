var searchResult = require('../../tpl/search-result.html');
var loadMore = require('../../tpl/load-more.html');

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
//     },{
//         document_id: 2,
//         document_name: 'C课设 代码&报告',
//         uploader: '雪君',
//         institude: '计算机学院13级',
//         class: 'C语言课设',
//         downloads: 23,
//         type: 'pdf',
//         document_thumb: '这是一小段简洁的介绍，大致介绍文档中的部分内容。这是一小段简洁的介绍，大致介绍文档中的部分内容。'
//     },{
//         document_id: 3,
//         document_name: 'C课设 代码&报告',
//         uploader: '雪君',
//         institude: '计算机学院13级',
//         class: 'C语言课设',
//         downloads: 12,
//         type: 'ppt',
//         document_thumb: '这是一小段简洁的介绍，大致介绍文档中的部分内容。这是一小段简洁的介绍，大致介绍文档中的部分内容。'
//     },{
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

var attachFastClick = Origami.fastclick;
attachFastClick(document.body);
$('#search-input').on('focus', function () {
    $('.search').addClass('show-cancel-btn');
});

$('#search-input').on('blur', function () {
    $('.search').removeClass('show-cancel-btn');
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

function loadMoreReport(e) {
    var $this = $(e.target);
    if (parseInt($this.attr('disabled')) === 1) {
        return;
    } else {
        $this.text('努力加载中...');
        setTimeout(function () {
            $this.remove();
            $('.result-item-container').append(searchResult(test_data));
            $('.result-item-container').append(loadMore());
            $('.load-more-report').on('click', loadMoreReport);
        }, 500);
    }
}
// $('.load-more-report').on('click', loadMoreReport);