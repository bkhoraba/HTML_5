document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('screen');
    const keys = document.querySelector('.calculator-keys');
    let currentInput = '';
    let firstOperand = null;
    let operator = null;
    let shouldResetScreen = false;

    keys.addEventListener('click', event => {
        const { target } = event;
        if (!target.matches('button')) return;

        if (target.id === 'clear') {
            resetCalculator();
        } else if (target.id === 'equals') {
            performCalculation();
        } else if (target.classList.contains('operator')) {
            handleOperator(target.value);
        } else {
            handleNumberInput(target.value);
        }
    });

    function resetCalculator() {
        currentInput = '';
        firstOperand = null;
        operator = null;
        screen.value = '';
    }

    function handleNumberInput(value) {
        if (shouldResetScreen) {
            currentInput = value;
            shouldResetScreen = false;
        } else {
            currentInput = currentInput === '' ? value : currentInput + value;
        }
        screen.value = currentInput;
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        if (operator !== null) {
            performCalculation();
        }
        firstOperand = parseFloat(currentInput);
        operator = op;
        shouldResetScreen = true;
    }

    function performCalculation() {
        if (operator === null || shouldResetScreen) return;
        const secondOperand = parseFloat(currentInput);
        let result;

        switch (operator) {
            case '+':
                result = firstOperand + secondOperand;
                break;
            case '-':
                result = firstOperand - secondOperand;
                break;
            case '*':
                result = firstOperand * secondOperand;
                break;
            case '/':
                result = secondOperand === 0 ? 'Error' : firstOperand / secondOperand;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        screen.value = currentInput;
        operator = null;
    }
});
