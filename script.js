function copyToClipboard(textToCopy) {
    const textArea = document.createElement('textarea');
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert('Skopiowano do schowka: ' + textToCopy);
}

function copyCommand(command) {
    navigator.clipboard.writeText(command).catch(function(err) {
        console.error('Could not copy text: ', err);
    });
}
