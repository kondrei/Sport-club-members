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

    (!allCompleted) ? infoBox('Please input required fields!', 'error') : '';
    return allCompleted;
}