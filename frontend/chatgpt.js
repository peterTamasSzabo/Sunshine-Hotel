/* chatGPT junior válasza array-method nélkül 

function longestString(inputArray) {
  if (inputArray.length === 0) {
    return null; // Handle the case of an empty array
  }

  let longest = inputArray[0]; // Initialize longest with the first string

  for (let i = 1; i < inputArray.length; i++) {
    if (inputArray[i].length > longest.length) {
      longest = inputArray[i]; // Update longest if a longer string is found
    }
  }

  return longest;
}

const inputArray = ["alma", "körte", "vilmoskörte", "barack"];
console.log(longestString(inputArray));

*/




/*
  legprofibb válasz ez lenne egy seniortól

const inputArray = ["alma", "körte", "vilmoskörte", "barack"];

function longestString(inputArray) {
  return inputArray.reduce((longest, current) => (current.length > longest.length) ? current : longest, "");
}

console.log(longestString(inputArray));

vagy olvashatóbban ugyanez:

const inputArray = ["alma", "körte", "vilmoskörte", "barack"];
function longestString(inputArray) {
  return inputArray.reduce(function (longest, current) {
    if (current.length > longest.length) {
      return current;
    } else {
      return longest;
    }
  }, "");
}

console.log(longestString(inputArray));

*/