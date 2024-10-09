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
