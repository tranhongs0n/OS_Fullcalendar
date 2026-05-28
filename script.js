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

  // Helper function to perform scroll logic based on views and years/months using smooth animated transitions
  function performScroll(year, month) {
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
    const todayDate = String(today.getDate()).padStart(2, '0');

    const selectedYear = year;
    const selectedMonth = String(month).padStart(2, '0');

    let targetDateStr = '';

    if (calendar.view.type === 'resourceTimelineYears') {
      if (parseInt(selectedYear, 10) === todayYear) {
        // Same year: scroll to start of today's current month
        targetDateStr = `${todayYear}-${todayMonth}-01`;
      } else {
        // Different year: scroll to January 1st
        targetDateStr = `${selectedYear}-01-01`;
      }
    } else if (calendar.view.type === 'resourceTimelineMonth') {
      if (parseInt(selectedYear, 10) === todayYear && selectedMonth === todayMonth) {
        // Same month: scroll to today's current day
        targetDateStr = `${todayYear}-${todayMonth}-${todayDate}`;
      } else {
        // Different month: scroll to 1st of selected month
        targetDateStr = `${selectedYear}-${selectedMonth}-01`;
      }
    }

    const calendarEl = document.getElementById('calendar') || document.querySelector('.fc');
    if (!calendarEl) return;

    // Use a flexible selector for target slot (handles th, td, or any container with data-date)
    const targetSlot = calendarEl.querySelector(`[data-date="${targetDateStr}"]`);
    
    // Find the main horizontal scroller for the timeline body
    let scroller = null;
    const timelineBody = calendarEl.querySelector('.fc-timeline-body');
    if (timelineBody) {
      scroller = timelineBody.closest('.fc-scroller');
    }
    if (!scroller) {
      scroller = calendarEl.querySelector('.fc-scroller-liquid-absolute') || calendarEl.querySelector('.fc-scroller');
    }

    if (scroller) {
      let targetScrollLeft = 0;
      if (targetSlot) {
        // Precise scroll target calculation using getBoundingClientRect (immune to offsetParent differences)
        const slotRect = targetSlot.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        targetScrollLeft = slotRect.left - scrollerRect.left + scroller.scrollLeft;
      }

      // Smoothly animate the horizontal scroll
      scroller.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }

  // Handle Year and Month filters
  const yearSelect = document.getElementById('filter-year');
  const monthSelect = document.getElementById('filter-month');

  // Automatically scroll to the correct month/day on initial load
  setTimeout(function () {
    performScroll(yearSelect.value, monthSelect.value);
  }, 100);

  // Handle sidebar view toggling
  const viewButtons = document.querySelectorAll('.sidebar-option');
  viewButtons.forEach(button => {
    button.addEventListener('click', function () {
      viewButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const viewName = this.getAttribute('data-view');
      calendar.changeView(viewName);
      
      // Re-apply automatic scroll based on the current selection in the new view
      setTimeout(function () {
        performScroll(yearSelect.value, monthSelect.value);
      }, 100);
    });
  });

  function handleFilterChange() {
    const year = yearSelect.value;
    const month = monthSelect.value;
    
    // Construct target date (first day of the selected month/year)
    const targetDateStr = `${year}-${month}-01`;
    
    // Jump calendar to that target date
    calendar.gotoDate(targetDateStr);
    
    // Re-apply automatic scroll based on the selected year and month
    setTimeout(function () {
      performScroll(year, month);
    }, 100);
  }

  yearSelect.addEventListener('change', handleFilterChange);
  monthSelect.addEventListener('change', handleFilterChange);
});

