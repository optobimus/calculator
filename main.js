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
    if (b === 0) return "ERROR 2";
    return a / b;
}

function operate(operator, a, b, value) {
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
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;    
    }
    if (value === "=") {
        historyValue += " " + b + " " + value;
    } else {
        historyValue = result + " " + value;
    }

    displayValue = result;
    numbers.push(result);
    n++;
    updateScreen();
}

let displayValue = "", historyValue = "";
let operator = "";
let numbers = [], n = 0;
let result, tmp;

function storeDisplayValue(value) {
    if(isNaN(value) && value !== "."){
        
        numbers.push(+displayValue);
        n++;
        if(value === "=" || value === "Enter") {
            if (!numbers[n-2] || !operator) updateScreen("ERROR");
            operate(operator, numbers[n-2], numbers[n-1], "=");
            operator = "";
        } else if (operator !== "") {
            historyValue = numbers[n-1] + " " + value;
            operate(operator, numbers[n-2], numbers[n-1], value);
            operator = value;
        }else {
            operator = value;
            historyValue = numbers[n-1] + " " + operator;
            updateScreen();
            displayValue = "";
        }
    } else {
        if (document.querySelector(".current").innerHTML.includes(".") && value === "."){
            return;
        }
        if(result) {
            displayValue = "";
            result = false;
        } 
        displayValue += `${value}`;
        updateScreen();
    }
    console.log(displayValue);

}

function clearScreen() {
    const current = document.querySelector(".current");
    current.innerHTML = "";
    const history = document.querySelector(".history");
    history.innerHTML = "";
    displayValue = "";
    historyValue = "";
    numbers = [];
    n = 0;
    operator = "";
}

function deleteScreen() {
    const current = document.querySelector(".current");
    current.innerHTML = current.innerHTML.slice(0, -1);
    displayValue = displayValue.slice(0, -1);
}

function updateScreen(message) {
    const current = document.querySelector(".current");
    const history = document.querySelector(".history");
    if (message) {
        current.innerHTML = message;
    } else {
        current.innerHTML = displayValue;
        history.innerHTML = historyValue;
    }

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
    wrapper.addEventListener('keydown', (event) => {
        var name = event.key;
        var code = event.code;

        //alert(`Key pressed ${name} \r\n Key code value: ${code}`);

        if(code === "Escape" || code === "Backspace") {
            switch(code) {
                case "Escape":
                    clearScreen();
                    break;
                case "Backspace":
                    deleteScreen();
                    break;
            }
        }else if (isFinite(name) || name === "/" || name === "*" || name === "+" || name === "-" || name === "." || name === "=" || name === "Enter"){
            storeDisplayValue(name);
        }
    });
}
    