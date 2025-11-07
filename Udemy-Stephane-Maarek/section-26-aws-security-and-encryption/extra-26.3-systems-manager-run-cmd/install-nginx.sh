#!/bin/bash
sudo dnf update -y
## Install Nginx
sudo dnf install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
sudo systemctl status nginx

# Enable Nginx to start on boot
sudo systemctl enable nginx
# You can verify it was enabled with:
sudo systemctl is-enabled nginx