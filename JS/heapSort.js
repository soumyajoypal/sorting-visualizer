function heapify(arr, n, i, animations) {
  let max = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;

  if (left < n && arr[left] > arr[max]) {
    max = left;
  }

  if (right < n && arr[right] > arr[max]) {
    max = right;
  }

  if (max !== i) {
    animations.push([max, i]); 
    let temp = arr[i];
    arr[i] = arr[max];
    arr[max] = temp;
    heapify(arr, n, max, animations);
  }
}

function heapSort(arr, animations) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, animations);
  }

  for (let i = n - 1; i > 0; i--) {
    animations.push([i, 0]); 
    let temp = arr[i];
    arr[i] = arr[0];
    arr[0] = temp;
    heapify(arr, i, 0, animations);
  }
}

function getHeapSortAnimations(arr) {
  if (arr.length <= 1) {
    return [];
  }
  let animations = [];
  heapSort(arr, animations);
  return animations;
}

export { getHeapSortAnimations };
