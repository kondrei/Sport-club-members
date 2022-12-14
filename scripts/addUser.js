import getUsers from "./getUsers.js";
import infoBox from "./infoBox.js";

export default function addUser(data) {
    const postMethod = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(data)
    };

    fetch(`http://localhost:3000/users/`, postMethod)
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch error - saving error')
            }
            return response.json()
        })
        .then(data => {
            getUsers();
            infoBox('User was added', 'info')
        })
        .catch(error => { throw new Error(`Opps, unknown error: ${error}`); })
}