import validateData from "./validateData.js";
import collectData from "./collectData.js";
import saveUser from "./saveUser.js";
import addUser from "./addUser.js";
import infoBox from "./infoBox.js";

export default function editUser(id) {
    document.querySelector('.loader').style.display = 'inline-block';
    fetch(`http://localhost:3000/users/${id}`)
        .then((response) => {
            if (!response.ok) {
                infoBox('Fetch error - request error', 'error');
                throw new Error('Fetch error - request error');
            }
            return response.json();
        })
        .then(data => {
            fillInputs(data, id);
            document.querySelector('.loader').style.display = 'none';
        }
        )
        .catch(error => {
            throw new Error(`Opps, unknown error: ${error}`);
        })
};

function fillInputs(data) {
    const inputs = document.querySelectorAll('.editMember input');
    inputs[1].focus();
    inputs.forEach(element => element.classList.remove('error'));
    const radios = document.querySelectorAll('.editMember input[type=checkbox]');
    for (let radio of radios) {
        radio.checked = false;
    }
    for (let element in data) {
        for (let input of inputs) {
            if ((input.name === element)) {
                input.value = data[element];
            };
            for (let addresFields in data.address) {
                if ((input.name === addresFields)) {
                    input.value = data.address[addresFields];
                };
            };
            if (element == 'activity_class' && input.type == 'radio' && data[element] == input.value) {
                input.checked = true;
            }

            if (element == 'sports' && input.type == 'checkbox') {
                for (let sport in data[element]) {
                    if (data[element][sport] === input.name) {
                        input.checked = true;
                    }
                }
            }
        }
    }
    const gender = document.querySelector('.editMember select');
    gender.value = data.gender;
}


const editBtn = document.querySelector('.editMember button');
editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateData('.editMember')) {
        saveUser(collectData('.editMember'));
    }
});

const saveBtn = document.querySelector('.newMember button');
saveBtn.addEventListener('click', e => {
    e.preventDefault();
    if (validateData('.newMember')) {
        addUser(collectData('.newMember'));
    }
})