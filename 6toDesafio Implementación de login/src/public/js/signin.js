const signinForm = document.querySelector('#signinForm');   

signinForm.addEventListener('submit', async event => {
    event.preventDefault();
    const dataForm = new FormData(signinForm);
    const obj = {};
    dataForm.forEach((value, key)=> obj[key]=value);

    console.log(obj)
    fetch('/api/users/signin',{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            },
        }
    ).then (result=>result.json())
    .then(json=>console.log(json));
})