

const form = document.getElementById('signUp');
form.addEventListener('submit', registerUser);
const pass = document.getElementById('password')
const conpass = document.getElementById('confirm__password')
pass.addEventListener('keyup', check)
conpass.addEventListener('keyup', check)

async function registerUser(event) {
	event.preventDefault();

	const firstname = document.getElementById('first__name').value;
	const lastname = document.getElementById('last__name').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmpw = document.getElementById('confirm__password').value;

	if(password == confirmpw){
		document.getElementById('password').classList.remove("form__input--error")
		document.getElementById('confirm__password').classList.remove("form__input--error")
		document.getElementById('password').classList.add("input__sucess")
		document.getElementById('confirm__password').classList.add("input__sucess")
	}

	const result = await fetch('/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			firstname,
			lastname,
			email,
			password,
			confirmpw
		})
	}).then((res) => res.json())

	if (result.status === 'ok') {
		// everythign went fine
		window.location.href = '/auth/login';
		alert('Success')
		
	} else {
		alert(result.error)
		// window.location.href = "http://biddee.ddns.net:9000";
	}
}

function check(event){
	console.log(document.getElementById('password').value)
	console.log(document.getElementById('confirm__password').value)
	if(document.getElementById('password').value == document.getElementById('confirm__password').value){
		//console.log("Hee")
		document.getElementById('password').classList.remove("form__input--error")
		document.getElementById('confirm__password').classList.remove("form__input--error")
		document.getElementById('password').classList.add("input__sucess")
		document.getElementById('confirm__password').classList.add("input__sucess")
	}
	else{
		document.getElementById('password').classList.remove("input__sucess")
		document.getElementById('confirm__password').classList.remove("input__sucess")
		document.getElementById('password').classList.add("form__input--error")
		document.getElementById('confirm__password').classList.add("form__input--error")
	}
}