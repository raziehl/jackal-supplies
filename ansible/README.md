# Ansible commands        
        
## Main environment initialitaion script

  ansible-playbook playbooks/aws/env_init.yml -e "env=payment_dev"
        
## Deploy the VPN
 
  ansible-playbook playbooks/aws/vpn_deploy.yml -e "env=payment_dev" 
        
## Connect to VPN - on Linux
 
  ansible-playbook playbooks/aws/cip_connect.yml -K -e "env=payment_dev"
        
## Update /etc/hosts file with some usefull hostnames
 
  ansible-playbook playbooks/dev/hosts_update.yml -e "env=payment_dev" -K

## Deploy&Build

  - Build app before running ansible app_build;  

  AWS_PROFILE=relario ansible-playbook playbooks/app_deploy.yml -e "env=payment_dev app=transactions build=true"

## Deploy portainer
 
  ansible-playbook playbooks/aws/portainer_deploy.yml -e "env=payment_dev"
        
## Scale up the servers
 
  ansible-playbook playbooks/aws/worker_add.yml -e "env=payment_dev"

## NPM registry
	ansible-playbook playbooks/npm_registry_update.yml -e "env=payment_dev"
