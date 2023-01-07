let l5GradesArr = [[22.5], [22.5], [3.75], [11.25], [16.5], [13.5], [9], [21]];
let l6GradesArr = [[22.5], [22.5], [3.75], [11.25], [16.5], [13.5], [9], [21]];
let sum = 0;
let ind90 = 0;
let l5SortedGrades = [];
let l6SortedGrades = [];
let l5CredWeight = [];
let l6CredWeight = [];
let level5 = 0;
let level6 = 0;
let diffL5;
let diffL6;

function popGrades() {
  document
    .querySelectorAll(".l5-ginput")
    .forEach((item) => (item.value = Math.floor(Math.random() * (77 - 52)) + 52));
  document
    .querySelectorAll(".l6-ginput")
    .forEach((item) => (item.value = Math.floor(Math.random() * (77 - 52)) + 52));
}

function getGrades() {
  // let gradeNodes = document.querySelectorAll(".ginput");
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
  l6SortedGrades = l6GradesArr.sort((a, b) => b[1] - a[1]);

  // Put credit weight into its own array
  for (let i = 0; i < l5SortedGrades.length; i++) {
    l5CredWeight.push(l5SortedGrades[i][0]);
  }

  for (let i = 0; i < l5SortedGrades.length; i++) {
    l6CredWeight.push(l5SortedGrades[i][0]);
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

  // LEVEL 6
  for (let q = 0; q < l6CredWeight.length && sum < 90; q++) {
    sum += l6CredWeight[q];
    if (sum < 90) {
      // Only add to the index while the sum is under 90
      ind90++;
    }
  }

  l6SortedGrades = l6SortedGrades.slice(0, ind90 + 1);

  diffL6 = sum - 90;

  l6SortedGrades[l6SortedGrades.length - 1][0] -= diffL6;
}

// Calculate weighted average - multiply credits by grade, sum them all, divide by 90
const weightedAvg = () => {
  for (let o = 0; o < l5SortedGrades.length; o++) {
    level5 += l5SortedGrades[o][0] * l5SortedGrades[o][1];
  }
  for (let o = 0; o < l6SortedGrades.length; o++) {
    level6 += l6SortedGrades[o][0] * l6SortedGrades[o][1];
  }
  level5 /= 90;
  level6 /= 90;
  console.log(level5);
  console.log(level6);
};

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
  getGrades();
  sortGrades();
  weightedAvg();
  console.log("L5 gradesArr: " + l5GradesArr);
  console.log("L6 gradesArr: " + l6GradesArr);
  console.log("L5 sortedGrades: " + l5SortedGrades);
  console.log("L6 sortedGrades: " + l6SortedGrades);
  console.log(degClass());
}
