let notFound = {day: '', month: '', year: ''}
const atualDate = Date().split(' ')
const errorDay = document.getElementById('errorDay')
const errorMonth = document.getElementById('errorMonth')
const errorYear = document.getElementById('errorYear')

function calculateValues(event) {
    event.preventDefault()
// DECLARATION OF VARIABLES ↓

    const calendarArray = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]

    let dateOfBirth = {
        day: Number(document.getElementById('dayForm').value),
        month: Number(document.getElementById('monthForm').value),
        year: Number(document.getElementById('yearForm').value)
    }

    let spanDate = {
        days: document.getElementById('days'),
        months: document.getElementById('months'),
        years: document.getElementById('years')
    }

    let calculationResult = {
        days: '',
        months: '',
        years: ''
    }

    spanDate.days.innerText = '- - '
    spanDate.months.innerText = '- - '
    spanDate.years.innerText = '- - '

    notFound.day = ''
    notFound.month = ''
    notFound.year = ''

// ==============================================================================
// CHECK IF IT’S A LEAP YEAR ↓

    let leapYear = false

    if((dateOfBirth.year % 4) === 0){
        leapYear = true
    }

    if(String(dateOfBirth.year)[String(dateOfBirth.year).length -2] === String(dateOfBirth.year)[String(dateOfBirth.year).length -1]){
        if((dateOfBirth.year % 400) === 0){
            leapYear = true
        } else{
            leapYear = false
        }
    }

// ==============================================================================
// YEARS CALCULATION 

    if(dateOfBirth.year > Number(atualDate[3]) || dateOfBirth.year <= 0){
        notFound.year = 'invalid year'
    } else{
        calculationResult.years = Number(atualDate[3]) - dateOfBirth.year
    }

// ==============================================================================
// MONTHS CALCULATION ↓

    let atualMonth = Number(calendarArray.indexOf(atualDate[1]) +1)

    if(dateOfBirth.month >= 1 && dateOfBirth.month <= 12){
        calculationResult.months = atualMonth - dateOfBirth.month
        

        if(dateOfBirth.month > atualMonth && notFound.year === ''){
            calculationResult.years -= 1
            calculationResult.months = atualMonth + (12 - dateOfBirth.month)
        }

    } else{ 
        notFound.month = 'invalid month'
    }
    

    if(dateOfBirth.month === atualMonth && dateOfBirth.day > Number(atualDate[2])){
        calculationResult.years -= 1
        calculationResult.days = dateOfBirth.day - Number(atualDate[2])

        if(calculationResult.months === 2 || calculationResult.months === 4 || calculationResult.months === 6 || calculationResult.months === 9 || calculationResult.months === 11){
            calculationResult.days = 30 - calculationResult.days
        } else{
            calculationResult.days = 31 - calculationResult.days
        }

        calculationResult.months = 12
    } 

    if(calculationResult.months !== ''){
        notFound.month = ''
    }

   

// ==============================================================================
// DAYS CALCULATION ↓

    if(((dateOfBirth.day >= 31) && (dateOfBirth.month === 2 || dateOfBirth.month === 4 || dateOfBirth.month === 6 || dateOfBirth.month === 9 || dateOfBirth.month === 11)) || ((dateOfBirth.day === 29) && (dateOfBirth.month === 2) && (leapYear == false)) || ((dateOfBirth.day > 29) && (dateOfBirth.month === 2)) || (dateOfBirth.day <= 0)){
        notFound.day = 'invalid date'
    } else if(calculationResult.days === '' && notFound.month === ''){
        if(dateOfBirth.day > Number(atualDate[2])){
            calculationResult.months -= 1

            if(dateOfBirth.month === 2 || dateOfBirth.month === 4 || dateOfBirth.month === 6 || dateOfBirth.month === 9 || dateOfBirth.month === 11){
                calculationResult.days = 30 - dateOfBirth.day
            } else{
                calculationResult.days = 31 - dateOfBirth.day
            }   

            calculationResult.days += Number(atualDate[2])
        } else{
            calculationResult.days = Number(atualDate[2]) - dateOfBirth.day
        }   
    }

    if(calculationResult.days !== '' && calculationResult.months !== '' && calculationResult.years !== ''){
        for (let i = 1; i <= calculationResult.days; i++) {
            setTimeout(function name(params) {
                spanDate.days.innerText = i
            }, i * 70)
            
        }

        for (let i = 1; i <= calculationResult.months; i++) {
            setTimeout(function name(params) {
                spanDate.months.innerText = i
            }, i * 70)
        }

        for (let i = 1; i <= calculationResult.years; i++) {
            setTimeout(function name(params) {
                spanDate.years.innerText = i
            }, i * 70)
        }
    } 

    addStyleForm()
}

function addStyleForm(){
    let inputsElements = document.querySelectorAll('.dateInputs')
    let elementButton = document.querySelector('.arrowButton')

    if(notFound.day !== ''){
        for (let i = 0; i < inputsElements.length; i++) {
            inputsElements[i].classList.add('formErrorStyle')
            inputsElements[i].childNodes[3].classList.add('formErrorInputStyle')
        }
        elementButton.classList.add('inputButtonMove')
        errorDay.innerText = notFound.day
    } else{
        errorDay.innerText = ''
        elementButton.classList.remove('inputButtonMove')
    }

// =============================================================================
    
    if(notFound.month !== ''){
        for (let i = 0; i < inputsElements.length; i++) {
            inputsElements[i].classList.add('formErrorStyle')
            inputsElements[i].childNodes[3].classList.add('formErrorInputStyle')
        }
        errorMonth.innerText = notFound.month
    } else{
        errorMonth.innerText = ''
    }

// =============================================================================
    
    if(notFound.year !== ''){
        for (let i = 0; i < inputsElements.length; i++) {
            inputsElements[i].classList.add('formErrorStyle')
            inputsElements[i].childNodes[3].classList.add('formErrorInputStyle')
        }
        errorYear.innerText = notFound.year
    } else{
        errorYear.innerText = ''
    }

// =============================================================================

    if(notFound.year === '' && notFound.month === '' && notFound.day === ''){
        console.log('a')
        for (let i = 0; i < inputsElements.length; i++) {
            inputsElements[i].classList.remove('formErrorStyle')
            inputsElements[i].childNodes[3].classList.remove('formErrorInputStyle')
        }
    } 
}

document.getElementById('dateForm').addEventListener('submit', calculateValues)