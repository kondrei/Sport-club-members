
export default function getUsers() {
    fetch('http://localhost:3000/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fetch error - request error')
            }
            return response.json()
        })
        .then(data => data.forEach(element => {
            document.querySelector('.loader').style.display = 'none'
            memberCard(element);
        }))
        .catch(error => {
            throw new Error('Opps, unknown error')
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

const aside = document.querySelector('.aside');

function memberCard({ firstName, lastName, id, address }) {
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
        console.log(e.target)
    });

    const delBtn = addElement(card, 'button', {
        'id': `${id.substr(0, 6)}del`,
        'className': 'delete',
        'innerHTML': 'Delete'
    });


    delBtn.addEventListener('click', (e) => {
        console.log(e.target)
    });
}
