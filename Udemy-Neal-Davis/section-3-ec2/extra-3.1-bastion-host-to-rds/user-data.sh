#!/bin/bash
# Description: Installs database clients and Docker on the EC2 instance

sudo dnf install mariadb105 -y

sudo dnf install postgresql15.x86_64 -y

sudo dnf install -y docker
sudo service docker start
sudo systemctl enable docker
