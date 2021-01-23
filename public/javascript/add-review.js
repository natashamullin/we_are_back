async function newReviewHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="review-title"]').value.trim();
    const review_body = document.querySelector('textarea[name="review-body"]').value.trim();
    if (!title || !review_body) {
        return;
    }
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
        console.log("success")
        // document.location.reload();
    } else {
        console.log("fail")
        // alert(response.statusText)
        $('#modalError').modal();
    }
}

document.querySelector('.new-review-form').addEventListener('submit', newReviewHandler);