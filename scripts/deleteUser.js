import getUsers from "./getUsers.js";
import infoBox from "./infoBox.js";

export default function deleteUser(id) {
    document.querySelector('.dialogBox').style.display = 'inline';
    document.querySelector('.buttons .delete').addEventListener('click', event => {
        document.querySelector('.dialogBox').style.display = 'none';
    });

    document.querySelector('.buttons .yes').addEventListener('click', (event) => {
        event.preventDefault();
        fetchDelete(id);
    });

}


function fetchDelete(id) {
    document.querySelector('.dialogBox').style.display = 'none';
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                infoBox('Fetch error - deleting error', 'error');
                throw new Error('Fetch error - deleting error')
            }
            return response;
        })
        .then((data) => {
            infoBox('User deleted!', 'info');
            document.querySelector('.aside').innerHTML = '';
            getUsers();
        })
        .catch(error => {
            infoBox(`Opps, unknown error: ${error}`);
            throw new Error(`Opps, unknown error: ${error}`);
        })
}