export function getMergeSortAnimations(arr) {
  const animations = [];
  if (arr.length <= 1) return arr;
  const temp = arr.slice();
  mergeSort(arr, 0, arr.length - 1, temp, animations);
  return animations;
}

function mergeSort(mainArray, si, ei, temp, animations) {
  if (si === ei) return;
  const mid = Math.floor((si + ei) / 2);
  mergeSort(temp, si, mid, mainArray, animations);
  mergeSort(temp, mid + 1, ei, mainArray, animations);
  Merge(mainArray, si, mid, ei, temp, animations);
}

function Merge(mainArray, si, mid, ei, temp, animations) {
  let k = si;
  let i = si;
  let j = mid + 1;
  while (i <= mid && j <= ei) {
    animations.push([i, j]);
    animations.push([i, j]);
    if (temp[i] <= temp[j]) {
      animations.push([k, temp[i]]);
      mainArray[k++] = temp[i++];
    } else {
      animations.push([k, temp[j]]);
      mainArray[k++] = temp[j++];
    }
  }
  while (i <= mid) {
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, temp[i]]);
    mainArray[k++] = temp[i++];
  }
  while (j <= ei) {
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, temp[j]]);
    mainArray[k++] = temp[j++];
  }
}
