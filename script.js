function copyCommand(command) {
    navigator.clipboard.writeText(command).then(() => {
        alert('Command copied: ' + command);
    }).catch(err => {
        console.error('Failed to copy command: ', err);
    });
}

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

document.getElementById("linux").addEventListener("click", function () {
    toggleContent("logo-linux", "linux");
});

document.getElementById("windows").addEventListener("click", function () {
    toggleContent("logo-windows", "windows");
});
