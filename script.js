// function showTab(tabName) {
//     const tabs = document.querySelectorAll('.tab');
//     const contents = document.querySelectorAll('.tab-content');

//     tabs.forEach(tab => tab.classList.remove('active'));
//     contents.forEach(content => content.classList.remove('active'));

//     document.querySelector(`#${tabName}`).classList.add('active');
//     document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
// }

// function copyCommand(command) {
//     navigator.clipboard.writeText(command).then(() => {
//         alert('Command copied: ' + command);
//     }).catch(err => {
//         console.error('Failed to copy command: ', err);
//     });
// }

// Function to flip the Linux logo and show the Linux instructions
document.getElementById("logo-linux").addEventListener("click", function () {
    const linuxLogo = document.getElementById("logo-linux");
    const windowsLogo = document.getElementById("logo-windows");
    const linuxTab = document.getElementById("linux");
    const windowsTab = document.getElementById("windows");

    // Add flip effect to the Linux logo
    linuxLogo.classList.toggle("flipped");

    // If flipped, show the Linux tab content
    if (linuxLogo.classList.contains("flipped")) {
        linuxTab.classList.add("active");
        windowsTab.classList.remove("active"); // Hide the windows content
        windowsLogo.classList.remove("flipped"); // Reset windows flip
    } else {
        linuxTab.classList.remove("active");
    }
});

// Function to flip the Windows logo and show the Windows instructions
document.getElementById("logo-windows").addEventListener("click", function () {
    const windowsLogo = document.getElementById("logo-windows");
    const linuxLogo = document.getElementById("logo-linux");
    const windowsTab = document.getElementById("windows");
    const linuxTab = document.getElementById("linux");

    // Add flip effect to the Windows logo
    windowsLogo.classList.toggle("flipped");

    // If flipped, show the Windows tab content
    if (windowsLogo.classList.contains("flipped")) {
        windowsTab.classList.add("active");
        linuxTab.classList.remove("active"); // Hide the Linux content
        linuxLogo.classList.remove("flipped"); // Reset Linux flip
    } else {
        windowsTab.classList.remove("active");
    }
});
