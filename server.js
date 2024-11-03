const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: true }));

// Define the directory for user files
const userDirectory = path.join(__dirname, 'Users');

app.use(express.static(path.join(__dirname, 'Login')));
app.use('/Files', express.static(path.join(__dirname, 'Files')));
app.use('/Resources', express.static(path.join(__dirname, 'Resources')));
app.use('/Download', express.static(path.join(__dirname, 'Download')));


// Redirect to login page by default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login', 'login.html'));
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const userFilePath = path.join(__dirname, 'Users', `${username}.txt`);

    // Check if the user file exists
    if (fs.existsSync(userFilePath)) {
        const hashedPassword = fs.readFileSync(userFilePath, 'utf8');
        
        // Compare the password with the hashed password
        bcrypt.compare(password, hashedPassword, (err, result) => {
            if (result) {
                req.session.username = username; // Store username in session
                res.json({ success: true });
            } else {
                res.json({ success: false, message: 'Invalid username or password.' });
            }
        });
    } else {
        res.json({ success: false, message: 'Invalid username or password.' });
    }
});

// Registration route
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userFilePath = path.join(__dirname, 'Users', `${username}.txt`);

    // Check if the user file already exists
    if (fs.existsSync(userFilePath)) {
        return res.json({ success: false, message: 'User already exists.' });
    }

    // Hash the password and save it to a file
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        fs.writeFileSync(userFilePath, hashedPassword);
        res.json({ success: true });
    });
});

// Get all users (admin only)
app.get('/users', (req, res) => {
    if (req.session.username === 'mateusz') {
        fs.readdir(userDirectory, (err, files) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Error reading user directory.' });
            }
            const users = files.map(file => ({
                username: path.basename(file, '.txt') // Extract username from filename
            }));
            res.json(users);
        });
    } else {
        res.status(403).json({ success: false, message: 'Access denied.' });
    }
});

// Change password
app.post('/change-password', (req, res) => {
    const { username, password } = req.body;
    const userFilePath = path.join(__dirname, 'Users', `${username}.txt`);

    if (fs.existsSync(userFilePath)) {
        // Hash the new password and save it to the file
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            fs.writeFileSync(userFilePath, hashedPassword);
            res.json({ success: true });
        });
    } else {
        res.json({ success: false, message: 'User not found.' });
    }
});

// Remove user
app.post('/remove-user', (req, res) => {
    const { username } = req.body;
    const userFilePath = path.join(__dirname, 'Users', `${username}.txt`);

    if (fs.existsSync(userFilePath)) {
        fs.unlinkSync(userFilePath);
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'User not found.' });
    }
});

// Logout route
app.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ success: true });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
