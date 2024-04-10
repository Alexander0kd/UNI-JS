let canClick = false;
let clickCount = 0;
let currentFieldIndex = -1;
let currentField = null;
let data = null;

/**
 * Fetches the game data from a remote server and updates the game interface based on the fetched data.
 * If the game data is not available, the function returns early without performing any action.
 */
function fetchData() {
    // Get the game and loader elements from the DOM
    const gameElement = document.getElementById('game');
    const loaderElement = document.getElementById('loader');

    // Hide the game element and show the loader element
    if (gameElement) gameElement.classList.add('hidden');
    if (loaderElement) loaderElement.classList.remove('hidden');

    // Fetch the game data from the remote server
    fetch('https://raw.githubusercontent.com/Alexander0kd/UNI-JS/main/lab6/data/response.json')
        .then((response )=> {
            // Check if the response is not ok and throw an error
            if (!response.ok) {
                throw new Error('[P1]: Fetch Error');
            }

            // Parse the response as JSON and return the result
            return response.json();
        })
        .then((jsonData) => {
            // Assign the fetched data to the global data variable
            data = jsonData;

            // Show the game element and hide the loader element
            if (gameElement) gameElement.classList.remove('hidden');
            if (loaderElement) loaderElement.classList.add('hidden');
        })
        .catch((error) => {
            // Log the fetching error to the console
            console.error('Fetching error:', error);
        });
}

/**
 * Updates the game field interface based on the current game data and state.
 * If the necessary elements or data are not available, the function returns early without performing any action.
 */
function updateField() {
    // Get the field, click count, and minimum click count elements from the DOM
    const fieldElement = document.getElementById('field');
    const clickElement = document.getElementById('click');
    const minElement = document.getElementById('minclick');

    // Check if the game data, current field index, field element, and current field are available
    if (!data || !data[currentFieldIndex] || !fieldElement || !currentField) {
        return;
    }

    // Update the click count and minimum click elements with the corresponding values
    if (clickElement) clickElement.innerText = `Click Count: ${clickCount}`;
    if (minElement) minElement.innerText = `Minimum Count: ${data[currentFieldIndex].min}`;

    // Clear the field element's content
    fieldElement.innerHTML = '';

    // Iterate through the current field data to create and append cell elements to the field element
    for (let i = 0; i < currentField.length; i++) {
        const group = document.createElement('div');
        group.classList.add('group');

        for (let j = 0; j < currentField[i].length; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');

            // Add the 'active' class to the cell if the corresponding data value is 1
            if (currentField[i][j] == 1) {
                cell.classList.add('active');
            }

            // Add a click event listener to the cell that calls the buttonClick function with the cell's position
            cell.addEventListener('click', () => {
                buttonClick(i, j);
            });

            // Append the cell to the field element
            group.appendChild(cell);
        }

        fieldElement.appendChild(group);
    }

    // Check if the player has won the game based on the updated field
    checkIfWin();
}

/**
 * Starts a new game by selecting a random field from the available game data, resetting the click count, and enabling further clicks.
 * If the game data is not available, the function returns early without performing any action.
 */
function newGame() {
    if (!data) {
        return;
    }

    // Select a random field index different from the current one, if there are multiple fields available
    let next = currentFieldIndex;
    while (next == currentFieldIndex && data.length > 1) {
        next = Math.floor(Math.random() * data.length);
    }
    currentFieldIndex = next;

    // Reset the click count to zero and enable further clicks by setting the canClick flag to true
    clickCount = 0;
    canClick = true;
    
    // Create a deep clone of the grid data for the selected field index and assign it to the currentField variable
    currentField = deepClone(data[currentFieldIndex].grid);
    // Update the game field display based on the new currentField data
    updateField();
}

/**
 * Resets the game to the initial state by updating the game field with the initial grid data,
 * resetting the click count, and enabling further clicks.
 * If the game data or the current field index is not available, the function returns early without performing any action.
 */
function restartGame() {
    // Check if the game data, current field index, or the grid data for the current field index is not available
    if (!data || !data[currentFieldIndex] || !data[currentFieldIndex].grid) {
        return;
    }
    
    // Reset the click count to zero
    clickCount = 0;
    // Enable further clicks by setting the canClick flag to true
    canClick = true;

    // Create a deep clone of the grid data for the current field index and assign it to the currentField variable
    currentField = deepClone(data[currentFieldIndex].grid);
    // Update the game field display based on the new currentField data
    updateField();
}

/**
 * Handles the button click event by toggling the state of cells in the game field and updating the click count.
 * If the game is in a clickable state, it toggles the state of the clicked cell and its adjacent cells.
 * It then increments the click count and updates the game field display.
 *
 * @param {number} row - The row index of the clicked cell.
 * @param {number} col - The column index of the clicked cell.
 */
function buttonClick(row, col) {
    if (!currentField || !canClick) {
        return;
    }

    for (let i of [-1, 1, 0]) {
        for (let j of [-1, 1, 0]) {
            if (i != 0 && j != 0) {
                continue;
            }

            const workingRow = row + i;
            const workingCol = col + j;

            if (workingRow >= 0 && workingRow < currentField.length) {
                if (workingCol >= 0 && workingCol < currentField[workingRow].length) {
                    currentField[workingRow][workingCol] = currentField[workingRow][workingCol] == 0 ? 1 : 0;
                }
            }
        }
    }

    clickCount++;
    updateField();
}

/**
 * Checks if the player has won the game by examining the current game field.
 * If the player has won, it updates the game state and displays a win message.
 */
function checkIfWin() {
    // Check if the current game field is available
    if (!currentField) {
        return;
    }

    // Iterate through the game field to find any active cells
    for (let i = 0; i < currentField.length; i++) {
        for (let j = 0; j < currentField[i].length; j++) {
            if (currentField[i][j] == 1) {
                return; // If an active cell is found, the game continues
            }
        }
    }

    // If no active cells are found, the player has won
    canClick = false; // Disable further clicks
    const fieldElement = document.getElementById('field');

    // Display the win message in the game field
    if (!fieldElement) {
        alert('You Win!'); // If the field element is not available, show an alert
        return;
    }

    fieldElement.innerHTML = ''; // Clear the game field

    // Create and append the win message element
    const winElement = document.createElement('div');
    winElement.classList.add('win');
    winElement.innerText = 'You Win!';

    if (clickCount > data[currentFieldIndex].min) {
        winElement.innerText += '\nBut could be better :('; // Add a message based on the click count
    }

    fieldElement.appendChild(winElement);
}

/**
 * Initializes the game by setting up event listeners for the new game and restart buttons,
 * and fetching the game data.
 */
function initGame() {
    // Get the new game and restart buttons from the DOM
    const newGameBtn = document.getElementById('newGame');
    const restartBtn = document.getElementById('restart');

    // Check if the buttons are available in the DOM
    if (!newGameBtn || !restartBtn) {
        return;
    }

    // Add a click event listener to the new game button
    newGameBtn.addEventListener('click', () => {
        newGame();
    });

    // Add a click event listener to the restart button
    restartBtn.addEventListener('click', () => {
        restartGame();
    });

    // Fetch the game data
    fetchData();
}

/**
 * Creates a deep clone of the provided data using JSON parsing and stringification.
 * This function is used to create a deep copy of the data to avoid reference-related issues.
 *
 * @param {any} data - The data to be cloned.
 * @returns {any} - A deep clone of the provided data.
 */
function deepClone(data) {
    return JSON.parse(JSON.stringify(data));
}

initGame();
