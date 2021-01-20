async function editReview(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="review-title"]').value.trim();
    const review_body = document.querySelector('textarea[name="review-body"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            review_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.replace('/reviews')
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-review-form').addEventListener('submit', editReview);