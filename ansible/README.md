# Ansible commands        
        
## Main environment initialitaion script

        ansible-playbook playbooks/aws/env_init.yml -e "env=prod-amethyst"
        
## Deploy the VPN
 
        ansible-playbook playbooks/aws/vpn_deploy.yml -e "env=prod-amethyst" 
        
## Connect to VPN - on Linux
 
        ansible-playbook playbooks/aws/cip_connect.yml -K -e "env=dev-amethyst"
        
## Update /etc/hosts file with some usefull hostnames
 
        ansible-playbook playbooks/dev/hosts_update.yml -e "env=alina-amethyst" -K

## Deploy&Build

  AWS_PROFILE=hypercentage ansible-playbook playbooks/app_deploy.yml -e "env=pandora_dev app=bg-credit build=true"

## Deploy portainer
 
        ansible-playbook playbooks/aws/portainer_deploy.yml -e "env=prod-amethyst"
        
## Scale up the servers
 
        ansible-playbook playbooks/aws/worker_add.yml -e "env=prod-amethyst"

## NPM registry
	ansible-playbook playbooks/npm_registry_update.yml -e "env=pandora_dev"
