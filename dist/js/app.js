document.getElementById("loan-form").addEventListener("submit", function(e) {
  document.querySelector(".result-container").style.display = "none";
  document.querySelector(".load").style.display = "block";

  setTimeout(calculateResult, 1000);
  e.preventDefault();
});

function calculateResult() {
  //get values

  const amount = document.querySelector("#loan");
  const interest = document.querySelector("#interest");
  const years = document.querySelector("#years");

  const montlyPayment = document.querySelector("#montly");
  const totalPayment = document.querySelector("#total-payment");
  const totalInterest = document.querySelector("#total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  //computer montly payment

  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    montlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);
    document.querySelector(".load").style.display = "none";
    document.querySelector(".result-container").style.display = "block";
  } else {
    showError("Please Check the Numbers");
    document.querySelector(".load").style.display = "none";
  }
}

function showError(error) {
  const errorDiv = document.createElement("div");
  errorDiv.appendChild(document.createTextNode(error));
  errorDiv.className = "error";

  const card = document.querySelector(".card");
  const heading = document.querySelector("#main-title");

  card.insertBefore(errorDiv, heading);

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".error").remove();
}
