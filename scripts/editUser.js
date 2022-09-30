import validateData from "./validateData.js";
import collectData from "./collectData.js";
import getUsers from "./getUsers.js";

export default function editUser(id) {
    document.querySelector('.loader').style.display = 'inline-block';
    fetch(`http://localhost:3000/users/${id}`)
        .then((response) => {
            if (!response.ok) {
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
    inputs.forEach(element => element.classList.remove('error'));
    const radios = document.querySelectorAll('.editMember input[type=checkbox]');
    for (let radio of radios) {
        radio.removeAttribute('checked');
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
                        input.setAttribute('checked', '');
                    }
                }
            }
        }
    }
    const gender = document.querySelector('.editMember select');
    gender.value = data.gender;
}

function saveUser(data) {
    console.log('fetching', data.id);
    const putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    }

    fetch(`http://localhost:3000/users/${data.id}`, putMethod)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch error - saving error')
            }
            return response.json()
        })
        .then(data => {
            console.log('data was saved');
            document.querySelector('.aside').innerHTML = '';
            getUsers();
        })
        .catch(error => { throw new Error(`Opps, unknown error: ${error}`); })

}

const editBtn = document.querySelector('.editMember  button');
editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateData()) {
        saveUser(collectData('.editMember'));
    } else {
        console.log('complete data');
    }
})

