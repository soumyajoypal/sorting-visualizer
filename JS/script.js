import { getMergeSortAnimations } from "./mergeSort.js";
import { getQuickSortAnimations } from "./quickSort.js";

// Global Variables
const displayArea = document.querySelector(".display-area");
let array = [];
const generateBtn = document.querySelector(".generate-btn");
const bubbleSortBtn = document.querySelector(".bubble-sort-btn");
const selectionSortBtn = document.querySelector(".selection-sort-btn");
const insertionSortBtn = document.querySelector(".insertion-sort-btn");
const mergeSortBtn = document.querySelector(".merge-sort-btn");
const quickSortBtn = document.querySelector(".quick-sort-btn");
const sizeInput = document.getElementById("size-input");
const speedInput = document.getElementById("speed-input");

let size = 40;
let speed = 40;
let toggle = false;
let sortingInProgress = false;

// Input Ranges
sizeInput.addEventListener("change", (e) => {
  size = e.target.value;
  sortingInProgress = false;
  pushElements();
});
speedInput.addEventListener("change", (e) => {
  speed = 80 - e.target.value;
});

// event listener to the generate button
generateBtn.addEventListener("click", () => {
  sortingInProgress = false;
  pushElements();
});

// Pushing 100 elements to the array using a function
function randomInteger() {
  return Math.floor(Math.random() * 101);
}

function pushElements() {
  toggle = false;
  let newArray = [];
  let n = size;
  for (let i = 0; i < n; i++) {
    let rand = randomInteger();
    newArray.push(rand);
  }
  array = newArray;
  generateBars();
}

// Function to generate the visualizing bars
function generateBars() {
  displayArea.innerHTML = ``;
  array.forEach((item, index) => {
    let heightBar = Math.floor(item * 3.5);
    displayArea.innerHTML += `
    <div class="bar" data-bar-number="${index}" style="height:${heightBar}px" data-bar-value="${heightBar}"></div>
    `;
  });
}

// Swapping two elements
function swapElements(el1, el2) {
  const val1 = el1.dataset.barValue;
  const val2 = el2.dataset.barValue;

  el1.dataset.barValue = val2;
  el2.dataset.barValue = val1;

  el1.style.height = val2 + "px";
  el2.style.height = val1 + "px";
}

function getBarArray() {
  return document.querySelectorAll(".bar");
}

async function bubbleSortAlgorithm() {
  sortingInProgress = true;
  const arr = getBarArray();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    if (!sortingInProgress) {
      break;
    }
    for (let j = 0; j < n - i - 1; j++) {
      const el1 = arr[j];
      const el2 = arr[j + 1];
      const val1 = parseInt(el1.dataset.barValue);
      const val2 = parseInt(el2.dataset.barValue);
      el1.style.background = "red";
      el2.style.background = "red";
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (!sortingInProgress) {
        break;
      }
      if (val1 > val2) {
        swapElements(el1, el2);
      }
      el1.style.background = "yellow";
      el2.style.background = "yellow";
    }
    arr[n - i - 1].style.background = "green";
  }
  arr[0].style.background = "green";
  sortingInProgress = false;
  bubbleSortBtn.classList.remove("active");
}

async function selectionSort() {
  sortingInProgress = true;
  const arr = getBarArray();
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    if (!sortingInProgress) {
      break;
    }
    let min = i;
    for (let j = i + 1; j < n; j++) {
      let el2 = arr[j];
      let val2 = parseInt(el2.dataset.barValue);
      el2.style.background = "blue";
      let el1 = arr[min];
      let val1 = parseInt(el1.dataset.barValue);
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (!sortingInProgress) {
        break;
      }
      if (val2 < val1) {
        min = j;
      }
      el2.style.background = "yellow";
    }
    if (min !== i) {
      let el2 = arr[min];
      let el1 = arr[i];
      el1.style.background = "red";
      el2.style.background = "red";
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (!sortingInProgress) {
        break;
      }
      swapElements(el1, el2);
      el1.style.background = "yellow";
      el2.style.background = "yellow";
    }
    arr[i].style.background = "green";
  }
  arr[n - 1].style.background = "green";
  sortingInProgress = false;
  selectionSortBtn.classList.remove("active");
}

async function colorGreen(arr) {
  if (toggle === true) {
    for (const bar of arr) {
      bar.style.background = "green";
      if (arr.length < 200) {
        await new Promise((resolve) => setTimeout(resolve, 10));
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5));
      }
    }
  }
}

