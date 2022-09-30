import getUsers from './getUsers.js'

window.addEventListener('load', getUsers())

const inputs = document.querySelectorAll('input');

for (let input of inputs) {
    input.addEventListener('keypress', (e) => {
        e.target.classList.remove('error');
        e.target.removeAttribute('placeholder')
    })
}
