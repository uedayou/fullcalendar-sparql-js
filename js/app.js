$(document).ready(function() {
    $('#calendar').modalmanager('loading').find('.modal-scrollable').off('click.modalmanager');  
    query = query.replace(/{\% now \%}/g, now);
    qr = sendQuery(endpoint, query);
    qr.fail(
        function (xhr, textStatus, thrownError) {
            alert("Error: A '" + textStatus+ "' occurred.");
            $('#calendar').modalmanager('removeLoading');
        }
    );
    qr.done(
        function (json) {
            dataJson = [];
            for(var i=0;i<json.results.bindings.length;i++) {
                var j = json.results.bindings[i];
                ev = {};
                ev.title = j[labelTitle].value;
                ev.start = j[labelStartDate].value;
                // 時間が0時ちょうどの場合は一日足す
                if (moment(j[labelEndDate].value).format('HH:mm:ss')=="00:00:00" || allDayFlag) {
                    ev.end = moment(j[labelEndDate].value).add('days', 1).format();
                }
                else {
                    ev.end = j[labelEndDate].value;
                }
                ev.color = colors[i%colors.length];
                ev.json = j;
                ev.allDay = allDayFlag;
                dataJson.push(ev);
            }
            // page is now ready, initialize the calendar...
            $('#calendar').fullCalendar({
                // put your options and callbacks here
                lang: 'ja',
                header: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'month,agendaWeek,agendaDay'
                },
                timeFormat: 'h:mm',
                firstDay: 1,
                defaultDate: typeof defaultDate == 'string' ? defaultDate : moment(),
                events: dataJson,
                eventClick: function(calEvent, jsEvent, view) {
                    showEventModal(calEvent.json);
                },
                dayClick: function() {},
                viewDisplay: function(view) {}
            });

            $('#calendar').modalmanager('removeLoading');
            $('#calendar').removeClass('modal-open');
        }
    );
});


var showEventModal = function(json) {
    var content = '<table class="table table-striped table-bordered table-condensed">';
    for (var key in json) {
        var title = key;
        var attr = json[key].value;
        if (typeof attr === 'string' && attr.indexOf('http') === 0) {
            attr = '<a target="_blank" href="' + attr + '">'+ attr + '</a>';
        }
        if (attr) {
            content += '<tr><th>'+title+'</th><td>'+ attr +'</td></tr>';
        }
    }
    $("#event-detail").html(content+"</table>");
    $("#event-modal").modal('show');
};
