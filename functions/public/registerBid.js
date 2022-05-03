// const form = document.getElementById('registerBid')
// form.addEventListener('submit', registerBid)

// async function registerBid(event) {
//     event.preventDefault()
//     const name = document.getElementById('name').value
//     const credit_card = document.getElementById('credit_card').value
//     const expiration = document.getElementById('expiration').value
//     const cvc = document.getElementById('cvc').value
//     const zip = document.getElementById('zip').value
//     const phone = document.getElementById('phone').value

//     const result = await fetch('/register-bid', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name,
//             credit_card,
//             expiration,
//             cvc,
//             zip,
//             phone
//         })
//     }).then((res) => res.json())

//     if (result.status === 'ok') {
//         // everythign went fine
        
//         alert('Registered bid')
//     } else {
//         alert(result.error)
//     }
// }

