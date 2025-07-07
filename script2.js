const events = [
    { date: '2025-04-12', type: 'online', topic: 'Art' },
    { date: '2025-07-13', type: 'offline', topic: 'Tech' },
    { date: '2025-07-19', type: 'online', topic: 'Music' },
    { date: '2025-08-20', type: 'offline', topic: 'Science' },
    { date: '2025-04-25', type: 'online', topic: 'Art' },
    { date: '2025-04-26', type: 'offline', topic: 'Tech' },
    { date: '2025-04-27', type: 'online', topic: 'Music' },
    { date: '2025-04-28', type: 'offline', topic: 'Science' },
    { date: '2025-06-29', type: 'online', topic: 'Art' },
    // Add an event for today's date (July 7, 2025) for demonstration
    // If you don't have events for today, it will still highlight today
    { date: '2025-07-07', type: 'online', topic: 'Current Day Event' }
];

const calendarGrid = document.getElementById("calendar-grid");
const topicSelect = document.querySelectorAll(".dropdown-select")[0];
const formatSelect = document.querySelectorAll(".dropdown-select")[1];
const resetBtn = document.querySelector(".reset-button");
const calendarHeader = document.querySelector(".calendar-header h3");
const navArrows = document.querySelectorAll(".nav-arrow");



// Keep track of selected month
// Set initial date to current date based on your context (July 7, 2025)
let currentDate = new Date(2025, 6, 7); // July 7, 2025 (months are 0-indexed)
function renderCalendar(filter = {}) {
    calendarGrid.innerHTML = "";

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });

    calendarHeader.textContent = `${monthName} ${year}`;

    // Get today's date
    const today = new Date();
    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth();
    const todayDay = today.getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const event = events.find(
            e =>
                e.date === dateStr &&
                (!filter.format || e.type === filter.format) &&
                (!filter.topic || e.topic === filter.topic)
        );

        const span = document.createElement("span");
        const dayNumber = document.createElement("span");
        dayNumber.classList.add("day-number");
        dayNumber.textContent = day;
        span.appendChild(dayNumber);


        // Check if it's today's date
        if (year === todayYear && month === todayMonth && day === todayDay) {
            span.classList.add("today"); // Add 'today' class for special styling
        }

        if (event) {
            span.classList.add("has-event"); // Add 'has-event' class for full opacity
            // If it's today AND has an event, 'today' class will handle the background and color.
            // If it's not today but has an event, 'has-event' ensures full opacity.

            const dot = document.createElement("span");
            dot.classList.add("dot", event.type === "online" ? "online" : "offline");
            span.appendChild(dot);
        } else {
            // If no event and it's not today's date, apply low opacity
            if (!(year === todayYear && month === todayMonth && day === todayDay)) {
                span.classList.add("no-event"); // Add 'no-event' for lower opacity
            }
        }
        calendarGrid.appendChild(span);
    }
}

function populateTopicDropdown() {
    const uniqueTopics = [...new Set(events.map(e => e.topic))];
    uniqueTopics.forEach(topic => {
        const option = document.createElement("option");
        option.value = topic;
        option.textContent = topic;
        topicSelect.appendChild(option);
    });
}

// Event listeners
topicSelect.addEventListener("change", () => {
    renderCalendar({
        topic: topicSelect.value,
        format: formatSelect.value
    });
});

formatSelect.addEventListener("change", () => {
    renderCalendar({
        topic: topicSelect.value,
        format: formatSelect.value
    });
});

resetBtn.addEventListener("click", () => {
    topicSelect.value = "";
    formatSelect.value = "";
    renderCalendar();
});

// Navigation arrows
navArrows[0].addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar({
        topic: topicSelect.value,
        format: formatSelect.value
    });
});

navArrows[1].addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar({
        topic: topicSelect.value,
        format: formatSelect.value
    });
});

// Init
populateTopicDropdown();
renderCalendar();

document.addEventListener("DOMContentLoaded", function () {
  const playIcon = document.querySelector(".play-icon");
  const video = document.querySelector(".video-wrapper video");

  if (playIcon && video) {
   
    playIcon.addEventListener("click", () => {
      video.play();

      playIcon.style.opacity = "0";
      setTimeout(() => {
        playIcon.style.display = "none";
      }, 300);
    });

  
    video.addEventListener("pause", () => {
      playIcon.style.display = "block";
      setTimeout(() => {
        playIcon.style.opacity = "1";
      }, 10);
    });
  }
});
