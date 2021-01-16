async function signupFormHandler(event) {
    event.preventDefault();

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                name,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });


        //check if response is ok 
        if (response.ok) {
            console.log("you did it!");
        } else {
            alert(response.statusText);
        }
    }
}
console.log(document.querySelector('#signup-form'))

document.querySelector('form#signup-form').addEventListener('submit', signupFormHandler)