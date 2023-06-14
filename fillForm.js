javascript: (() => {
  let firstNameInput = document.getElementById("firstName");
  firstNameInput.value = "Béla";
  let blurEvent = new Event('focusout');
  firstNameInput.dispatchEvent(blurEvent);
  let lastNameInput = document.getElementById("lastName");
  lastName.value = "Király";
  let headCountInput = document.getElementById("headCount");
  headCount.value = "3";
  let startDateInput = document.getElementById("startDate");
  startDate.value = "2023-08-03";
  let endDateInput = document.getElementById("endDate");
  endDate.value = "2023-08-11";
})();



