export function error () {
    const emailInput = document.querySelector('#email')
    emailInput.classList.remove('emailBorder')
    emailInput.classList.add('error')
    emailInput.value = ''
    document.querySelector('#errorMessage').innerText = 'Valid email required'
}