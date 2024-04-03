document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start");
    
    const difSelect = document.getElementById("dif");
    const colorSelect = document.getElementById("color");
    
    const menuWrapper = document.getElementById("menu");
    const gameWrapper = document.getElementById("game");
    
    const previewBlock = document.getElementById("preview-block");
    const gameBlock = document.getElementById("game-block");

    startButton.addEventListener("click", () => {
        if (difSelect.value !== "undef" && colorSelect.value !== "undef") {
            menuWrapper.classList.toggle("hidden");
            gameWrapper.classList.toggle("hidden");
            startGame(difSelect.value, colorSelect.value);
        } else {
            alert("Please select difficulty and color before starting.");
        }
    });

    difSelect.addEventListener("change", function() {
        updateCube(difSelect.value, colorSelect.value);
    });

    colorSelect.addEventListener("change", function() {
        updateCube(difSelect.value, colorSelect.value);
    });

    const updateCube = (dif, color) => {
        previewBlock.innerHTML = "";

        const cubeDiv = document.createElement("div");
        cubeDiv.classList.add("cube");
        cubeDiv.classList.add(dif);
        cubeDiv.style.backgroundColor = color;
        
        previewBlock.appendChild(cubeDiv);
    }

    const startGame = (dif, color) => {
        const scoreP = document.getElementById("score");
        const timeP = document.getElementById("time");

        let score = 0;
        scoreP.innerText = `Score: ${score}`;

        let clickTime = 0;
        let clickTimeLeft = 0;

        switch (dif) {
            case "easy":
                clickTime = 10;
                break;
            case "medium":
                clickTime = 5;
                break;
            case "hard":
                clickTime = 2;
                break;
        }

        clickTimeLeft = clickTime;
        timeP.innerText = `Time left: ${clickTimeLeft}`;

        gameBlock.classList.add("cube");
        gameBlock.classList.add(dif);
        gameBlock.style.backgroundColor = color;

        const timer = setInterval(() => {
            clickTimeLeft--;
            timeP.innerText = `Time left: ${clickTimeLeft}`;

            if (clickTimeLeft == 0) {
                clearInterval(timer);
                setTimeout(() => {
                    alert(`Time's up! Your final score is ${score}`);
                    menuWrapper.classList.toggle("hidden");
                    gameWrapper.classList.toggle("hidden");
                }, 1);
            }
        }, 1000);

        changeBlockPosition(gameBlock, dif);
        
        gameBlock.addEventListener("click", () => {
            if (clickTimeLeft > 0) {
                score++;
                scoreP.innerText = `Score: ${score}`;

                clickTimeLeft = clickTime;
                timeP.innerText = `Time left: ${clickTimeLeft}`;
                
                changeBlockPosition(gameBlock, dif);
            }
        });
    }

    const changeBlockPosition = (block, dif) => {
        let maxStepX;
        let maxStepY;
        
        switch (dif) {
            case "easy":
                maxStepX = window.innerWidth / 15;
                maxStepY = window.innerHeight / 10;
                break;
            case "medium":
                maxStepX = window.innerWidth / 10;
                maxStepY = window.innerHeight / 5;
                break;
            case "hard":
                maxStepX = window.innerWidth / 5;
                maxStepY = window.innerHeight / 2.2;
                break;
        }

        const newX = Math.random() * (2 * maxStepX) - maxStepX + window.innerWidth / 2;
        const newY = Math.random() * (2 * maxStepY) - maxStepY + window.innerHeight / 2;

        block.style.left = newX + "px";
        block.style.top = newY + "px";
    }
});
