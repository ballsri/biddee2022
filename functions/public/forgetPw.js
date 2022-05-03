const form = document.getElementById('forget-pw')
form.addEventListener('submit', forgetPw)


async function forgetPw(event) {
    event.preventDefault()
    const email = document.getElementById('email').value

    const result = await fetch('/sent-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        // everythign went fine

        alert('Email has been sent.\nPlease check your email\'s inbox and junk box.')
    } else {
        alert(result.error)
    }
}