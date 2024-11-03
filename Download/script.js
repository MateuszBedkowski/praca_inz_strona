function copyCommand(command) {
    navigator.clipboard.writeText(command).then(() => {
        alert('Command copied: ' + command);
    }).catch(err => {
        console.error('Failed to copy command: ', err);
    });
}

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

// Add event listener for the Enter key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        handleLogin(); // Trigger login on Enter key press
    }
});

// Function to toggle the logo and instructions
function toggleContent(logoId, tabId) {
    const logo = document.getElementById(logoId);
    const tab = document.getElementById(tabId);

    // Check if the logo is currently hidden
    if (logo.classList.contains("hidden")) {
        logo.classList.remove("hidden"); // Show the logo
        tab.classList.remove("active"); // Hide the instructions
    } else {
        logo.classList.add("hidden"); // Hide the logo
        tab.classList.add("active"); // Show the instructions
    }
}

// Add event listeners for both logos
document.getElementById("logo-linux").addEventListener("click", function () {
    toggleContent("logo-linux", "linux");
});

document.getElementById("logo-windows").addEventListener("click", function () {
    toggleContent("logo-windows", "windows");
});

// Additional script to handle admin button visibility
const currentUsername = sessionStorage.getItem('username');

// Check if the current user is "mateusz"
if (currentUsername === 'mateusz') {
    document.getElementById('admin-button-container').style.display = 'block';
}

function showAdminPanel() {
    window.location.href = 'admin.html';
}
