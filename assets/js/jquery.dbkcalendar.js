/*
	Include calendar file in HTML5 UP
	hacknang.de | @paddy
*/

(function($) {

    var cal_uri = "https://cloud.hacknang.de/hackcal/";
    var uri_regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/\-_\.]*(\?\S+)?)?)?)/ig

    $.getJSON(cal_uri, function(data) {
	var items = [];
        $.each(data, function(date, day) {
            items.push("<tr data-date='" + date + "'><th colspan='3'>" + day.name + "</th><th>" + day.weekday + "</th></tr>");
            $.each(day.events, function(uid, event) {
		        if(event.description) event.description = event.description.replace(/\n/g,"<br>").replace(uri_regex, "<a href='$1' target='_blank'>$1</a>");
                items.push("<tr data-uid='" + uid + "'><td>" + event.datestr + "</td><td>" + event.summary + "</td><td>" + ((event.location)?event.location:'') + "</td><td>" + ((event.description)?event.description:'') + "</td></tr>");
            });
        });
	$('#dbkcalendar').html("<table class='dbk'><tbody>" + items.join( "" ) + "</tbody></table>");
    });

})(jQuery);
