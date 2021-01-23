async function signinFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#formEmail').value.trim();
    const password = document.querySelector("#formPassword").value.trim();
    console.log(email)
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("you made it to here")
            document.location.replace('/');
        } else {
            // alert(response.statusText)
            $('#modalError').modal();
        }
    }
}


document.querySelector('#signinForm').addEventListener('submit', signinFormHandler);