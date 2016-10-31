$(document).ready(function() {
    $('.pure-radio input[value="' + localStorage.colorGit + '"]').attr('checked', true);
    $('input[name=color]').on('change', function() {
		var value = $(this).val().toString();
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	        localStorage.colorGit = value;
			chrome.tabs.sendMessage(tabs[0].id, {'value': value}, function(response) {});
		});
	});
});
