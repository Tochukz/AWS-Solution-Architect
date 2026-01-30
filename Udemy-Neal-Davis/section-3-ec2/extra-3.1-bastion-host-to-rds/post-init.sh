#!/bin/bash
# Description: Creates additional user on EC2 instance.
# Must be run as root and after the instance has been provisioned.  

NEW_USER="bastion"
adduser $NEW_USER

# Add to wheel for sudo
usermod -aG wheel $NEW_USER

mkdir -p /home/$NEW_USER/.ssh
cp /home/ec2-user/.ssh/authorized_keys /home/$NEW_USER/.ssh/
chown -R $NEW_USER:$NEW_USER /home/$NEW_USER/.ssh
chmod 700 /home/$NEW_USER/.ssh
chmod 600 /home/$NEW_USER/.ssh/authorized_keys

# Allow passwordless sudo
echo "$NEW_USER ALL=(ALL) NOPASSWD:ALL" > /etc/sudoers.d/$NEW_USER
chmod 440 /etc/sudoers.d/$NEW_USER

# Optional:  Prevent ssh access to default ec2-user
# rm -f /home/ec2-user/.ssh/authorized_keys

# Fix SELinux context for SSH
restorecon -Rv /home/$NEW_USER/.ssh
