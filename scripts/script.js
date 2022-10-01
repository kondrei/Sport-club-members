import collectData from './collectData.js';
import getUsers from './getUsers.js'

getUsers();

const inputs = document.querySelectorAll('input');

for (let input of inputs) {
    input.addEventListener('keypress', (e) => {
        e.target.classList.remove('error');
        e.target.removeAttribute('placeholder')
    })
};

const selectBox = document.querySelector(`select`);

selectBox.addEventListener('change', e => {
    e.target.classList.remove('error');
})
