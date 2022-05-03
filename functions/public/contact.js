

const form = document.getElementById('contactInfo');
form.addEventListener('submit', contact);

async function contact(event) {
	event.preventDefault();

	const First_Name = document.getElementById('firstName').value;
	const Last_Name = document.getElementById('lastName').value;
	const Email = document.getElementById('email').value;
	const Subject = document.getElementById('subject').value;
	const Message = document.getElementById('message').value;

    // console.log(value)

	const result = await fetch('/contact', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			First_Name,
			Last_Name,
			Subject,
			Email,
			Message
		})
	}).then((res) => res.json())

	if (result.status === 'ok') {
		// everythign went fine
		// window.location.href = '/login';
		alert('Success')
		document.getElementById('firstName').value = ''
		document.getElementById('lastName').value = ''
		document.getElementById('subject').value = ''
		document.getElementById('email').value = ''
		document.getElementById('message').value = ''
		
	} else {
		alert(result.error)
		// window.location.href = "http://biddee.ddns.net:9000";
	}
}