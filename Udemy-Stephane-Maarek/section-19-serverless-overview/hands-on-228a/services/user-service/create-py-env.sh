#!/bin/bash
# Description: Creating an isolated python environment for your Python project 

# Create a virtual environment using python built in venv
python -m venv user_service_env

# Activate the environment
# On macOS/Linux:
source user_service_env/bin/activate

# On Windows:
# user_service_env\Scripts\activate

# You may need to update pip if you version is old
# pip install --upgrade pip

# Install dependencies
pip install -r requirements.txt

