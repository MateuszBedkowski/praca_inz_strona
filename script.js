function showTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));

    document.querySelector(`#${tabName}`).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}

function copyCommand(command) {
    navigator.clipboard.writeText(command).then(() => {
        alert('Command copied: ' + command);
    }).catch(err => {
        console.error('Failed to copy command: ', err);
    });
}

document.getElementById("logo-linux").addEventListener("click", function () {
    const linuxLogo = document.getElementById("logo-linux");
    const windowsLogo = document.getElementById("logo-windows");
    const linuxTab = document.getElementById("linux");
    const windowsTab = document.getElementById("windows");

    // Add flip effect to the Linux logo
    linuxLogo.classList.toggle("flipped");

    // If the Linux logo is flipped, start showing the instructions
    if (linuxLogo.classList.contains("flipped")) {
        setTimeout(() => {
            linuxTab.classList.add("active");
        }, 300); // Start at 50% of the 0.6s flip animation (300ms)
        
        windowsTab.classList.remove("active"); // Hide the windows content
        windowsLogo.classList.remove("flipped"); // Reset windows flip
    } else {
        linuxTab.classList.remove("active");
    }
});

document.getElementById("logo-windows").addEventListener("click", function () {
    const windowsLogo = document.getElementById("logo-windows");
    const linuxLogo = document.getElementById("logo-linux");
    const windowsTab = document.getElementById("windows");
    const linuxTab = document.getElementById("linux");

    // Add flip effect to the Windows logo
    windowsLogo.classList.toggle("flipped");

    // If the Windows logo is flipped, start showing the instructions
    if (windowsLogo.classList.contains("flipped")) {
        setTimeout(() => {
            windowsTab.classList.add("active");
        }, 300); // Start at 50% of the 0.6s flip animation (300ms)
        
        linuxTab.classList.remove("active"); // Hide the Linux content
        linuxLogo.classList.remove("flipped"); // Reset Linux flip
    } else {
        windowsTab.classList.remove("active");
    }
});
