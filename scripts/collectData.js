export default function collectData(location) {
    const data = {};
    data.address = {};
    const sports = [];

    const inputs = document.querySelectorAll(`${location} input`);
    for (let input of inputs) {
        if (input.name === 'postalCode' || input.name == 'streetAndNumber' || input.name == 'city' || input.name == 'country') {
            data.address[input.name] = input.value;
        } else if (input.type == 'checkbox') {
            input.hasAttribute('checked') ? sports.push(input.name) : '';
        } else if (input.type == 'radio') {
            (input.checked) ? data.activity_class = input.value : '';
        }
        else {
            data[input.name] = input.value;
        }
        if (input.name == 'id') {
            data.id = input.value;
        }
    };
    const gender = document.querySelector(`${location} select`);
    data.gender = gender.value;
    data.sports = sports;
    return data;
};

