const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
const operators = document.querySelectorAll(".operator");
const functions = document.querySelectorAll(".function");
const displaySmall = document.querySelector("#smallNumberArea p");
const displayBig = document.querySelector("#largeNumberArea p");
const btnClear = document.querySelector("#btnClear");
const btnAllClear = document.querySelector("#btnAllClear");
const btnEval = document.querySelector("#btnEval");


const numbersArr = Array.from(numbers).map(number => number.textContent).sort();
const operatorsArr = Array.from(operators).map(operator => operator.textContent);
const symbolsArr = Array.from(symbols).map(symbol => symbol.textContent);

let subDisplayContent = "";
let mainDisplayContent = "";

numbers.forEach(number => number.addEventListener('click', (e) => {
    appendChar(e.target.textContent)
}));

operators.forEach(operator => operator.addEventListener('click', (e) => {
    appendChar(e.target.textContent)
}));

symbols.forEach(symbols => symbols.addEventListener('click', (e) => {
    appendChar(e.target.textContent)
}));

btnClear.addEventListener('click', (e) => {
    displayBig.textContent = `0`;
}) 

btnAllClear.addEventListener('click', (e) => {
    displayBig.textContent = `0`;
    displaySmall.textContent = '';
}) 

btnEval.addEventListener('click', evaluate);

document.addEventListener("keydown", (e) => {
    console.log(e)
    if(numbersArr.includes(e.key) || operatorsArr.includes(e.key)) {
        appendChar(e.key);
    } else if (e.code === "Enter") {
        evaluate();
    } else if (e.code === "Backspace") {
        undo();
    }
});

function evaluate() {
    displaySmall.textContent = `${displayBig.textContent} =`;
    displayBig.textContent = '0';
}


function appendChar(newChar) {
    currentStr = displayBig.textContent;

    //if last char i operatr - replace operator
    if(operatorsArr.includes(currentStr.slice(-1)) && operatorsArr.includes(newChar)){
        currentStr = currentStr.split("").slice(0,-1).join("")
    } 
    //remove 0 if it's the first digit in string -- TODO, look into google calc behaviour
    if(currentStr.slice(0,1) === '0'){
        currentStr = currentStr.split("").slice(1).join("")
    }
    
    displayBig.textContent = `${currentStr}${newChar}`;
    
    
    /* TODO -- nice styling. requires some different logic though
    if(operatorsArr.includes(newChar)) {
        displayBig.textContent = `${currentStr} ${newChar} `;
    } else {
        displayBig.textContent = `${currentStr}${newChar}`;
    }*/
}

//undo button
function undo(){
    if(displayBig.textContent.length < 2) {
        displayBig.textContent = 0;
    } else {
        displayBig.textContent = displayBig.textContent.split("").slice(0,-1).join("")
    }
}

function operatorHandler(operator) { 
    switch(operator) {
        case operator === "+":
            break;
        case operator === "-":
            break;
        case operator === "%":
            break;     
        case operator === "x":
            break;
        case operator === "÷":
            break;       
    }
}

function clear() {
    displayBig.textContent = "";
}

//keyboard listener -- TODO

//add number/symbol to display

//operator - big numbers turn small and the operator evaluates new and old.
//subsequent operators continue the chain, 

//function clear

//function AC

//function evaluate

