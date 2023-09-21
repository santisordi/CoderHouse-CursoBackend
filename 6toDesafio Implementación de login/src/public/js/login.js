const form = document.getElementById('#formLogin');

form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const dataForm = new FormData(form);
    const obj = {};

    dataForm.forEach((value, key) => obj[key] = value);
    fetch('/api/sessions/', {
        method: 'POST',
        body: JSON.stringify(odj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then (result => result.json())
        .then (json.resultado === 'Login valido')

})