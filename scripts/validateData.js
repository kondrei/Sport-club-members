export default function validateData() {
    const inputs = document.querySelectorAll('.editMember input');
    let allCompleted = true;
    for (let input of inputs) {
        if (!input.value) {
            input.classList.add('error');
            input.setAttribute('placeholder', 'Field required!');
            allCompleted = false;
        };
    }
    return allCompleted;
}