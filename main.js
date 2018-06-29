function add(a,b) { return a + b; }
function subtract(a,b) { return a - b; }
function multiply(a,b) { return a * b; }
function divide(a,b) { return b === 0 ? (error = true,"DIVIDE BY ZERO ERROR") : a / b; }

function operate(a, op, b) {
    if (!a) return b + op;
    switch(op) {
        case "+": return add(a,b);
        case "-": return subtract(a,b);
        case "*": return multiply(a,b);
        case "/": return divide(a,b);
        default: return error = true,"SYNTAX ERROR";
    }
}

let error = false;

const mainDisplay = document.querySelector(".current");
const currentAnswer = document.querySelector(".answer");

//logic for digits
const digits = document.querySelectorAll(".digit");
digits.forEach(d => {
    d.addEventListener("click", () => {
        if (!error) {
            if (d.id !== "decimal") {
                mainDisplay.textContent += d.id;
            } else {
                if (mainDisplay.textContent.search(/\./) === -1) {
                    mainDisplay.textContent += ".";
                }
            }
        }
    });
});

//logic for functions
 const clearAll = document.querySelector("#clearAll");
 clearAll.addEventListener("click", () => {
    mainDisplay.textContent = "";
    currentAnswer.textContent = "";
    error = false;
 });

 const clearMain = document.querySelector("#clearCurrent");
 clearMain.addEventListener("click", () => {
    if (!error) {
        mainDisplay.textContent = "";
    }
 });

 const del = document.querySelector("#delete");
 del.addEventListener("click", () => {
    if (!error) {
        mainDisplay.textContent 
        = mainDisplay.textContent.slice(0, mainDisplay.textContent.length - 1);
    }
 });

 //logic for operations
 let prevOp;
 const operations = document.querySelectorAll(".operation");
 operations.forEach(o => {
    o.addEventListener("click", () => {
        if (!error) {
            let left = currentAnswer.textContent.search(/\./) === -1 
            ? parseInt(currentAnswer.textContent) 
            : parseFloat(currentAnswer.textContent);

            let right = mainDisplay.textContent.search(/\./) === -1 
            ? parseInt(mainDisplay.textContent) 
            : parseFloat(mainDisplay.textContent);

            if (o.id !== "equals") {
                if (!prevOp) prevOp = o.id;
                currentAnswer.textContent = operate(left,prevOp,right);
                mainDisplay.textContent = "";
                prevOp = o.id;
            } else {
                mainDisplay.textContent = operate(left,prevOp,right);
                currentAnswer.textContent = "";
                prevOp = "";
            }
        } 
    });
 });


