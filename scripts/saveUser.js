import getUsers from "./getUsers.js";
import infoBox from "./infoBox.js";

export default function saveUser(data) {
    const putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users/${data.id}`, putMethod)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch error - saving error')
            }
            return response.json()
        })
        .then(data => {
            infoBox('User saved successfully', 'info');
            getUsers();
        })
        .catch(error => { throw new Error(`Opps, unknown error: ${error}`); })

}
