function copyCommand(command) {
    navigator.clipboard.writeText(command).then(() => {
        alert('Command copied: ' + command);
    }).catch(err => {
        console.error('Failed to copy command: ', err);
    });
}

document.getElementById("logo-linux").addEventListener("click", function () {
    const linuxLogo = document.getElementById("logo-linux");
    const linuxTab = document.getElementById("linux");

    if (linuxLogo.classList.contains("hidden")) {
        linuxLogo.classList.remove("hidden"); // Show the logo
        linuxTab.classList.remove("active"); // Hide the instructions
    } else {
        linuxLogo.classList.add("hidden"); // Hide the logo
        linuxTab.classList.add("active"); // Show the instructions
    }
});

document.getElementById("logo-windows").addEventListener("click", function () {
    const windowsLogo = document.getElementById("logo-windows");
    const windowsTab = document.getElementById("windows");

    if (windowsLogo.classList.contains("hidden")) {
        windowsLogo.classList.remove("hidden"); // Show the logo
        windowsTab.classList.remove("active"); // Hide the instructions
    } else {
        windowsLogo.classList.add("hidden"); // Hide the logo
        windowsTab.classList.add("active"); // Show the instructions
    }
});
