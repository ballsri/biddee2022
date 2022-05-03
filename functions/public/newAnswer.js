async function newAnswer(questionID) {

	const answer = document.getElementById('answer' + questionID).value;
    const carID = document.getElementById('carID' + questionID).value;


	const result = await fetch('/newAnswer', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			answer : answer,
            carID : carID,
            questionID : questionID
		})
	}).then((res) => res.json())

	if (result.status == 'ok') {
		// everythign went fine
		// window.location.href = '/login';
		alert('Success')
		document.getElementById('answer' + questionID).value = ''
		window.location.reload();
	} else {
		alert(result.error)
		// window.location.href = "http://biddee.ddns.net:9000";
	}
}