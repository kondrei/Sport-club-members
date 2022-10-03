import infoBox from "./infoBox.js";

export default function validateData(place) {
    const inputs = document.querySelectorAll(`${place} input`);
    let allCompleted = true;
    for (let input of inputs) {
        if (!input.value) {
            input.classList.add('error');
            input.setAttribute('placeholder', 'Field required!');
            allCompleted = false;
        };
    }
    const selectBox = document.querySelector(`${place} select`);
    if (!selectBox.value) {
        selectBox.classList.add('error');
        allCompleted = false;
    }
    (!allCompleted) ? infoBox('Please input required fields!', 'error') : '';

    if (!allCompleted) {
        removeErrorOnChange();
    }

    return allCompleted;
}
function removeErrorOnChange() {

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
}