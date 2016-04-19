$('#search-input').on('focus', function () {
    $('.search').addClass('show-cancel-btn');
});

$('.cancel-btn').on('tap', function (e) {
    e.preventDefault();
    $('#search-input').val('').blur();
    $('.search').removeClass('show-cancel-btn');
});