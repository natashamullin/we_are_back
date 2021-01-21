async function deleteFormHandler(event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        document.location.replace('/reviews');
    } else {
        alert(response.statusText);
        console.log("so sorry")
    }
}

document.querySelector('.delete-review-btn').addEventListener('click', deleteFormHandler);