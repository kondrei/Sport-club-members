export default function editUser(id) {
    document.querySelector('.loader').style.display = 'inline-block';
    fetch(`http://localhost:3000/users/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fetch error - request error')
            }
            return response.json()
        })
        .then(data => {
            getInputs(data);
            document.querySelector('.loader').style.display = 'none';
        }
        )
        .catch(error => {
            throw new Error(`Opps, unknown error: ${error}`);
        })
};

function getInputs(data) {
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
                // console.log(input.name, data[element]);

                for (let sport in data[element]) {
                    if (data[element][sport] === input.name) {
                        input.setAttribute('checked', '')
                    }
                }
            }
        }
    }
    const gender = document.querySelector('.editMember select');
    gender.value = data.gender;
}
