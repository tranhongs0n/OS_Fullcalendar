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

  // Local wrapper that delegates to the clean, modular scrollToCalendarDate utility
  function performScroll(year, month) {
    scrollToCalendarDate('calendar', year, month, true);
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

/**
 * Core utility function to scroll FullCalendar timeline to a targeted slot date.
 * Relies on viewport bounding client rect logic to maintain layout safety and cross-view accuracy.
 * Highly robust, designed for OutSystems integrations and client actions.
 * 
 * @param {string} widgetId - The client-side HTML container ID of the calendar (e.g. "b6-Calendar").
 * @param {number|string} targetYear - Selected year.
 * @param {number|string} targetMonth - Selected month (1-12).
 * @param {boolean} [smooth=true] - If true, performs a smooth animated scroll; otherwise jumps instantly.
 */
function scrollToCalendarDate(widgetId, targetYear, targetMonth, smooth = true) {
  const container = findCalendarContainer(widgetId);
  if (!container) return;

  const viewType = getActiveViewType(container);
  const targetDateStr = getTargetDateString(viewType, targetYear, targetMonth);
  const targetSlot = container.querySelector(`[data-date="${targetDateStr}"]`);
  const scroller = findHorizontalScroller(container);

  if (!scroller) {
    console.error(`[scrollToCalendarDate] Scroller element not found in calendar container "${widgetId}".`);
    return;
  }

  const scrollOffset = calculateScrollOffset(scroller, targetSlot);
  
  scroller.scrollTo({
    left: scrollOffset,
    behavior: smooth ? 'smooth' : 'auto'
  });
}

/**
 * Defensive check to find the FullCalendar wrapper container by Widget ID.
 * Supports partial matching to deal with OutSystems dynamic runtime prefixing/suffixing.
 */
function findCalendarContainer(widgetId) {
  if (!widgetId) {
    console.error("[scrollToCalendarDate] Invalid Widget ID provided.");
    return null;
  }
  
  // Try exact ID match first
  let container = document.getElementById(widgetId);
  if (container) return container;

  // Fallback to substring matching (useful for dynamic OutSystems ID variables)
  return document.querySelector(`[id*="${widgetId}"]`) || document.querySelector(`.fc`);
}

/**
 * Detects the active view class/type from the calendar container.
 */
function getActiveViewType(container) {
  // Check common FullCalendar view classes
  if (container.querySelector('.fc-resourceTimelineYears-view')) {
    return 'resourceTimelineYears';
  }
  if (container.querySelector('.fc-resourceTimelineMonth-view')) {
    return 'resourceTimelineMonth';
  }

  // Fallback: check classes on any active .fc-view element
  const activeViewEl = container.querySelector('.fc-view');
  if (activeViewEl) {
    const classes = Array.from(activeViewEl.classList);
    const matchedClass = classes.find(cls => cls.includes('Timeline'));
    if (matchedClass) {
      return matchedClass.replace('-view', '');
    }
  }
  return 'resourceTimelineMonth'; // Default fallback
}

/**
 * Derives the exact ISO date string (YYYY-MM-DD) target for horizontal alignment.
 */
function getTargetDateString(viewType, year, month) {
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
  const todayDate = String(today.getDate()).padStart(2, '0');

  const selectedYear = parseInt(year || todayYear, 10);
  const selectedMonth = String(month || todayMonth).padStart(2, '0');

  // Year View (displays monthly slots): Scroll to today's current month if year matches, otherwise Jan 1st.
  if (viewType.includes('Years')) {
    return selectedYear === todayYear 
      ? `${todayYear}-${todayMonth}-01` 
      : `${selectedYear}-01-01`;
  }

  // Month View (displays daily slots): Scroll to today's date if month/year matches, otherwise month's 1st day.
  if (selectedYear === todayYear && selectedMonth === todayMonth) {
    return `${todayYear}-${todayMonth}-${todayDate}`;
  }
  return `${selectedYear}-${selectedMonth}-01`;
}

/**
 * Locates the principal horizontal scroller element responsible for horizontal slot translation.
 */
function findHorizontalScroller(container) {
  // Method 1: Find scroller via timeline body component
  const timelineBody = container.querySelector('.fc-timeline-body');
  if (timelineBody) {
    const scroller = timelineBody.closest('.fc-scroller');
    if (scroller) return scroller;
  }

  // Method 2: Fallback to any visible absolute scroller inside the calendar
  const scroller = container.querySelector('.fc-scroller-liquid-absolute') || container.querySelector('.fc-scroller');
  return scroller || null;
}

/**
 * Calculates absolute scrollLeft target using bounding client rects.
 * 100% resilient to CSS layout transformations, offsetParent overrides, and custom frameworks.
 */
function calculateScrollOffset(scroller, targetSlot) {
  if (!targetSlot) return 0; // Return start of scroll if target date slot doesn't exist in current range

  const slotRect = targetSlot.getBoundingClientRect();
  const scrollerRect = scroller.getBoundingClientRect();
  
  // Mathematical offset: slot absolute X minus scroller absolute X, adjusted by current scroll progress
  return slotRect.left - scrollerRect.left + scroller.scrollLeft;
}

