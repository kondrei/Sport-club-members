import getUsers from './getUsers.js'

window.addEventListener('load', e =>
    getUsers()
)

const inputs = document.querySelectorAll('input');

for (let input of inputs) {
    input.addEventListener('keypress', (e) => {
        e.target.classList.remove('error')
    })
}