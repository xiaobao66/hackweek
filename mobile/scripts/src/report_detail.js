var reportDownload = require('../../tpl/report-download-info.tpl');
var reportPreview = require('../../tpl/report-preview.tpl');
var reportThumb = require('../../tpl/report-preview-thumb.tpl');
var reportMiss = require('../../tpl/report-preview-miss.tpl');
var Reminder = require('./reminder');

// var test_data = {
//     document_id: 2123,
//     document_name: 'C课设 报告&代码',
//     uploader: '小宝上传',
//     institude: '13级计算机学院',
//     class: 'C课程设计',
//     downloads: 123,
//     comment: 'hello',
//     type: 'doc',
//     preview: ['images/report-preview.png', 'images/report-preview.png', 'images/report-preview.png']
// };
//
// var test_data2 = {
//     result: {
//         document_name: 'C课设 报告&代码',
//         uploader: '小宝上传',
//         institude: '13级计算机学院',
//         class: 'C课程设计',
//         downloads: 123,
//         comment: 'hello',
//         type: 'doc',
//         preview: ['images/report-preview.png', 'images/report-preview.png', 'images/report-preview.png']
//     }
// };

// setTimeout(function () {
//     $('.report-container').append(reportThumb(test_data2));
//     $('.report-preview-container').append(reportPreview(test_data));
//     $('.report-download').append(reportDownload(test_data));
//     $('.loading-icon').addClass('hide');
// }, 1000);

var reminder = new Reminder();
reminder.init();

var searchUrl = window.location.search,
    search = '';
if (searchUrl.indexOf('?') !== -1) {
    search = decodeURIComponent(searchUrl.substr(1));
}

$('.download-btn').on('tap', function (e) {
    $('.report-download').addClass('show-download-info');
});

if (search !== '') {
    var document_id = search.split('=')[1];
    $.ajax({
        url: '/document_detail',
        type: 'POST',
        data: {document_id: document_id}
    }).done(function (data) {
        $('.report-container').append(reportThumb(data));
        if (data.result.preview.length === 0) {
            $('.report-preview-container').append(reportMiss());
        } else {
            $('.report-preview-container').append(reportPreview(data.result));
        }
        $('.report-download').append(reportDownload(data.result));
        $('.loading-icon').addClass('hide');
    }).fail(function () {
        // $('.loading-icon').addClass('hide');
        reminder.show('网络连接错误，请重试');
    });
}

