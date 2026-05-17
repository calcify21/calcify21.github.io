/**
 * CALCIFY CUSTOM COMPONENTS - custom-components.js
 * High-performance, premium UI components for Calcify.
 */

class CustomComponents {
  constructor() {
    this.dateFormat = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    this.init();

    // Listen for global theme changes to potentially update components
    document.addEventListener("themeChanged", () => this.refreshComponents());
  }

  init() {
    this.initDropdowns();
    this.initDatePickers();

    // Handle clicks outside of components to close them
    document.addEventListener("click", (e) => {
      this.closeAll(e);
    });

    // Observer for dynamically added elements (like navbar)
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          this.initDropdowns();
          this.initDatePickers();
        }
      });
    });

    observer.observe(document.body, { childList: true, subtree: true });
  }

  closeAll(exceptionEvent) {
    // Close Dropdowns
    document
      .querySelectorAll(".custom-select-wrapper.open")
      .forEach((dropdown) => {
        if (!dropdown.contains(exceptionEvent.target)) {
          dropdown.classList.remove("open");
        }
      });

    // Close DatePickers
    document
      .querySelectorAll(".custom-datepicker-wrapper.open")
      .forEach((picker) => {
        if (!picker.contains(exceptionEvent.target)) {
          picker.classList.remove("open");
        }
      });
  }

  /* ───────────────── DROPDOWNS ───────────────── */

  initDropdowns() {
    const selects = document.querySelectorAll("select:not(.processed-custom)");
    selects.forEach((select) => {
      this.createCustomDropdown(select);
    });
  }

  createCustomDropdown(nativeSelect) {
    if (nativeSelect.classList.contains("processed-custom")) return;

    // Create wrapper
    const wrapper = document.createElement("div");
    wrapper.className = "custom-select-wrapper";
    if (nativeSelect.className)
      wrapper.classList.add(...nativeSelect.classList);
    wrapper.classList.remove("form-control", "form-select", "select-custom");

    // Create trigger
    const trigger = document.createElement("div");
    trigger.className = "custom-select-trigger";

    const selectedText =
      nativeSelect.options[nativeSelect.selectedIndex]?.text || "Select...";
    trigger.innerHTML = `<span>${selectedText}</span><i class="fa-solid fa-chevron-down"></i>`;

    // Create options container
    const optionsContainer = document.createElement("div");
    optionsContainer.className = "custom-options";

    Array.from(nativeSelect.options).forEach((option) => {
      const customOption = document.createElement("div");
      customOption.className = "custom-option";
      if (option.selected) customOption.classList.add("selected");
      customOption.innerHTML = `<span>${option.text}</span>`;
      customOption.dataset.value = option.value;

      customOption.addEventListener("click", () => {
        nativeSelect.value = option.value;
        nativeSelect.dispatchEvent(new Event("change"));

        trigger.querySelector("span").innerText = option.text;

        optionsContainer
          .querySelectorAll(".custom-option")
          .forEach((opt) => opt.classList.remove("selected"));
        customOption.classList.add("selected");

        wrapper.classList.remove("open");
      });

      optionsContainer.appendChild(customOption);
    });

    // Toggle dropdown
    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains("open");
      this.closeAll({ target: null }); // Close others first
      if (!isOpen) wrapper.classList.add("open");
    });

    // Hide native but keep it functional
    nativeSelect.classList.add("processed-custom");
    nativeSelect.style.display = "none";
    nativeSelect.parentNode.insertBefore(wrapper, nativeSelect);
    wrapper.appendChild(trigger);
    wrapper.appendChild(optionsContainer);
    wrapper.appendChild(nativeSelect); // Move it inside wrapper
  }

  /* ───────────────── DATE PICKERS ───────────────── */

  initDatePickers() {
    const dateInputs = document.querySelectorAll(
      'input[type="date"]:not(.processed-custom)',
    );
    dateInputs.forEach((input) => {
      this.createCustomDatePicker(input);
    });
  }

  createCustomDatePicker(nativeInput) {
    if (nativeInput.classList.contains("processed-custom")) return;

    const wrapper = document.createElement("div");
    wrapper.className = "custom-datepicker-wrapper";
    if (nativeInput.className) wrapper.classList.add(...nativeInput.classList);
    wrapper.classList.remove("form-control");

    const trigger = document.createElement("div");
    trigger.className = "custom-datepicker-trigger";

    const initialValue = nativeInput.value
      ? new Date(nativeInput.value).toLocaleDateString(
          undefined,
          this.dateFormat,
        )
      : "Pick a Date";
    trigger.innerHTML = `<i class="fa-solid fa-calendar-alt"></i><span>${initialValue}</span>`;

    const calendar = document.createElement("div");
    calendar.className = "datepicker-calendar";

    // Local state for calendar navigation
    let currentNavDate = nativeInput.value
      ? new Date(nativeInput.value)
      : new Date();
    let selectedDate = nativeInput.value ? new Date(nativeInput.value) : null;

    const renderCalendar = () => {
      const year = currentNavDate.getFullYear();
      const month = currentNavDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthName = currentNavDate.toLocaleString("default", {
        month: "long",
      });

      calendar.innerHTML = `
        <div class="datepicker-header">
          <button class="calendar-nav-btn prev"><i class="fa-solid fa-chevron-left"></i></button>
          <div class="current-month-year">${monthName} ${year}</div>
          <button class="calendar-nav-btn next"><i class="fa-solid fa-chevron-right"></i></button>
        </div>
        <div class="calendar-grid">
          <div class="weekday">Su</div><div class="weekday">Mo</div><div class="weekday">Tu</div>
          <div class="weekday">We</div><div class="weekday">Th</div><div class="weekday">Fr</div>
          <div class="weekday">Sa</div>
        </div>
      `;

      const grid = calendar.querySelector(".calendar-grid");

      // Empty spaces for first day
      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement("div");
        empty.className = "calendar-day empty";
        grid.appendChild(empty);
      }

      // Day numbers
      const today = new Date();
      for (let d = 1; d <= daysInMonth; d++) {
        const dayEl = document.createElement("div");
        dayEl.className = "calendar-day";
        dayEl.innerText = d;

        const thisDate = new Date(year, month, d);
        if (
          selectedDate &&
          thisDate.toDateString() === selectedDate.toDateString()
        )
          dayEl.classList.add("selected");
        if (thisDate.toDateString() === today.toDateString())
          dayEl.classList.add("today");

        dayEl.addEventListener("click", () => {
          selectedDate = thisDate;
          const isoValue = thisDate.toISOString().split("T")[0];
          nativeInput.value = isoValue;
          nativeInput.dispatchEvent(new Event("change"));

          trigger.querySelector("span").innerText = thisDate.toLocaleDateString(
            undefined,
            this.dateFormat,
          );
          wrapper.classList.remove("open");
          renderCalendar();
        });

        grid.appendChild(dayEl);
      }

      // Add navigation listeners
      calendar.querySelector(".prev").onclick = (e) => {
        e.stopPropagation();
        currentNavDate = new Date(year, month - 1, 1);
        renderCalendar();
      };
      calendar.querySelector(".next").onclick = (e) => {
        e.stopPropagation();
        currentNavDate = new Date(year, month + 1, 1);
        renderCalendar();
      };
    };

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains("open");
      this.closeAll({ target: null });
      if (!isOpen) {
        wrapper.classList.add("open");
        renderCalendar();
      }
    });

    nativeInput.classList.add("processed-custom");
    nativeInput.style.display = "none";
    nativeInput.parentNode.insertBefore(wrapper, nativeInput);
    wrapper.appendChild(trigger);
    wrapper.appendChild(calendar);
    wrapper.appendChild(nativeInput);
  }

  refreshComponents() {
    // This can be used to re-render if themes significantly change layout/color
  }
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
  window.CalcifyComponents = new CustomComponents();
});
