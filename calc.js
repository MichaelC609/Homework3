class Calculator {
    constructor(prevOperationText, currOperationText) {
        this.prevOperationText = prevOperationText;
        this.currOperationText = currOperationText;
        this.currentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;
    }

    clear() {
        this.currentOperation = '';
        this.previousOperation = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperation = this.currentOperation.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperation.includes('.')) return;
        this.currentOperation = this.currentOperation.toString() + number.toString();
    }

    chooseOp(operation) {
        if (this.currentOperation === '') return;
        if (this.previousOperation !== '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousOperation = this.currentOperation;
        this.currentOperation = '';
    }

    calculate() {
        let calculation;
        const prev = parseFloat(this.previousOperation);
        const curr = parseFloat(this.currentOperation);

        if (isNaN(prev) || isNaN(curr)) return;

        switch (this.operation) {
            case '+':
                calculation = prev + curr;
                break;
            case '-':
                calculation = prev - curr;
                break;
            case '*':
                calculation = prev * curr;
                break;
            case '/':
                calculation = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperation = calculation;
        this.operation = undefined;
        this.previousOperation = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            });
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currOperationText.value = this.getDisplayNumber(this.currentOperation);
        if (this.operation != null) {
            this.prevOperationText.innerText = `${this.previousOperation} ${this.operation}`;
        } else {
            this.prevOperationText.innerText = '';
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const prevOperationText = document.getElementById('prev-operation');
    const currOperationText = document.getElementById('curr-operation');
    const calculator = new Calculator(prevOperationText, currOperationText);

    const buttons = document.querySelectorAll('[data-number], [data-operation], [data-equals], [data-delete]');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.hasAttribute('data-number')) {
                calculator.appendNumber(button.innerText);
            } else if (button.hasAttribute('data-operation')) {
                calculator.chooseOp(button.innerText);
            } else if (button.hasAttribute('data-equals')) {
                calculator.calculate();
            } else if (button.hasAttribute('data-delete')) {
                calculator.delete();
            }
            calculator.updateDisplay();
        });
    });
});
