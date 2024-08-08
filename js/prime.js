function checkPrime() {
  let num = document.getElementById("number").value;
  let result = document.getElementById("result");
  result.style.display = "block";

  if (num == "") {
    result.classList.remove("alert-success");
    result.classList.add("alert-danger");
    result.textContent =
      "Please enter a number to check for prime or composite.";
  } else if (num <= 1) {
    result.classList.add("alert-success");
    result.classList.remove("alert-danger");
    result.textContent = `${num} is neither prime nor composite.`;
  } else if (num == 2) {
    result.classList.add("alert-success");
    result.classList.remove("alert-danger");
    result.textContent = `${num} is a prime number.`;
  } else if (num > 2) {
    result.classList.add("alert-success");
    result.classList.remove("alert-danger");
    for (let i = 2; i < num; i++) {
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

const toastTrigger = document.getElementById('reset1')
const toastLiveExample = document.getElementById('liveToast')

if (toastTrigger) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
  toastTrigger.addEventListener('click', () => {
    toastBootstrap.show()
  })
}