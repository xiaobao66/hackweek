require('../../tpl/modules/reminder/reminder.css');
var reminderTpl = require('../../tpl/modules/reminder/reminder.tpl');

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