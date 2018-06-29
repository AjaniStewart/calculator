function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { 
    return b === 0 ? (errorEncountered = true,"DIVIDE BY ZERO ERROR") : a / b; 
}

function operate(a, op, b) {
    if (!a) return b + op;
    switch(op) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return errorEncountered = true,"SYNTAX ERROR";
    }
}

let errorEncountered = false;
let equalsPressed = false;

const mainDisplay = document.querySelector(".current");
const currentAnswer = document.querySelector(".answer");

//logic for digits
const digits = document.querySelectorAll(".digit");
digits.forEach(d => {
    d.addEventListener("click", () => {
        if (!errorEncountered) {
            if (!equalsPressed) {
                if (d.id !== "decimal") {
                    mainDisplay.textContent += d.id;
                } else {
                    if (mainDisplay.textContent.search(/\./) === -1) {
                        mainDisplay.textContent += ".";
                    }
                }
            } else {
                mainDisplay.textContent = d.id === "decimal" ? "." : d.id;
                equalsPressed = false;
            }
        }
    });
});

//logic for functions
 const clearAll = document.querySelector("#clearAll");
 clearAll.addEventListener("click", () => {
    mainDisplay.textContent = "";
    currentAnswer.textContent = "";
    errorEncountered = false;
 });

 const clearMain = document.querySelector("#clearCurrent");
 clearMain.addEventListener("click", () => {
    if (!errorEncountered) {
        mainDisplay.textContent = "";
    }
 });

 const del = document.querySelector("#delete");
 del.addEventListener("click", () => {
    if (!errorEncountered) {
        mainDisplay.textContent 
        = mainDisplay.textContent.slice(0, mainDisplay.textContent.length - 1);
    }
 });

 //logic for operations
 let prevOp;
 const operations = document.querySelectorAll(".operation");
 operations.forEach(o => {
    o.addEventListener("click", () => {
        if (!errorEncountered) {
            let left = currentAnswer.textContent.search(/\./) === -1 
            ? parseInt(currentAnswer.textContent) 
            : parseFloat(currentAnswer.textContent);

            let right = mainDisplay.textContent.search(/\./) === -1 
            ? parseInt(mainDisplay.textContent) 
            : parseFloat(mainDisplay.textContent);

            if (isNaN(right)) {
                prevOp = o.id;
                currentAnswer.textContent 
                = currentAnswer.textContent
                               .slice(0, currentAnswer.textContent.length - 1);
                currentAnswer.textContent += prevOp;
            } else if (o.id !== "equals") {
                if (!prevOp) prevOp = o.id;
                currentAnswer.textContent = operate(left,prevOp,right);
                mainDisplay.textContent = "";
                prevOp = o.id;
            } else {
                mainDisplay.textContent = operate(left,prevOp,right);
                currentAnswer.textContent = "";
                prevOp = "";
                equalsPressed = true;
            }
        } 
    });
 });


