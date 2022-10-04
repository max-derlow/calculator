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

const maxChars = 32;

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

btnAllClear.addEventListener('click', (e) => {
    mainDisplayContent = "0";
    subDisplayContent = "";
    updateMainDisplay();
    updateSubDisplay();
}) 

btnEval.addEventListener('click', evaluate);

document.addEventListener("keydown", (e) => {
    console.log(e)
    if(numbersArr.includes(e.key) || operatorsArr.includes(e.key) || symbolsArr.includes(e.key)) {
        appendChar(e.key);
    } else if (e.code === "Enter") {
        evaluate();
    } else if (e.code === "Backspace") {
        undo();
    }
});

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
    //remove hanging operators and decimals
    if(inputOperators.length === inputNbrs.length){
        inputOperators.splice(inputOperators.length-1,1);
        mainDisplayContent = mainDisplayContent.split("").slice(0, -1).join("");
    }; 
    console.log(inputOperators);
    let opIndex;
    let newVal = inputNbrs[0];
    while(inputOperators.length > 0) {
        //parenthesis

        //remove hanging operator
        

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
        newVal = 0;
    }
    console.log(newVal);
    


    subDisplayContent = `(${mainDisplayContent}) = ${newVal}`;
    mainDisplayContent = newVal.toString();
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


function appendChar(newChar) {

    if(mainDisplayContent.length >= maxChars) {
        return;
    }

    const inputNbrs = mainDisplayContent.split(/[\+\-\÷x\%]/);
    const currentNbr = inputNbrs[inputNbrs.length-1];

    //if last char i operatr - replace operator
    if(currentNbr.includes(".") && newChar === ".") {
        return;
    }

    if(operatorsArr.includes(mainDisplayContent.slice(-1)) && operatorsArr.includes(newChar)){
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
        mainDisplayContent = 0;
    } else {
        mainDisplayContent = mainDisplayContent.split("").slice(0,-1).join("")
    }
    updateMainDisplay();
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
