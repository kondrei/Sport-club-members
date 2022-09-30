import getUsers from "./getUsers.js";

export default function deleteUser(id) {
    document.querySelector('.dialogBox').style.display = 'inline';
    document.querySelector('.buttons .delete').addEventListener('click', event => {
        document.querySelector('.dialogBox').style.display = 'none';
    });

    document.querySelector('.buttons .yes').addEventListener('click', (event => {
        event.preventDefault();
        fetchDelete(id);
    }));

}


function fetchDelete(id) {
    document.querySelector('.dialogBox').style.display = 'none';
    fetch(`http://localhost:3000/users/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Fetch error - deleting error')
            }
            return response;
        })
        .then((data) => {
            document.querySelector('.aside').innerHTML = '';
            getUsers();
        })
        .catch(error => { throw new Error(`Opps, unknown error: ${error}`); })
}