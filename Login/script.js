// Function to handle login
function handleLogin() {
    const username = document.getElementById('user').value;
    const password = document.getElementById('pass').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            sessionStorage.setItem('username', username); // Store the username in session storage
            window.location.href = '../Download/index.html'; // Redirect after successful login
        } else {
            alert('Invalid username or password.');
        }
    })
    .catch(error => {
        console.error('Error during login:', error);
        alert('An error occurred during login.');
    });
}

// Function to handle registration
function handleRegister() {
    const username = document.getElementById('new_user').value;
    const password = document.getElementById('new_pass').value;

    if (!username || !password) {
        alert('Please enter both username and password.');
        return;
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html'; // Redirect to login page after successful registration
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('An error occurred during registration.');
    });
}

// Add event listener for the Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        // Check if the registration box is visible
        const registerBox = document.querySelector('.register_box');
        if (registerBox && registerBox.style.display !== 'none') {
            handleRegister(); // Trigger register on Enter key press
        } else {
            handleLogin(); // Trigger login on Enter key press
        }
    }
});

// Additional script to handle admin button visibility
const currentUsername = sessionStorage.getItem('username');

// Check if the current user is "mateusz"
if (currentUsername === 'mateusz') {
    document.getElementById('admin-button-container').style.display = 'block';
}

// Function to show login
function showLogin() {
    console.log('Redirecting to login page...');
}
