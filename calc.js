let l5GradesArr = [[22.5], [22.5], [3.75], [11.25], [16.5], [13.5], [9], [21]];
let l6GradesArr = [[12], [18], [9], [21], [15], [15], [30]];
let sum = 0;
let ind60 = 0;
let ind90 = 0;
let l5SortedGrades = [];
let l6SortedGrades = [];
let l5CredWeight = [];
let l6CredWeight = [];
let level5 = 0;
let level6 = 0;
let diffL5;
let diffL6;
let inputs = [];
let inputsL6 = [];
let valid = false;

function popGrades() {
  document
    .querySelectorAll(".l5-ginput")
    .forEach((item) => (item.value = Math.floor(Math.random() * (77 - 52)) + 52));
  document
    .querySelectorAll(".l6-ginput")
    .forEach((item) => (item.value = Math.floor(Math.random() * (77 - 52)) + 52));
}

function checkInput() {
  inputs = document.querySelectorAll(".l5-ginput");
  for (let k = 0; k < inputs.length; k++) {
    if (!inputs[k].valueAsNumber || inputs[k].valueAsNumber < 0 || inputs[k].valueAsNumber > 100) {
      inputs[k].style.backgroundColor = "#ffcbcb";
      alert("Please input grades for every module");
      valid = false;
      return;
    } else {
      inputs[k].style.backgroundColor = "#ffffff";
      valid = true;
    }
  }
  inputsL6 = document.querySelectorAll(".l6-ginput");
  for (let k = 0; k < inputsL6.length; k++) {
    if (
      !inputsL6[k].valueAsNumber ||
      inputsL6[k].valueAsNumber < 0 ||
      inputsL6[k].valueAsNumber > 100
    ) {
      inputsL6[k].style.backgroundColor = "#ffcbcb";
      // alert("Please make sure there is an input for every grade");
      // inputs = [];
      alert("Please input grades for every module");
      valid = false;
      return;
    } else {
      inputsL6[k].style.backgroundColor = "#ffffff";
      valid = true;
    }
  }
}

function getGrades() {
  document
    .querySelectorAll(".l5-ginput")
    .forEach((item, index) => l5GradesArr[index].push(item.valueAsNumber));
  document
    .querySelectorAll(".l6-ginput")
    .forEach((item, index) => l6GradesArr[index].push(item.valueAsNumber));
}

// Sort the Grades by Percentage Score
function sortGrades() {
  l5SortedGrades = l5GradesArr.sort((a, b) => b[1] - a[1]);

  // Put credit weight into its own array
  for (let i = 0; i < l5SortedGrades.length; i++) {
    l5CredWeight.push(l5SortedGrades[i][0]);
  }

  // Determine the index at which the scores reach 90 credits. By setting the condition to sum < 90, it will include the credits that push it over 90. It must reach AT LEAST 90!
  for (let q = 0; q < l5CredWeight.length && sum < 90; q++) {
    sum += l5CredWeight[q];
    if (sum < 90) {
      // Only add to the index while the sum is under 90
      ind90++;
    }
  }

  // Remove the grades that are outside of the best 90 from the array.
  l5SortedGrades = l5SortedGrades.slice(0, ind90 + 1);

  // Calculate the difference between the credit sum and 90
  diffL5 = sum - 90;

  // Take away the credits of the worst grade until there are exactly 90 credits
  l5SortedGrades[l5SortedGrades.length - 1][0] -= diffL5;
}

function sortLevel6() {
  // Remove + store ringfenced modules
  sum = 0;
  let ccs = l6GradesArr.splice(2, 2);
  console.log(ccs);

  // Sort the remainder
  l6SortedGrades = l6GradesArr.sort((a, b) => b[1] - a[1]);
  // console.log(l6SortedGrades);

  // Credit Weight array
  for (let i = 0; i < l6SortedGrades.length; i++) {
    l6CredWeight.push(l6SortedGrades[i][0]);
  }

  // Find index of 60 credit threshold
  for (let p = 0; p < l6CredWeight.length && sum < 60; p++) {
    sum += l6CredWeight[p];
    if (sum < 60) {
      // Only add to the index while the sum is under 60
      ind60++;
    }
  }

  // Remove the grades that are outside of the best 90 from the array.
  l6SortedGrades = l6SortedGrades.slice(0, ind60 + 1);

  // Calculate the difference between the credit sum and 60
  diffL6 = sum - 60;

  // Take away the credits of the worst grade until there are exactly 60 credits
  l6SortedGrades[l6SortedGrades.length - 1][0] -= diffL6;

  // Add back in compulsory CCS module
  l6SortedGrades.push(ccs[0]);
  l6SortedGrades.push(ccs[1]);
}

// Calculate weighted average - multiply credits by grade, sum them all, divide by 90
const weightedAvg = () => {
  for (let o = 0; o < l5SortedGrades.length; o++) {
    level5 += l5SortedGrades[o][0] * l5SortedGrades[o][1];
  }
  level5 /= 90;
  for (let n = 0; n < l6SortedGrades.length; n++) {
    level6 += l6SortedGrades[n][0] * l6SortedGrades[n][1];
  }

  level6 /= 90;
};

function clearInputs() {
  let ginputs = document.querySelectorAll("input[type=number]");
  for (let j = 0; j < ginputs.length; j++) {
    ginputs[j].value = "";
  }
  return "cleared";
}

function reset() {
  l5GradesArr = [[22.5], [22.5], [3.75], [11.25], [16.5], [13.5], [9], [21]];
  l6GradesArr = [[12], [18], [9], [21], [15], [15], [30]];
  sum = 0;
  ind60 = 0;
  ind90 = 0;
  l5SortedGrades = [];
  l6SortedGrades = [];
  l5CredWeight = [];
  l6CredWeight = [];
  level5 = 0;
  level6 = 0;
  diffL5;
  diffL6;
  inputs = [];
  inputsL6 = [];
  valid = false;
}

// Weight the 2 averaged percentages for the degree classification, return the final percentage and the degree classification

function roundTo(n) {
  return +(Math.round(n + "e+" + 2) + "e-" + 2);
}

const degClass = () => {
  let finalGrade = (level5 *= 0.25) + (level6 *= 0.75);
  if (finalGrade >= 69.5) return roundTo(finalGrade) + "% First Class Honours (1)";
  if (finalGrade >= 59.5 && finalGrade < 69.5)
    return roundTo(finalGrade) + "% Upper Second Class Honours (2.1)";
  if (finalGrade >= 49.5 && finalGrade < 59.5)
    return roundTo(finalGrade) + "% Lower Second Class Honours (2.2)";
  if (finalGrade >= 39.5 && finalGrade < 49.5)
    return roundTo(finalGrade) + "% Third Class Honours (3)";
  if (finalGrade < 39.5) return roundTo(finalGrade) + "% Degree Requirements failed :(";
};

function calcClass() {
  reset();
  checkInput();
  if (valid) {
    getGrades();
    sortGrades();
    sortLevel6();
    weightedAvg();
    console.log("L5 gradesArr: " + l5GradesArr);
    console.log("L6 gradesArr: " + l6GradesArr);
    console.log("L5 sortedGrades: " + l5SortedGrades);
    console.log("L6 sortedGrades: " + l6SortedGrades);
    console.log(degClass());
  }
}
