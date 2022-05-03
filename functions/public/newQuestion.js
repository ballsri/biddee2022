
async function newQuestion() {
	// event.preventDefault();

	const question = document.getElementById('question').value;
    const carID = document.getElementById('carID').value

	const result = await fetch('/newQuestion', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			question,
            carID : carID
		})
	}).then((res) => res.json())

	if (result.status === 'ok') {
		// everythign went fine
		// window.location.href = '/login';
		alert('Success')
		document.getElementById('question').value = ''
		window.location.reload();
	} else {
		alert(result.error)
		// window.location.href = "http://biddee.ddns.net:9000";
	}
}