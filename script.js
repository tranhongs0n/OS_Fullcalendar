document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: '100%',
    slotMinWidth: 256,
    timeZone: 'Asia/Ho_Chi_Minh',
    locale: 'vi',
    initialView: 'resourceTimelineYears',
    views: {
      resourceTimelineYears: {
        type: 'resourceTimeline',
        duration: { years: 1 },
        slotDuration: { months: 1 }
      }
    },
    editable: true,
    resourceAreaHeaderContent: 'Tỉnh/Thành phố',
    resourceAreaWidth: '15%',
    businessHours: false,

    eventContent(arg) {
      const startTime = arg.event.start.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      });
      const endTime = arg.event.end
        ? arg.event.end.toLocaleDateString('vi-VN', {
          day: '2-digit',
          month: '2-digit'
        })
        : '';

      const title = arg.event.title;
      const desc =
        arg.event.extendedProps.description ||
        'Việc thực hiện chính sách, pháp luật về';

      return {
        html: `
          <div class="custom-event-card">
            <div class="event-header">
              <span class="event-dates">${startTime} - ${endTime}</span>
              <span class="event-title-main">${title}</span>
            </div>
            <div class="event-description">${desc}</div>
          </div>
        `
      };
    },

    resources: resources,
    events: events

    // eventDidMount: function (info) {
    //   // Tooltip removed as per user request
    // },

    // resourceLabelDidMount: function (info) {
    //   const content = info.resource.extendedProps.eventClassName ?
    //     info.resource.extendedProps.eventClassName[0] : null;
    //   if (content) {
    //     const el = info.el.querySelector('.fc-datagrid-cell-main');
    //     if (el) {
    //       const txt = el.innerText;
    //       el.innerHTML = `<a style="cursor:pointer;">${txt}</a>`;
    //       tippy(el, {
    //         content,
    //         placement: 'top',
    //         theme: 'light-border',
    //         allowHTML: true
    //       });
    //       el.addEventListener('click', function () {
    //         alert('Bạn đã click vào: ' + txt + '\nThông tin: ' + content);
    //       });
    //     }
    //   }
    // }
  });

  calendar.render();
});
