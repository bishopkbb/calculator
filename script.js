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
const decimalButton =
document.querySelector('[data-decimal]');

let firstOperand ='';
let secondOperand ='';
let currentOperator ='';
let shouldResetDisplay = false;

numberButtons.forEach(button => {
    button.addEventListener('click', () =>
    appendNumber(button.dataset.number));
});

decimalButton.addEventListener('click',
    appendDecimal);

    percentButton.addEventListener('click', 
        convertPercent);

        operatorButtons.forEach(button => {
            button.addEventListener('click', () =>
            setOperator(button.dataset.operator));
        });

        equalsButton.addEventListener('click', () => {
            if (currentOperator ==='' || shouldResetDisplay)
                return;
            evaluate();
            currentOperator ='';
        });

        clearButton.addEventListener('click', clear);
        deleteButton.addEventListener('click', deleteLast);

        function appendNumber(number) {
            if (display.textContent === '0' ||
                shouldResetDisplay) {
                    display.textContent = number;
                    shouldResetDisplay = false;
                } else {
                    display.textContent += number;
                }
        }

        function appendDecimal() {
            if (shouldResetDisplay) {
                display.textContent = '0.';
                shouldResetDisplay = false;
                return;
            }
            if (!display.textContent.includes('.')) {
                display.textContent +='.';
            }
        }

        function convertPercent() {
            let value = parseFloat(display.textContent);
            if (isNaN(value)) return;
            value = value/100;
            display.textContent =
            value.toString().substring(0, 12);
            shouldResetDisplay = true;
        }

        function setOperator(operator) {
            if (currentOperator !=='') evaluate();
            firstOperand = display.textContent;
            currentOperator = operator;
            shouldResetDisplay = true;
        }

        function evaluate () {
            secondOperand = display.textContent;
            const a = parseFloat(firstOperand);
            const b = parseFloat(secondOperand);
            let result;

            switch (currentOperator) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = b === 0 ? 'Error' : a / b;
                    break;
            }

        display.textContent =
        result.toString().substring(0, 12);
        firstOperand = result;
        shouldResetDisplay = true;
        }

        function clear() {
            display.textContent = '0';
            firstOperand = '';
            secondOperand = '';
            currentOperator = '';
            shouldResetDisplay = false;
        }

        function deleteLast() {
            if (shouldResetDisplay ||
                display.textContent.length === 1) {
                    display.textContent = '0';
                } else {
                    display.textContent =
                    display.textContent.slice(0, -1);
                }
        }