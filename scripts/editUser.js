import validateData from "./validateData.js";

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
            fillInputs(data);
            document.querySelector('.loader').style.display = 'none';
        }
        )
        .catch(error => {
            throw new Error(`Opps, unknown error: ${error}`);
        })
};

function fillInputs(data) {
    const inputs = document.querySelectorAll('.editMember input');
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

function collectData() {
    const data = {};
    const inputs = document.querySelectorAll('.editMember input');
    for (let input of inputs) {
        if (input.name = 'streetAndNumber') {
            data.address[input.name] = input.value;
            console.log(input.name);
            // data.address = input.value;
        } else {
            data[input.name] = input.value;
        }
    };
    console.log(data);
};


const editBtn = document.querySelector('.editMember  button');
editBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (validateData()) {
        collectData();
    } else {
        console.log('complete data');
    }
})