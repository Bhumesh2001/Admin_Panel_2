document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('https://digital-vle.up.railway.app/login-admin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
            window.location.href = `https://digital-vle.up.railway.app`;
        } else {
            alert(data.message);
        };

    } catch (error) {
        console.error('Error:', error);
    };
});
