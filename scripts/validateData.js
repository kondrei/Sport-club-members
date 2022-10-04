import infoBox from "./infoBox.js";

export default function validateData(place) {
    const inputs = document.querySelectorAll(`${place} input[type=text]`);
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
    let radios = false;
    document.querySelectorAll(`${place} input[type="radio"]`).forEach(element => {
        if (element.checked) {
            radios = true;
            return false;
        }
    });
    if (!radios) {
        document.querySelectorAll(`${place} input[type="radio"]`).forEach(radio => {
            radio.classList.add('error');
            allCompleted = false;
        })

    }

    (!allCompleted) ? infoBox('Please input required fields!', 'error') : '';

    if (!allCompleted) {
        removeErrorOnChange();
    }

    return allCompleted;
}

function removeErrorOnChange() {

    document.querySelectorAll('input[type=text]').forEach(input => {
        input.addEventListener('keypress', (e) => {
            e.target.classList.remove('error');
            e.target.removeAttribute('placeholder');
        })
    });

    document.querySelectorAll('input[type=radio]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            e.target.classList.remove('error');
        })
    });

    document.querySelectorAll(`select`).forEach(select => {
        select.addEventListener('change', (e) => {
            e.target.classList.remove('error');
        })
    })
}