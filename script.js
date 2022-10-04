const numbers = document.querySelectorAll(".number");
const symbols = document.querySelectorAll(".symbol");
const operators = document.querySelectorAll(".operator");
const functions = document.querySelectorAll(".function");
const mainDisplay = document.querySelector("#display");
const displaySmall = document.querySelector("#smallNumberArea p");
const displayBig = document.querySelector("#largeNumberArea p");
const btnClear = document.querySelector("#btnClear");
//const btnAllClear = document.querySelector("#btnAllClear");
const btnEval = document.querySelector("#btnEval");


const numbersArr = Array.from(numbers).map(number => number.textContent).sort();
const operatorsArr = Array.from(operators).map(operator => operator.textContent);
const symbolsArr = Array.from(symbols).map(symbol => symbol.textContent);

const maxChars = 18;

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
    mainDisplayContent = "0";
    updateMainDisplay();
}) 
/*
btnAllClear.addEventListener('click', (e) => {
    mainDisplayContent = "0";
    subDisplayContent = "";
    updateMainDisplay();
    updateSubDisplay();
}) 
*/
btnEval.addEventListener('click', evaluate);

document.addEventListener("keydown", (e) => {
    console.log(e)
    if(numbersArr.includes(e.key) || operatorsArr.includes(e.key) || symbolsArr.includes(e.key)) {
        appendChar(e.key);
    } else {
        switch(e.key) {
            case "Enter": evaluate(); break;
            case "Backspace": undo(); break;
            case "Escape": clearAll(); break;
            case "c":
            case "C": clear(); break;
            case "/": appendChar("÷"); break;
        }
    }  
})

//The biggest TODO ever
function interpretMainContent() {
    const inputNbrs = mainDisplayContent.split(/[\+\-\÷x\%]/);
    const inputOperators = Array.from(mainDisplayContent).filter(char => operatorsArr.includes(char))
    console.log(inputNbrs)
    console.log(inputOperators);
}

function evaluate() {
    /*subDisplayContent = `${mainDisplayContent} (ans: ${mainDisplayContent})`;
    mainDisplayContent = "0";
    updateMainDisplay();
    updateSubDisplay();*/

    const inputNbrs = mainDisplayContent.split(/[\+\-\÷x\%]/).filter(char => char !== "");
    const inputOperators = Array.from(mainDisplayContent).filter(char => operatorsArr.includes(char));
    
    console.log(inputOperators.length);
    console.log(inputNbrs.length);
    //remove hanging operators
    if(inputOperators.length === inputNbrs.length){
        inputOperators.splice(inputOperators.length-1,1);
        mainDisplayContent = mainDisplayContent.split("").slice(0, -1).join("");
    }; 

    console.log(inputOperators);
    let opIndex;
    let newVal = inputNbrs[0];
    while(inputOperators.length > 0) {
        //parenthesis

        if(inputOperators.includes("÷")) {
            opIndex = inputOperators.indexOf("÷");
            newVal = parseFloat(inputNbrs[opIndex]) / parseFloat(inputNbrs[opIndex + 1]);
        } else if(inputOperators.includes("x")) {
            opIndex = inputOperators.indexOf("x");
            newVal = parseFloat(inputNbrs[opIndex]) * parseFloat(inputNbrs[opIndex + 1]);
        } else if(inputOperators.includes("-")) {
            opIndex = inputOperators.indexOf("-");
            newVal = parseFloat(inputNbrs[opIndex]) - parseFloat(inputNbrs[opIndex + 1]);
        } else if(inputOperators.includes("+")) {
            opIndex = inputOperators.indexOf("+");
            newVal = parseFloat(inputNbrs[opIndex]) + parseFloat(inputNbrs[opIndex + 1]);
        } else {
            console.log("emptying oparray" );
            inputOperators = [];
        }

        inputNbrs[opIndex] = newVal;
        inputNbrs.splice(opIndex + 1, 1);
        inputOperators.splice(opIndex, 1);       
    }

    if(isNaN(newVal)){
        newVal = "0";
    }
    console.log(typeof(newVal));
        newVal = newVal.toString();
    //remove hanging decimals
    if(newVal.split("")[newVal.length-1] === "."){
        console.log("OMEGALUL", newVal)
        newVal = newVal.split("").splice(0,newVal.length-1).join("");
        mainDisplayContent = mainDisplayContent.split("").splice(0,mainDisplayContent.length-1).join("");
        console.log("OMEGALUL", newVal)

    }
    subDisplayContent = `(${mainDisplayContent}) = ${newVal}`;
    mainDisplayContent = newVal;
    updateSubDisplay();
    updateMainDisplay();
    
}

/* -- operator doesn't work, idk.
function evalTwoNumbers(nbr1, nbr2, operator) {
    console.log("case: " + nbr1, nbr2, operator)
    switch(operator) {
        case operator === "÷": return (nbr1/nbr2);       
        case operator === "x": return (nbr1*nbr2);
        case operator === "+": return (nbr1+nbr2);
        case operator === "-": return (nbr1-nbr2);
    }
}
*/
function updateMainDisplay() {
    displayBig.textContent = mainDisplayContent;
}

function updateSubDisplay() {
    displaySmall.textContent = subDisplayContent;
}

function displayFullAlert() {
    mainDisplay.classList.toggle("full");
    setTimeout(() => {
        mainDisplay.classList.toggle("full");
    }, 100)
}


function appendChar(newChar) {

    if(mainDisplayContent.length > maxChars) {
        displayFullAlert();
        return;
    }

    const inputNbrs = mainDisplayContent.split(/[\+\-\÷x\%]/);
    const currentNbr = inputNbrs[inputNbrs.length-1];

    //if last char i operatr - replace operator
    if(currentNbr.includes(".") && newChar === ".") {
        return;
    }

    if(operatorsArr.includes((mainDisplayContent.slice(-1)) || mainDisplayContent.slice(-1) === ".") && (operatorsArr.includes(newChar)) || newChar === "."){
        mainDisplayContent = mainDisplayContent.split("").slice(0,-1).join("")
    } 
    

    //remove 0 if it's the first digit in string -- TODO, look into google calc behaviour
    if(mainDisplayContent.slice(0,1) === '0'){
        console.log(mainDisplayContent)
        mainDisplayContent = mainDisplayContent.split("").slice(1).join("")
        console.log(mainDisplayContent)
    }

    mainDisplayContent = `${mainDisplayContent}${newChar}`;

    /* TODO -- nice styling. requires some different logic though
    if(operatorsArr.includes(newChar)) {
        mainDisplayContent = `${currentStr} ${newChar} `;
    } else {
        mainDisplayContent = `${currentStr}${newChar}`;
    }*/
    updateMainDisplay();    
}

//undo button
function undo(){
    if(mainDisplayContent.length < 2) {
        mainDisplayContent
    } else {
        mainDisplayContent = mainDisplayContent.split("").slice(0,-1).join("")
    }
    updateMainDisplay();
}

function clear() {
    mainDisplayContent = "0";
    updateMainDisplay();
}

function clearAll() {
    mainDisplayContent = "0";
    subDisplayContent = "";
    updateMainDisplay();
    updateSubDisplay();
}
