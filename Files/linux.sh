#!/bin/bash

# Colors
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color



if [[-f /etc/arch-release]]; then
    echo -e "${RED}Arch ${YELLOW}detected\n"
    echo -e "${YELLOW}Updating Arch Linux system${NC}"
    sudo pacman -Syu --noconfirm

    if [ $? -ne 0 ]; then
        echo -e "${RED}System update failed${NC}"
        exit 1
    fi

    echo -e "${YELLOW}\n\n Installing required modules and libraries${NC}"
    sudo pacman -S tk --noconfirm

    if [ $? -ne 0 ]; then
        echo -e "${RED}Installation of modules and libraries failed${NC}"
        exit 1
    fi
elif [[ -f /etc/fedora-release ]]; then
    echo -e "${RED}Fedora ${YELLOW}detected\n"
    echo -e "${YELLOW}Updating Fedora Linux system${NC}"
    sudo dnf update -y

    if [ $? -ne 0 ]; then
        echo -e "${RED}System update failed${NC}"
        exit 1
    fi

    echo -e "${YELLOW}\n\n\n\nInstalling required modules and libraries${NC}"
    sudo dnf install python3-tkinter -y

    if [ $? -ne 0 ]; then
        echo -e "${RED}Installation of modules and libraries failed${NC}"
        exit 1
    fi
elif [[ -f /etc/debian_version ]]; then
    echo -e "${RED}Debian/Ubuntu ${YELLOW}detected\n"
    echo -e "${YELLOW}Updating Debian/Ubuntu Linux system${NC}"
    sudo apt update -y

    if [ $? -ne 0 ]; then
        echo -e "${RED}System update failed${NC}"
        exit 1
    fi

    echo -e "${YELLOW}\n\n\n\nInstalling required modules and libraries${NC}"
    sudo apt install python3-venv python3-tk -y

    if [ $? -ne 0 ]; then
        echo -e "${RED}Installation of modules and libraries failed${NC}"
        exit 1
    fi
else
    echo "Unsupported Linux distribution"
    exit 1
fi

echo -e "${YELLOW}\n\n Preparing environment${NC}"
python3 -m venv venv

if [ $? -ne 0 ]; then
    echo -e "${RED}Virtual environment creation failed${NC}"
    exit 1
fi

source venv/bin/activate

if [ $? -ne 0 ]; then
    echo -e "${RED}Activation of virtual environment failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n Upgrading PIP${NC}"
pip3 install --upgrade pip

if [ $? -ne 0 ]; then
    echo -e "${RED}PIP upgrade failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n Installing dependencies${NC}"
pip3 install requests

if [ $? -ne 0 ]; then
    echo -e "${RED}Installation of dependencies failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n Installation is done...\n\n${NC}"
#echo -e "${RED}IMPORTANT\n\n${NC}"

echo -e "${YELLOW}Running ${RED}VulnAgent${YELLOW} !!${NC}"
python3 test_main.py

deactivate
rm -rf venv/
rm result.txt
# echo -e "${YELLOW}You have to run now ${RED}\"source venv/bin/activate\"${YELLOW} to activate virtual environment.\n
# Next you have to run ${RED}\"./VulnAgent\"${YELLOW}${NC}"

# echo -e "${YELLOW}After you receive result from VulnAgent, please run ${RED}\"deactivate\"${YELLOW} to close virtual environment${NC}"

