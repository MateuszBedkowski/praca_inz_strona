#!/bin/bash

# Colors
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Updating Arch Linux system${NC}"
sudo pacman -Syu --noconfirm

if [ $? -ne 0 ]; then
    echo -e "${RED}System update failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n\n\nInstalling required modules and libraries${NC}"
sudo pacman -S python3 tk --noconfirm

if [ $? -ne 0 ]; then
    echo -e "${RED}Installation of modules and libraries failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n\n\nPreparing environment${NC}"
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

echo -e "${YELLOW}\n\n\n\nUpgrading PIP${NC}"
pip3 install --upgrade pip

if [ $? -ne 0 ]; then
    echo -e "${RED}PIP upgrade failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n\n\nInstalling dependencies${NC}"
pip3 install requests

if [ $? -ne 0 ]; then
    echo -e "${RED}Installation of dependencies failed${NC}"
    exit 1
fi

echo -e "${YELLOW}\n\n\n\nInstallation is done...\n\n${NC}"
#echo -e "${RED}IMPORTANT\n\n${NC}"

echo -e "${YELLOW}Running ${RED}VulnAgent${YELLOW} !!${NC}"
python3 test_main.py

deactivate
rm -rf venv/
rm result.txt
# echo -e "${YELLOW}You have to run now ${RED}\"source venv/bin/activate\"${YELLOW} to activate virtual environment.\n
# Next you have to run ${RED}\"./VulnAgent\"${YELLOW}${NC}"

# echo -e "${YELLOW}After you receive result from VulnAgent, please run ${RED}\"deactivate\"${YELLOW} to close virtual environment${NC}"

