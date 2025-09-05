# Install node
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"
nvm install 22
node -v

# Install pip
sudo dnf install -y python3-pip


#!/bin/bash
yum update -y
yum install -y httpd
systemctl start httpd
systemctl enable httpd


# For Amazon Linux 2 only
#!/bin/bash
sudo yum update -y
## Install Nginx
sudo amazon-linux-extras install nginx1 -y
sudo service nginx start
# Enable Nginx to Start on Boot
sudo systemctl enable nginx


# Amazon Linux 2023
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
