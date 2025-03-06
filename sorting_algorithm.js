function bubbleSort(arr) {
    let moves = [];
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                moves.push({ indices: [j, j + 1], swap: true });
            } else {
                moves.push({ indices: [j, j + 1], swap: false });
            }
        }
    }
    return moves;
}

function selectionSort(arr) {
    let moves = [];
    for (let i = 0; i < arr.length - 1; i++) {
        let minIndex = i;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            moves.push({ indices: [i, minIndex], swap: true });
        }
    }
    return moves;
}

function insertionSort(arr) {
    let moves = [];
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            moves.push({ indices: [j, j + 1], swap: true });
            j--;
        }
        arr[j + 1] = key;
    }
    return moves;
}

function quickSort(arr, low = 0, high = arr.length - 1, moves = []) {
    if (low < high) {
        let pivot = partition(arr, low, high, moves);
        quickSort(arr, low, pivot - 1, moves);
        quickSort(arr, pivot + 1, high, moves);
    }
    return moves;
}

function partition(arr, low, high, moves) {
    let pivot = arr[high];
    let i = low;
    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
            moves.push({ indices: [i, j], swap: true });
            i++;
        }
    }
    [arr[i], arr[high]] = [arr[high], arr[i]];
    moves.push({ indices: [i, high], swap: true });
    return i;
}

function mergeSort(arr, left = 0, right = arr.length - 1, moves = []) {
    if (left < right) {
        let mid = Math.floor((left + right) / 2);
        mergeSort(arr, left, mid, moves);
        mergeSort(arr, mid + 1, right, moves);
        merge(arr, left, mid, right, moves);
    }
    return moves;
}

function merge(arr, left, mid, right, moves) {
    let leftArr = arr.slice(left, mid + 1);
    let rightArr = arr.slice(mid + 1, right + 1);
    let i = 0, j = 0, k = left;

    while (i < leftArr.length && j < rightArr.length) {
        if (leftArr[i] <= rightArr[j]) {
            arr[k] = leftArr[i];
            moves.push({ indices: [k, left + i], swap: true });
            i++;
        } else {
            arr[k] = rightArr[j];
            moves.push({ indices: [k, mid + 1 + j], swap: true });
            j++;
        }
        k++;
    }

    while (i < leftArr.length) {
        arr[k] = leftArr[i];
        moves.push({ indices: [k, left + i], swap: true });
        i++;
        k++;
    }

    while (j < rightArr.length) {
        arr[k] = rightArr[j];
        moves.push({ indices: [k, mid + 1 + j], swap: true });
        j++;
        k++;
    }
}
