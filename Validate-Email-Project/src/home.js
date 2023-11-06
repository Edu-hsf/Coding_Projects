import { error } from "./error.js"

function getEmail (ev) {
    ev.preventDefault()
    const email = document.querySelector('#email').value

    try {
        validate(email)
        localStorage.getItem('email')
        send(email)
        
        
    } catch {
        console.log('erro na verificação')
        error ()
    }
    return
}

function validate (email) {
    const containsAt = email.match(/(?<=(.\w))@(\w.)/)[0]
    const containsPoint = email.match(/(?<=(.\w))\.(\w.)/)[0]

    const verification = containsAt + containsPoint
    return verification
}

function send (email) {
    localStorage.setItem('email', email)
    window.location = './successPage.html?email=' + email
    return
}

document.querySelector('form').addEventListener('submit', getEmail)