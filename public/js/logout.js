const logout = document.getElementById("logout")

logout.addEventListener("click", function () {
    console.log('Botón de logout clickeado')
    fetch('/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .finally(() => {
            window.location.href = '/';
        });

});