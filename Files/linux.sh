#!/bin/bash

# Self-extracting script template
ARCHIVE_NAME="VulnAgent.tar.gz"
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# Extract the archive
tail -n +$(($(grep -na "^__ARCHIVE_BELOW__$" "$0" | cut -d: -f1) + 1)) "$0" | tar -xz -C "$TEMP_DIR"

# Detect the OS and distribution
OS=$(uname -s)
if [[ "$OS" == "Linux" ]]; then
    if [[ -f /etc/arch-release ]]; then
        "$TEMP_DIR/arch.sh"
    elif [[ -f /etc/debian_version ]]; then
        "$TEMP_DIR/debian.sh"
    elif [[ -f /etc/fedora-release ]]; then
        "$TEMP_DIR/fedora.sh"
    else
        echo "Unsupported Linux distribution"
        exit 1
    fi
elif [[ "$OS" == "Darwin" ]]; then
    echo "MacOS not supported"
    exit 1
else
    echo "Unsupported operating system"
    exit 1
fi

# Run the main Python script
source "$TEMP_DIR/venv/bin/activate"
pip3 install --upgrade pip
#pip3 install requests
python3 "$TEMP_DIR/VulnAgent.py"
deactivate

exit 0

__ARCHIVE_BELOW__
