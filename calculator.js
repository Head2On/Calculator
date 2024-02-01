let displayValue = "";
let memoryValue = null;
let historyList = document.getElementById("history-list");

function appendCharacter(char) {
    displayValue += char;
    updateDisplay();
}

function deleteCharacter() {
    displayValue = displayValue.slice(0, -1);
    updateDisplay();
}

function clearDisplay() {
    displayValue = "";
    updateDisplay();
}

function calculate() {
    try {
        const result = eval(displayValue);
        displayValue = result.toString();
        updateDisplay();
        addToHistory(displayValue);
    } catch (error) {
        displayValue = "Error";
        updateDisplay();
        addToHistory("Error");
    }
}

function updateDisplay() {
    document.getElementById("display").value = displayValue;
}

function memoryClear() {
    memoryValue = null;
}

function memoryRecall() {
    if (memoryValue !== null) {
        displayValue += memoryValue;
        updateDisplay();
    }
}

function memoryStore() {
    memoryValue = displayValue;
}

function addToHistory(expression) {
    const historyItem = document.createElement("li");
    historyItem.textContent = expression;
    historyList.appendChild(historyItem);
}

// Keyboard support
document.addEventListener("keydown", function (event) {
    const key = event.key;

    if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        event.preventDefault();
        deleteCharacter();
    } else if (key >= "0" && key <= "9" || key === "." || key === "+" || key === "-" || key === "*" || key === "/" || key === "(" || key === ")") {
        appendCharacter(key);
    }
});

// ... (existing code)

// Handle button clicks
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelector(".calculator button");

    Array.from(buttons).forEach(button => {
            button.addEventListener("click", function () {
                const buttonText = this.innerText;

            if (buttonText === "C") {
                clearDisplay();
            } else if (buttonText === "⌫") {
                deleteCharacter();
            } else if (buttonText === "=") {
                calculate();
            } else if (button.classList.contains("operator")) {
                appendCharacter(buttonText);
            } else if (button.classList.contains("memory-buttons")) {
                handleMemoryButtons(buttonText);
            } else {
                appendCharacter(buttonText);
            }
        });
    });
});

