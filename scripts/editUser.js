export default function editUser(id) {
    fetch(`http://localhost:3000/users/${id}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Fetch error - request error')
            }
            return response.json()
        })
        .then(data => console.log(data))
        // .then(data => data.forEach(element => {
        //     document.querySelector('.loader').style.display = 'none'
        //     memberCard(element);
        // }))
        .catch(error => {
            throw new Error('Opps, unknown error')
        })
}