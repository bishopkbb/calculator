const display = document.getElementById('display');
const numberButtons =
document.querySelectorAll('[data-number]');
const operatorButtons =
document.querySelectorAll('[data-operator]');
const equalsButton =
document.querySelector('[data-equals]');
const clearButton =
document.querySelector('[data-clear]');
const percentButton =
document.querySelector('[data-percent]');
const deleteButton =
document.querySelector('[data-delete]');

let currentOperand = '';
let previousOperand = '';
let currentOperator = null;

numberButtons.forEach(button => {
    button.addEventListener('click', () =>{
        currentOperand += button.textContent;
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(currentOperand === '') return;
        if (previousOperand !== '') calculate();
        currentOperator = button.textContent;
        previousOperand = currentOperand;
        currentOperand = '';
    });
});

equalsButton.addEventListener('click', () => {
    calculate();
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    currentOperand = '';
    previousOperand = '';
    currentOperator = null;
    updateDisplay();
});

percentButton.addEventListener('click', () => {
    if (currentOperand !=='') {
        currentOperand = (parseFloat(currentOperand) /
    100).toString();
    updateDisplay();
    }
});

deleteButton.addEventListener('click', () => {
    deleteLast();
});


function deleteLast() {
    currentOperand = currentOperand.slice(0, -1);
    updateDisplay();
}

function calculate() {
    let result;
    const prev = parseFloat(previousOperand); 
    const curr = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(curr)) return;

    switch (currentOperator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case '*':
            result = prev * curr;
            break;
        case '/':
            result = prev / curr;
            break;
        default:
            return;
    }

    currentOperand = result.toString();
    previousOperand = '';
    currentOperator = null;
}

document.addEventListener('keydown', (e) => {
    if (isNaN(e.key) || e.key === '.') {
        appendNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)){
        chooseOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
        updateDisplay();
    } else if (e.key === 'Backspace') {
        deleteLast();
    } else if (e.key === 'Escape') {
        currentOperand = '';
        previousOperand = '';
        currentOperator = null;
        updateDisplay();
    } else if (e.key === '%') {
        percentButton.click();
    }
});

function updateDisplay() {
    display.textContent = currentOperand || '0';
}