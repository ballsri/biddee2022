const form = document.getElementById('return')
form.addEventListener('back', returnLogin);

function returnLogin(event) {
        window.location.href = "/auth/login";
    
}