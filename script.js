const events = [
  { date: '2025-04-12', type: 'online', topic: 'Art' },
  { date: '2025-04-13', type: 'offline', topic: 'Tech' },
  { date: '2025-04-19', type: 'online', topic: 'Music' },
  { date: '2025-04-20', type: 'offline', topic: 'Science' },
  { date: '2025-04-25', type: 'online', topic: 'Art' },
  { date: '2025-04-26', type: 'offline', topic: 'Tech' },
  { date: '2025-04-27', type: 'online', topic: 'Music' },
  { date: '2025-04-28', type: 'offline', topic: 'Science' }
];

const calendarGrid = document.getElementById("calendar-grid");
const topicSelect = document.querySelectorAll(".dropdown-select")[0];
const formatSelect = document.querySelectorAll(".dropdown-select")[1];
const resetBtn = document.querySelector(".reset-button");
const daysInApril = 30;

function renderCalendar(filter = {}) {
  calendarGrid.innerHTML = "";

  for (let day = 1; day <= daysInApril; day++) {
    const dateStr = `2025-04-${String(day).padStart(2, '0')}`;
    const event = events.find(
      e =>
        e.date === dateStr &&
        (!filter.format || e.type === filter.format) &&
        (!filter.topic || e.topic === filter.topic)
    );

    const span = document.createElement("span");
    span.textContent = day;

    if (event) {
      span.classList.add("highlighted");

      const dot = document.createElement("span");
      dot.classList.add("dot", event.type === "online" ? "online" : "offline");
      span.appendChild(dot);
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

// Initial setup
populateTopicDropdown();
renderCalendar();
