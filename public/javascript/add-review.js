async function newReviewHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="review-title"]').value.trim();
    const review_body = document.querySelector('textarea[name="review-body"]').value.trim();

    const response = await fetch(`/api/reviews`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            review_body
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.ok) {
        document.location.reload();
    } else {
        alert(response.statusText);
    }
}

document.querySelector('.new-review-form').addEventListener('submit', newReviewHandler);