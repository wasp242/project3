const firstCurrency = document.querySelector('.list-currency')                    //получаем 1 окно ввода
const secondCurrency = document.querySelector('.secondlist-currency')             //получаем 2 окно вывода
const hint = document.querySelector('.currency-text')                  // получаем окно с 1 подсказкой курса первой валюты ко второй
const secondHind = document.querySelector('.second__currency-text')    //   получаем окно с 2 подсказкой курса второй валюты к первой
let firstValue = 'USD'
let secondValue = 'RUB'
const input = document.querySelector('input')
const output = document.querySelector('.output')
let amount = input.value;


firstCurrency.addEventListener('click', (event)=>{
    firstValue = getCurrencyFromInput(event.target, firstCurrency) 
    convert()
})
secondCurrency.addEventListener('click',(event)=>{
    secondValue = getCurrencyFromInput(event.target, secondCurrency)
    convert()
})
input.addEventListener('keyup', (event)=>{
    convert()
    
})


function getCurrencyFromInput(param, currencyNumber){
    let arr = currencyNumber.getElementsByClassName('active')
    arr[0].classList.remove('active')
    param.classList.add('active')
    let value = param.getAttribute('data-value')
    return value;
}


function convert(){
    amount = input.value
    getNewAmount(firstValue, secondValue, amount)
        .then(data => {
            if (amount == ''){
                output.textContent = ''
            } else {
                output.textContent = data.result;
            }   
        })
    getRate(firstValue, secondValue)
        .then(data => {
            rate = data.result
            hint.textContent = `1 ${firstValue} = ${rate} ${secondValue}`
        })
    getSecondRate(firstValue, secondValue)
        .then(data => {
            let secondRate = data.result
            secondHind.textContent = `1 ${secondValue} = ${secondRate} ${firstValue}`
        })
    
}


const getNewAmount = async (firstValue, secondValue, amount) => {
    const response = await fetch(`https://api.exchangerate.host/convert?from=${firstValue}&to=${secondValue}&amount=${amount}`)
    const data = await response.json()
    return data
}

const getRate = async (firstValue, secondValue) => {
    const response = await fetch ((`https://api.exchangerate.host/convert?from=${firstValue}&to=${secondValue}`))
    const data = await response.json()
    return data
}

const getSecondRate = async (firstValue, secondValue) => {
    const response = await fetch ((`https://api.exchangerate.host/convert?from=${secondValue}&to=${firstValue}`))
    const data = await response.json()
    return data
}


if (input.value==1){
    convert()
} 

if (input.value === ''){
    console.log(123)
}