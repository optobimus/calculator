function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "×":
            result = multiply(a, b);
            break;
        case "÷":
            result = divide(a, b);
            break;      
    }
    displayValue = result;
    updateScreen();
}

let displayValue = "", historyValue = "";
let operator = "";
let numbers = [], n = 0;
let result = 0;

function storeDisplayValue(value) {
    if(isNaN(value) && value !== "."){
        numbers.push(+displayValue);
        n++;
        if(value === "=") {
            console.log(operator);
            operate(operator, numbers[n-2], numbers[n-1])
        }else {
            operator = value;
            historyValue = numbers[n-1];
            updateScreen();
            displayValue = "";
        }
    } else {
        displayValue += `${value}`;
        updateScreen();
        console.log(displayValue);
    }

}

function clearScreen() {
    const current = document.querySelector(".current");
    current.innerHTML = "";
    const history = document.querySelector(".history");
    history.innerHTML = "";
    displayValue = "";
    historyValue = "";
}

function deleteScreen() {
    const current = document.querySelector(".current");
    current.innerHTML = current.innerHTML.slice(0, -1);
    displayValue = displayValue.slice(0, -1);
}

function updateScreen() {
    const current = document.querySelector(".current");
    current.innerHTML = displayValue;
    const history = document.querySelector(".history");
    history.innerHTML = historyValue;
}

const wrapper = document.getElementById("wrapper");
if(wrapper){
    wrapper.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }
        if(event.target.innerHTML === "CLEAR" || event.target.innerHTML === "DELETE") {
            switch(event.target.innerHTML) {
                case "CLEAR":
                    clearScreen();
                    break;
                case "DELETE":
                    deleteScreen();
                    break;
            }
        } else {
            storeDisplayValue(event.target.innerHTML);
        }
    });
}
