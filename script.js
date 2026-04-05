const arrayContainer = document.getElementById('array-container');
const generateBtn = document.getElementById('generate');
const sortBtn = document.getElementById('sort');
const algorithmSelect = document.getElementById('algorithm');
const speedInput = document.getElementById('speed');

let array = [];
let speed = 250;

// Generate a random array
function generateArray(size = 30) {
  array = [];
  arrayContainer.innerHTML = '';
  for (let i = 0; i < size; i++) {
    const value = Math.floor(Math.random() * 300) + 10;
    array.push(value);
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${value}px`;
    arrayContainer.appendChild(bar);
  }
}

// Sleep function for animation
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Swap function for bars
async function swap(i, j) {
  const bars = document.querySelectorAll('.bar');
  bars[i].style.height = `${array[j]}px`;
  bars[j].style.height = `${array[i]}px`;
  [array[i], array[j]] = [array[j], array[i]];
  bars[i].classList.add('active');
  bars[j].classList.add('active');
  await sleep(speed);
  bars[i].classList.remove('active');
  bars[j].classList.remove('active');
}

// Bubble Sort
async function bubbleSort() {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      if (array[j] > array[j + 1]) await swap(j, j + 1);
    }
  }
}

// Selection Sort
async function selectionSort() {
  for (let i = 0; i < array.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[minIndex]) minIndex = j;
    }
    if (minIndex !== i) await swap(i, minIndex);
  }
}

// Insertion Sort
async function insertionSort() {
  for (let i = 1; i < array.length; i++) {
    let j = i;
    while (j > 0 && array[j] < array[j - 1]) {
      await swap(j, j - 1);
      j--;
    }
  }
}

// Merge Sort
async function mergeSort(start = 0, end = array.length - 1) {
  if (start >= end) return;
  const mid = Math.floor((start + end) / 2);
  await mergeSort(start, mid);
  await mergeSort(mid + 1, end);
  await merge(start, mid, end);
}

async function merge(start, mid, end) {
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;
  const bars = document.querySelectorAll('.bar');

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) array[k] = left[i++];
    else array[k] = right[j++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].classList.add('active');
    await sleep(speed);
    bars[k].classList.remove('active');
    k++;
  }

  while (i < left.length) {
    array[k] = left[i++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].classList.add('active');
    await sleep(speed);
    bars[k].classList.remove('active');
    k++;
  }

  while (j < right.length) {
    array[k] = right[j++];
    bars[k].style.height = `${array[k]}px`;
    bars[k].classList.add('active');
    await sleep(speed);
    bars[k].classList.remove('active');
    k++;
  }
}

// Quick Sort
async function quickSort(low = 0, high = array.length - 1) {
  if (low < high) {
    const pi = await partition(low, high);
    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
}

async function partition(low, high) {
  let pivot = array[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (array[j] < pivot) {
      i++;
      await swap(i, j);
    }
  }
  await swap(i + 1, high);
  return i + 1;
}

// Event listeners
generateBtn.addEventListener('click', () => generateArray());
sortBtn.addEventListener('click', async () => {
  speed = parseInt(speedInput.value);
  switch (algorithmSelect.value) {
    case 'bubble': await bubbleSort(); break;
    case 'selection': await selectionSort(); break;
    case 'insertion': await insertionSort(); break;
    case 'merge': await mergeSort(); break;
    case 'quick': await quickSort(); break;
  }
});

// Initial array
generateArray();