export function getQuickSortAnimations(arr) {
  let animations = [];
  if (arr.length <= 1) return arr;
  quickSort(arr, 0, arr.length - 1, animations);
  return animations;
}

function quickSort(mainArray, si, ei, animations) {
  if (si >= ei) return;
  let pivotInd = getPivot(si, ei, mainArray, animations);
  quickSort(mainArray, si, pivotInd - 1, animations);
  quickSort(mainArray, pivotInd + 1, ei, animations);
}

function getPivot(si, ei, mainArray, animations) {
  let j = si - 1;
  let pvt = mainArray[ei];
  for (let i = si; i < ei; i++) {
    if (mainArray[i] <= pvt) {
      j++;
      //   elements to be swapped
      animations.push([i, j]);
      let temp = mainArray[i];
      mainArray[i] = mainArray[j];
      mainArray[j] = temp;
    }
  }
  animations.push([j + 1, ei]);
  let temp = mainArray[j + 1];
  mainArray[j + 1] = mainArray[ei];
  mainArray[ei] = temp;
  return j + 1;
}
