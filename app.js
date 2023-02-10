let btns1 = document.querySelectorAll('.currency_val')
let btns2 = document.querySelectorAll('.currency_val2')
const hint = document.querySelector('.currency-text')                  // получаем окно с 1 подсказкой курса первой валюты ко второй
const secondHint = document.querySelector('.second__currency-text')
let firstValue = 'USD'
let secondValue = 'RUB'
const input = document.querySelector('input')
const output = document.querySelector('.output')
let amount = input.value;

for (let i=0; i<btns1.length;i++){
    let btn1 = btns1[i]
    btn1.addEventListener('click', (event)=>{
        firstValue = getCurrencyFromInput1(event.target)
        if (firstValue != secondValue){
            convert()
        } else {
            output.textContent = input.value
        }
    } )
}

for (let i=0; i<btns2.length;i++){
    let btn2 = btns2[i]
    btn2.addEventListener('click', (event)=>{
        secondValue = getCurrencyFromInput2(event.target)
        if (firstValue != secondValue){
            convert()
        } else {
            output.textContent = input.value
        }
        
    } )
}

function getCurrencyFromInput1(param){
    for (let i=0;i<btns1.length;i++){
        if (btns1[i].classList.contains('active')){
            btns1[i].classList.remove('active')
            param.classList.add('active')
            //convert()
            let value = param.getAttribute('data-value')
            return value;
        }
    }
}

function getCurrencyFromInput2(param){
    for (let i=0;i<btns2.length;i++){
        if (btns2[i].classList.contains('active')){
            btns2[i].classList.remove('active')
            param.classList.add('active')
            //convert()
            let value = param.getAttribute('data-value')
            return value;
        }
    }
}

input.addEventListener('keyup', (event)=>{
    convert()
})


function convert(){
    amount = input.value
    fetched(firstValue, secondValue, amount)
        .then(data => {
            if (input.value == ''){
                output.textContent = ''
            } else {
                output.textContent = data.result;
            }   
        })
    fetched(firstValue, secondValue, amount = 1)
        .then(data => {
            rate = data.result
            hint.textContent = `1 ${firstValue} = ${rate} ${secondValue}`
        })
    fetched(secondValue, firstValue, amount = 1)
        .then(data => {
            let secondRate = data.result
            secondHint.textContent = `1 ${secondValue} = ${secondRate} ${firstValue}`
        })
    
}



const fetched = async (firstValue, secondValue, amount) => {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${firstValue}&to=${secondValue}&amount=${amount}`)
    const data = await response.json()
    return data
}

if (input.value==1){
    convert()
} 