async function insertionSort() {
  sortingInProgress = true;
  const arr = getBarArray();
  let n = arr.length;

  for (let i = 1; i < n; i++) {
    if (!sortingInProgress) {
      break;
    }
    let j = i - 1;
    let el = arr[i];
    let val = parseInt(el.dataset.barValue);
    el.style.background = "blue";
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (!sortingInProgress) {
      break;
    }
    while (j >= 0 && parseInt(arr[j].dataset.barValue) > val) {
      arr[j + 1].style.background = "red";
      arr[j].style.background = "red";
      arr[j + 1].style.height = parseInt(arr[j].dataset.barValue) + "px";
      arr[j + 1].dataset.barValue = parseInt(arr[j].dataset.barValue);
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (!sortingInProgress) {
        break;
      }
      arr[j + 1].style.background = "yellow";
      arr[j].style.background = "yellow";
      j--;
    }
    arr[j + 1].style.height = val + "px";
    arr[j + 1].dataset.barValue = val;
    arr[j + 1].style.background = "green";
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (!sortingInProgress) {
      break;
    }
    arr[j + 1].style.background = "yellow";
    arr[i].style.background = "yellow";
  }
  colorGreen(arr);
  sortingInProgress = false;
  insertionSortBtn.classList.remove("active");
}

async function mergeSort() {
  sortingInProgress = true;
  let heightArray = Array.from(getBarArray()).map((item) => {
    return parseInt(item.dataset.barValue);
  });
  let animations = getMergeSortAnimations(heightArray);
  for (let i = 0; i < animations.length; i++) {
    if (!sortingInProgress) {
      break;
    }
    let visualBars = document.getElementsByClassName("bar");
    const animation = animations[i];
    const isColorChange = i % 3 !== 2;
    if (isColorChange) {
      const [barIndx1, barIndx2] = animation;
      const color = i % 3 === 0 ? "red" : "yellow";
      await new Promise((resolve) => setTimeout(resolve, speed));
      if (!sortingInProgress) {
        break;
      }
      visualBars[barIndx1].style.background = color;
      visualBars[barIndx2].style.background = color;
    } else {
      const [barInd, newHeight] = animation;
      visualBars[barInd].style.height = `${newHeight}px`;
      visualBars[barInd].dataset.barValue = newHeight;
    }
  }
  colorGreen(document.getElementsByClassName("bar"));
  sortingInProgress = false;
  mergeSortBtn.classList.remove("active");
}

async function quickSort() {
  sortingInProgress = true;
  let heightArray = Array.from(getBarArray()).map((item) => {
    return parseInt(item.dataset.barValue);
  });
  let animations = getQuickSortAnimations(heightArray);
  for (let i = 0; i < animations.length; i++) {
    if (!sortingInProgress) {
      break;
    }
    let visualBars = document.getElementsByClassName("bar");
    const [barIndx1, barIndx2] = animations[i];
    let bar1 = visualBars[barIndx1];
    let bar2 = visualBars[barIndx2];
    bar1.style.background = "red";
    bar2.style.background = "red";
    await new Promise((resolve) => setTimeout(resolve, speed));
    if (!sortingInProgress) {
      break;
    }
    swapElements(bar1, bar2);
    bar1.style.background = "yellow";
    bar2.style.background = "yellow";
  }
  colorGreen(document.getElementsByClassName("bar"));
  sortingInProgress = false;
  quickSortBtn.classList.remove("active");
}

pushElements();
bubbleSortBtn.addEventListener("click", () => {
  if (!toggle) {
    bubbleSortBtn.classList.add("active");
    bubbleSortAlgorithm();
    toggle = true;
  }
});
selectionSortBtn.addEventListener("click", () => {
  if (!toggle) {
    selectionSortBtn.classList.add("active");
    selectionSort();
    toggle = true;
  }
});
insertionSortBtn.addEventListener("click", () => {
  if (!toggle) {
    insertionSortBtn.classList.add("active");
    insertionSort();
    toggle = true;
  }
});

mergeSortBtn.addEventListener("click", () => {
  if (!toggle) {
    mergeSortBtn.classList.add("active");
    toggle = true;
    mergeSort();
  }
});
quickSortBtn.addEventListener("click", () => {
  if (!toggle) {
    quickSortBtn.classList.add("active");
    toggle = true;
    quickSort();
  }
});
