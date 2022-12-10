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
            add(a, b);
            break;
        case "-":
            subtract(a, b);
            break;
        case "*":
            multiply(a, b);
            break;
        case "/":
            divide(a, b);
            break;      
    }
}

let displayValue = "";

function storeDisplayValue(value) {
    if(isNaN(value) && value !== "."){
        console.log("Not a Number");
    } else {
        displayValue += `${value}`;
        console.log(displayValue);
    }

}

const wrapper = document.getElementById("wrapper");
if(wrapper){
    wrapper.addEventListener('click', (event) => {
        const isButton = event.target.nodeName === 'BUTTON';
        if (!isButton) {
            return;
        }
        storeDisplayValue(event.target.innerHTML);
    });
}
