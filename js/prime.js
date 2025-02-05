function checkPrime() {
  let num = document.getElementById("number").value;
  let result = document.getElementById("result");
  result.style.display = "block";

  // Prevent numbers larger than JavaScript's safe limit
  if (num > Number.MAX_SAFE_INTEGER) {
    result.classList.replace("alert-success", "alert-danger");
    result.textContent = `Please enter a number ≤ ${Number.MAX_SAFE_INTEGER}.`;
  } else if (num == "") {
    result.classList.replace("alert-success", "alert-danger");
    result.textContent = "Please enter a number.";
  } else if (num % 1 !== 0 || num <= 1) {
    result.classList.replace("alert-danger", "alert-success");
    result.textContent = `${num} is neither prime nor composite.`;
  } else if (num == 2) {
    result.classList.replace("alert-danger", "alert-success");
    result.textContent = `${num} is a prime number.`;
  } else if (num > 2) {
    result.classList.replace("alert-danger", "alert-success");
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        ans = `${num} is a composite number. It is divisible by ${i}.`;
        result.textContent = ans;
        break;
      } else {
        result.classList.add("alert-success");
        result.classList.remove("alert-danger");
        result.textContent = num + " is a prime number.";
      }
    }
  }
}

function resetbtn() {
  let result = document.getElementById("result");
  result.style.display = "none";
}

function checkEnter(event) {
  if (event.keyCode == 13) {
    checkPrime();
  }
}

const toastTrigger = document.getElementById('reset1')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}