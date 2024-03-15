const SortingLibrary = (() => {
    // Функція для очистки масиву від пустих елементів
    const clearUndefined = (arr) => {
        return arr.filter(element => element !== undefined);
    };

    // Функція для обміну елементів у масиві
    const swap = (arr, idx1, idx2) => {
        const temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    };

    // Сортування методом обміну (Bubble Sort)
    const bubbleSort = (inputArr, order = 'asc') => {
        let comparisons = 0;
        let swaps = 0;
        let arr = clearUndefined(inputArr);

        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < (arr.length - i - 1); j++) {
                comparisons++;

                if (
                    (order === 'asc' && arr[j] > arr[j + 1]) || 
                    (order === 'desc' && arr[j] < arr[j + 1])
                ) {
                    swaps++;
                    swap(arr, j, j + 1);
                }
            }
        }

        console.log(`${order} | Bubble Sort: Comparisons - ${comparisons}, Swaps - ${swaps}, Undefined - ${inputArr.length - arr.length}`);
        console.log(arr);
    };

    // Сортування методом мінімальних елементів (Selection Sort)
    const selectionSort = (inputArr, order = 'asc') => {
        let comparisons = 0;
        let swaps = 0;
        let arr = clearUndefined(inputArr);

        for (let i = 0; i < arr.length - 1; i++) {
            let minIndex = i;

            for (let j = i + 1; j < arr.length; j++) {
                comparisons++;

                if (
                    (order === 'asc' && arr[j] < arr[minIndex]) || 
                    (order === 'desc' && arr[j] > arr[minIndex])
                ) {
                    minIndex = j;
                }
            }

            if (minIndex !== i) {
                swaps++;
                swap(arr, i, minIndex);
            }
        }

        console.log(`${order} | Selection Sort: Comparisons - ${comparisons}, Swaps - ${swaps}, Undefined - ${inputArr.length - arr.length}`);
        console.log(arr);
    };

    // Сортування методом вставок (Insertion Sort)
    const insertionSort = (inputArr, order = 'asc') => {
        let comparisons = 0;
        let swaps = 0;
        let arr = clearUndefined(inputArr);

        for (let i = 1; i < arr.length; i++) {
            let currentElement = arr[i];
            let lastIndex = i - 1;

            comparisons++;
            while (lastIndex >= 0 && (
                (order === 'asc' && arr[lastIndex] > currentElement) || 
                (order === 'desc' && arr[lastIndex] < currentElement)
            )) {
                comparisons++;
                swaps++;

                arr[lastIndex + 1] = arr[lastIndex];
                lastIndex--;
            }

            arr[lastIndex + 1] = currentElement;
        }

        console.log(`${order} | Insertion Sort: Comparisons - ${comparisons}, Swaps - ${swaps}, Undefined - ${inputArr.length - arr.length}`);
        console.log(arr);
    };

    // Сортування методом Шелла (Shell Sort)
    const shellSort = (inputArr, order = 'asc') => {
        let comparisons = 0;
        let swaps = 0;

        let arr = clearUndefined(inputArr);        

        for (let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap / 2)) {
            for (let i = gap; i < arr.length; i++) {
                let temp = arr[i];
                let j;
                
                comparisons++;
                for (
                    j = i;
                    j >= gap && (
                        (order === 'asc' && arr[j - gap] > temp) || 
                        (order === 'desc' && arr[j - gap] < temp)
                    );
                    j -= gap
                ) {
                    comparisons++;
                    swaps++;
                    arr[j] = arr[j-gap];
                }
    
                arr[j] = temp;
            }
        }

        console.log(`${order} | Shell Sort: Comparisons - ${comparisons}, Swaps - ${swaps}, Undefined - ${inputArr.length - arr.length}`);
        console.log(arr);
    };

    // Сортування методом Хоара (Quick Sort)
    const quickSort = (inputArr, order = 'asc') => {
        let comparisons = 0;
        let swaps = 0;

        let arr = clearUndefined(inputArr);

        const partition = (arr, low, high) => {
            let pivot = arr[high]; 
            let i = low - 1;

            for (let j = low; j <= high - 1; j++) { 
                comparisons++;
                if (
                    (order === 'asc' && arr[j] < pivot) ||
                    (order === 'desc' && arr[j] > pivot)
                ) { 
                    i++; 
                    swaps++;
                    swap(arr, i, j);
                } 
            } 

            swaps++;
            swap(arr, i + 1, high);
            return i + 1;
        };

        const innerQuickSort = (arr, low, high) => {
            if (low >= high) return;

            const pi = partition(arr, low, high);
            innerQuickSort(arr, low, pi - 1);
            innerQuickSort(arr, pi + 1, high);
        };

        innerQuickSort(arr, 0, arr.length - 1);

        console.log(`${order} | Quick Sort: Comparisons - ${comparisons}, Swaps - ${swaps}, Undefined - ${inputArr.length - arr.length}`);
        console.log(arr);
    };

    return {
        bubbleSort,
        selectionSort,
        insertionSort,
        shellSort,
        quickSort
    };
})();

// Приклад використання
const arr = [];
for (let i = 0; i < 100; i++) {
    arr.push(Math.floor(Math.random() * 1000));
}

console.log("Масив:", arr);

SortingLibrary.bubbleSort(arr, 'asc');
SortingLibrary.selectionSort(arr, 'asc');
SortingLibrary.insertionSort(arr, 'asc');
SortingLibrary.shellSort(arr, 'asc');
SortingLibrary.quickSort(arr, 'asc');

console.log("------------------------------------------------");

const sparseArrays = [];
for (let i = 0; i < 100; i++) {
    sparseArrays.push(Math.floor(Math.random() * 1000));
    if (sparseArrays[i] % 5 === 0) {
        sparseArrays[i] = undefined;
    }
}

console.log("Розріджений масив:", sparseArrays);

SortingLibrary.bubbleSort(sparseArrays, 'desc');
SortingLibrary.selectionSort(sparseArrays, 'desc');
SortingLibrary.insertionSort(sparseArrays, 'desc');
SortingLibrary.shellSort(sparseArrays, 'desc');
SortingLibrary.quickSort(sparseArrays, 'desc');