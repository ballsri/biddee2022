const form = document.getElementById('resetPw')
form.addEventListener('submit', resetPw)


async function resetPw(event) {
    event.preventDefault()
    const userId = document.getElementById("userId").value;
    const newpassword = document.getElementById('password').value
    const confirmpw = document.getElementById('confirm--password').value
    // console.log(userId);
    const result = await fetch('/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId,
            newpassword,
            confirmpw
        })
    }).then((res) => res.json())

    if (result.status === 'ok') {
        // everythign went fine

        alert('Your password has been saved!')
        window.location.href = "/auth/login";
    } else {
        alert(result.error)
    }
}