import deleteUser from "./deleteUser.js";
import editUser from "./editUser.js";
import infoBox from "./infoBox.js";

export default function getUsers() {
    document.querySelector('.loader').style.display = 'inline-block';
    fetch('http://localhost:3000/users')
        .then((response) => {
            if (!response.ok) {
                infoBox('Fetch error - request error', 'error');
                throw new Error('Fetch error - request error')
            }
            document.querySelector('.loader').style.display = 'none';
            return response.json();
        })
        .then(data => data.forEach(element => {
            document.querySelector('.loader').style.display = 'none';
            return memberCard(element);
        }))
        .catch(error => {
            document.querySelector('.loader').style.display = 'none';
            infoBox(`Opps, unknown error: ${error}`, `Opps, unknown error: ${error}`);
            throw new Error(`Error: ${error}`);
        })


}

function addElement(parent, type, attributes) {
    const element = document.createElement(type);
    for (let key in attributes) {
        element[key] = attributes[key];
    };
    parent.appendChild(element);

    return element;
}


function memberCard({ firstName, lastName, id, address }) {
    const aside = document.querySelector('.aside');
    const memberCard = addElement(aside, 'div', { 'className': 'memberCard' });

    addElement(memberCard, 'div', {
        'className': 'avatar',
        'innerHTML': `${firstName[0]} ${lastName[0]}`
    })

    const card = addElement(memberCard, 'div', { 'className': 'card' });

    addElement(card, 'div', {
        'className': 'name',
        'innerHTML': `${firstName} ${lastName}`
    });

    addElement(card, 'div', {
        'className': 'id',
        'innerHTML': `ID: ${id.substr(0, 6)}`
    });

    addElement(card, 'div', {
        'className': 'country',
        'innerHTML': `${address.country}`
    });

    const editBtn = addElement(card, 'button', {
        'id': `${id.substr(0, 6)}edit`,
        'className': 'edit',
        'innerHTML': 'Edit'
    });

    editBtn.addEventListener('click', (e) => {
        editUser(id);
    });

    const delBtn = addElement(card, 'button', {
        'id': `${id.substr(0, 6)}del`,
        'className': 'delete',
        'innerHTML': 'Delete'
    });


    delBtn.addEventListener('click', (e) => {
        deleteUser(id);
    });
}
