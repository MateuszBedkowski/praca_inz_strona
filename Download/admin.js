document.addEventListener('DOMContentLoaded', function() {
    fetch('/users')
        .then(response => response.json())
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';

            users.forEach(user => {
                const userDiv = document.createElement('div');
                userDiv.innerHTML = `
                    <span>${user.username}</span>
                    <input type="password" placeholder="New Password" id="pass-${user.username}">
                    <button onclick="changePassword('${user.username}')">Change Password</button>
                    <button class="remove" onclick="removeUser('${user.username}')">Remove User</button>
                `;
                userList.appendChild(userDiv);
            });
        });
});

// Change user password
function changePassword(username) {
    const newPassword = document.getElementById(`pass-${username}`).value;
    if (!newPassword) {
        alert('Please enter a new password.');
        return;
    }

    fetch('/change-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password: newPassword })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Password changed successfully.');
        } else {
            alert('Error changing password: ' + data.message);
        }
    });
}

// Remove user
function removeUser(username) {
    if (confirm(`Are you sure you want to remove user ${username}?`)) {
        fetch('/remove-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User removed successfully.');
                location.reload();
            } else {
                alert('Error removing user: ' + data.message);
            }
        });
    }
}
