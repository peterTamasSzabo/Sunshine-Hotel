javascript: (() => {
  let firstNameInput = document.getElementById("firstName");
  let inputEvent = new Event('input');
  let lastNameInput = document.getElementById("lastName");
  let changeEvent = new Event('change');
  let headCountInput = document.getElementById("headCount");
  let startDateInput = document.getElementById("startDate");
  let endDateInput = document.getElementById("endDate");
  let formRoomListInput = document.getElementById("formRoomList");
  let commentInput = document.getElementById("comment");

  firstNameInput.value = "Béla";
  lastName.value = "Király";
  headCount.value = 3;
  startDate.value = "2023-08-03";
  endDate.value = "2023-08-11";
  formRoomList.value = 3;
  comment.value = "abc";

  firstNameInput.dispatchEvent(inputEvent);
  lastNameInput.dispatchEvent(inputEvent);
  headCountInput.dispatchEvent(changeEvent);
  startDateInput.dispatchEvent(inputEvent);
  endDateInput.dispatchEvent(inputEvent);
  formRoomListInput.dispatchEvent(changeEvent);
  commentInput.dispatchEvent(inputEvent);
})();