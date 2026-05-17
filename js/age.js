// ==========================================
// Age Calculator Logic
// ==========================================

function calculateAge() {
  const dobInput = document.getElementById("dob").value;
  const resultArea = document.getElementById("resultArea");

  if (!dobInput) return;

  const dob = new Date(dobInput);
  const now = new Date();

  if (dob > now) {
    alert("Date of birth cannot be in the future!");
    return;
  }

  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    // Get absolute days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonth;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Display results
  document.getElementById("resYears").innerText = years;
  document.getElementById("resMonths").innerText = months;
  document.getElementById("resDays").innerText = days;

  // Fun Facts calculation
  const diffTime = Math.abs(now - dob);
  const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = totalDays * 24;

  document.getElementById("factMonths").innerText =
    totalMonths.toLocaleString();
  document.getElementById("factWeeks").innerText = totalWeeks.toLocaleString();
  document.getElementById("factDays").innerText = totalDays.toLocaleString();
  document.getElementById("factHours").innerText = totalHours.toLocaleString();

  // Next Birthday
  let nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
  if (now > nextBday) {
    nextBday.setFullYear(now.getFullYear() + 1);
  }

  const bdayDiff = nextBday - now;
  const bdayDays = Math.ceil(bdayDiff / (1000 * 60 * 60 * 24));

  const bdayMonths = Math.floor(bdayDays / 30.44); // Simple month approx
  const bdayRemainingDays = Math.floor(bdayDays % 30.44);

  if (bdayDays === 365 || bdayDays === 366 || bdayDays === 0) {
    document.getElementById("nextBdayText").innerText = "Happy Birthday! 🎂";
  } else {
    document.getElementById("nextBdayText").innerText =
      `${bdayMonths} Months and ${bdayRemainingDays} Days to go!`;
  }

  resultArea.classList.remove("hidden");
}

// Set default max date to today
window.onload = () => {
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dob").setAttribute("max", today);
};
