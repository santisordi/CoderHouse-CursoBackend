const signinForm = document.querySelector('#signinForm');   

signinForm.addEventListener('submit', async event => {
    event.preventDefault();
    const dataForm = new FormData(event.target);
    const data = Object.fromEntries(dataForm);
    console.log(data)
    try {
        const response = await fetch('/api/signin',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(data),
        });
        if(response.status === 200){
            const responseData = await response.json();
        } else {
            console.log('Error al crear usuario');
        }
    } catch (error) {
        console.log(error);
    }
});