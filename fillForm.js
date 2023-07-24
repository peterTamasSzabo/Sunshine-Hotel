javascript: (() => {
  let firstNameInput = document.getElementById("firstName");
  let lastNameInput = document.getElementById("lastName");
  let numberOfGuestsInput = document.getElementById("numberOfGuests");
  let dateOfArrivalInput = document.getElementById("dateOfArrival");
  let dateOfDepartureInput = document.getElementById("dateOfDeparture");
  let formRoomInput = document.getElementById("formRoom");
  let commentInput = document.getElementById("comment");
  let inputEvent = new Event('input');
  let changeEvent = new Event('change');

  firstNameInput.value = "Béla";
  lastName.value = "Király";
  numberOfGuests.value = 3;
  dateOfArrival.value = "2023-08-03";
  dateOfDeparture.value = "2023-08-11";
  formRoom.value = 3;
  comment.value = "abc";

  firstNameInput.dispatchEvent(inputEvent);
  lastNameInput.dispatchEvent(inputEvent);
  numberOfGuestsInput.dispatchEvent(changeEvent);
  dateOfArrivalInput.dispatchEvent(inputEvent);
  dateOfDepartureInput.dispatchEvent(inputEvent);
  formRoomInput.dispatchEvent(changeEvent);
  commentInput.dispatchEvent(inputEvent);
})();