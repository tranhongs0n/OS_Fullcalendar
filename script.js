document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  var calendar = new FullCalendar.Calendar(calendarEl, {
    height: '100%',
    slotMinWidth: 256,
    timeZone: 'Asia/Ho_Chi_Minh',
    locale: 'vi',
    initialView: 'resourceTimelineYears',
    initialDate: '2026-05-01',
    views: {
      resourceTimelineYears: {
        type: 'resourceTimeline',
        duration: { years: 1 },
        slotDuration: { months: 1 }
      },
      resourceTimelineMonth: {
        type: 'resourceTimeline',
        duration: { months: 1 },
        slotDuration: { days: 1 },
        slotMinWidth: 256,
        slotLabelContent: function (arg) {
          var date = arg.date;
          var dayOfWeek = date.getDay();
          var dayOfMonth = date.getDate();
          var vietnameseDays = [
            'Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'
          ];
          return vietnameseDays[dayOfWeek] + ' - ' + dayOfMonth;
        }
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
      const desc = arg.event.extendedProps.description || '';

      const dateText = (endTime && endTime !== startTime)
        ? `${startTime} - ${endTime}`
        : startTime;

      return {
        html: `
          <div class="custom-event-card">
            <div class="event-header">
              <span class="event-dates">${dateText}</span>
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

  // Helper function to scroll to today's date dynamically
  function scrollToToday() {
    const viewStart = calendar.view.activeStart;
    const today = new Date();
    const msDiff = today - viewStart;
    calendar.scrollToTime(msDiff);
  }

  // Automatically scroll to the current month/day on initial load
  setTimeout(scrollToToday, 100);

  // Handle sidebar view toggling
  const viewButtons = document.querySelectorAll('.sidebar-option');
  viewButtons.forEach(button => {
    button.addEventListener('click', function () {
      viewButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const viewName = this.getAttribute('data-view');
      calendar.changeView(viewName);
      
      // Re-apply automatic scroll to today in the new view
    });
  });

  // Handle Year and Month filters
  const yearSelect = document.getElementById('filter-year');
  const monthSelect = document.getElementById('filter-month');

  function handleFilterChange() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    
    // Construct target date (first day of the selected month/year)
    const targetDateStr = `${year}-${month}-01`;
    
    // Jump calendar to that target date
    calendar.gotoDate(targetDateStr);
    
    // If in Year view, scroll horizontally to the selected month
    if (calendar.view.type === 'resourceTimelineYears') {
      setTimeout(function () {
        const viewStart = calendar.view.activeStart;
        const targetDate = new Date(year, parseInt(month, 10) - 1, 1);
        const msDiff = targetDate - viewStart;
        calendar.scrollToTime(msDiff);
      }, 50);
    }
  }

  yearSelect.addEventListener('change', handleFilterChange);
  monthSelect.addEventListener('change', handleFilterChange);
});

