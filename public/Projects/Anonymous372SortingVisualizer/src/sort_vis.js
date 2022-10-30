var nums = 15;
var delay = 50;

var grid = document.getElementById("container");

var arNum = [];
arNum = Array(nums).fill(-1);

var sortingDone = true;

var rangeBar = document.getElementById("rangeBar");
var rangeText = document.getElementById("rangeText");
var setupBox = document.getElementById("box");
var speedBtns = document.querySelectorAll(".speed");
var speeds = [200, 50, 10, 2];

// setup tghe range bar with starting nums value
rangeBar.value = nums;
rangeText.innerText = nums;

// select the medium speed when starts
speedBtns[1].classList.add("selected-speed");

// ******************* Functions ***********************

function initialize() {
  grid.innerHTML = "";

  set_array();
  create_elements();
}

function set_array() {
  for (var i = 0; i < nums; i++) {
    var val = Math.trunc(Math.random() * 100);
    arNum[i] = val;
  }
}

function create_elements() {
  for (var i = 0; i < nums; i++) {
    div = document.createElement("div");
    div.classList.add("nums");
    div.style.height = arNum[i] + "%";
    div.style.width = 60 / nums + "%";

    grid.append(div);
  }
}

// The delay/sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function swap(i, j) {
  [arNum[i], arNum[j]] = [arNum[j], arNum[i]];
}

// Bubble sort
async function bubbleSort() {
  sortingDone = false;
  for (var i = 0; i < nums; i++) {
    for (var j = i + 1; j < nums; j++) {
      show_cur([i, j]);
      if (arNum[i] > arNum[j]) swap(i, j);

      update();
      await sleep(delay);
      show_cur([i, j]);
    }
  }
  sortingDone = true;
}

// Selection Sort
async function selectionSort() {
  sortingDone = false;
  for (var i = 0; i < nums; i++) {
    var curMin = i;
    for (var j = i + 1; j < nums; j++) {
      show_cur([i, j]);
      if (arNum[curMin] > arNum[j]) curMin = j;

      await sleep(delay);
      show_cur([i, j]);
    }
    swap(i, curMin);
    update();
  }
  sortingDone = true;
}
// Insertion Sort
async function insertionSort() {
  sortingDone = false;
  for (var i = 1; i < nums; i++) {
    var j = i - 1;
    var temp = arNum[i];

    if (temp < arNum[j]) {
      while (j >= 0 && temp < arNum[j]) {
        show_cur([j, j + 1]);
        swap(j, j + 1);

        update();
        await sleep(delay);
        show_cur([j, j + 1]);

        j--;
      }
    } else {
      show_cur([j, j + 1]);
      await sleep(delay);
      show_cur([j, j + 1]);
    }
  }
  sortingDone = true;
}

// Merge Sort
async function mergeSort() {
  sortingDone = false;
  await merge_sort(0, nums - 1);
  sortingDone = true;

  // Merge Sort Functions
  async function merge_sort(start, end) {
    if (start === end) return;
    var middle = Math.floor((start + end) / 2);

    await merge_sort(start, middle);
    await merge_sort(middle + 1, end);

    await merge_arrays(start, middle, end);
  }

  async function merge_arrays(start, middle, end) {
    for (var i = start; i <= middle; i++) {
      var j = middle + 1;
      if (arNum[i] > arNum[j]) {
        show_cur([i, j]);

        swap(i, j);

        update();
        await sleep(delay);
        show_cur([i, j]);

        for (var k = j + 1; k <= end; k++) {
          if (arNum[j] > arNum[k]) {
            swap(j, k);
            update();
            j++;
          } 
          else
            break;
        }
      }
    }
  }
}

// Quick Sort
async function quickSort() {
  sortingDone = false;
  await quick_sort(0, nums - 1);
  sortingDone = true;
  console.log("Sorting Done");

  async function partition(start, end) {
    var pivot = arNum[start];
    let left = start + 1;
    show_cur([start]);
    for (let i = left; i <= end; i++) {
      show_cur([i]);
      if (arNum[i] < pivot) {
        show_cur([left]);
        swap(i, left);
        update();
        await sleep(delay);
        show_cur([left]);
        left += 1;
      }
      show_cur([i]);
    }
    show_cur([start]);
    show_cur([left - 1, start]);
    swap(left - 1, start);
    update();
    await sleep(delay);
    show_cur([left - 1, start]);
    return left - 1;
  }
  async function quick_sort(start, end) {
    if (start > end) return;
    var piv_index = await partition(start, end);
    await quick_sort(start, piv_index - 1);
    await quick_sort(piv_index + 1, end);
  }
}

function show_cur(arr) {
  var numbs = document.querySelectorAll(".nums");
  arr.forEach((i) => {
    numbs[i].classList.toggle("cur_num");
  });
}

function update() {
  var numbs = document.querySelectorAll(".nums");
  for (var i = 0; i < nums; i++) {
    numbs[i].style.height = arNum[i] + "%";
  }
}
function hideNseek() {
  nums = rangeBar.value;
  rangeText.innerText = nums;
}

function setSpeed(val) {
  delay = speeds[val];
  for (var i = 0; i < 4; i++)
    if (val == i) speedBtns[i].classList.add("selected-speed");
    else speedBtns[i].classList.remove("selected-speed");
}

// (Working Of Prog **********************************
function generate() {
  if (!sortingDone) return;
  if (setupBox.style.visibility === "visible") return;

  initialize();
}
function sort() {
  if (arNum[0] === -1) return;
  if (!sortingDone) return;
  if (setupBox.style.visibility === "visible") return;

  var algo = document.getElementById("algorithm").value[0];

  switch (algo) {
    case "B":
      bubbleSort();
      break;
    case "S":
      selectionSort();
      break;
    case "I":
      insertionSort();
      break;
    case "M":
      mergeSort();
      break;
    case "Q":
      quickSort();
      break;
  }
}

function showbox() {
  if (!sortingDone) return;
  setupBox.style.visibility = "visible";
}

function startup() {
  setupBox.style.visibility = "hidden";
  generate();
}
