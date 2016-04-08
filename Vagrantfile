#-*- mode: ruby -*-
# vi: set ft=ruby :

# This will config you local machine
#   If you having problem to up check out the README.md
Vagrant.configure(2) do |config|

  config.vm.define "noosfero-dev"

  # This box has already
  #   - Ruby on Rails 4
  #   - NVM with NodeJS v5.9.0
  config.vm.box = "paulohtfs/noosfero-dev"

  # Network configurations
  #   Check if your host port is available
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "private_network", ip: "10.0.0.15"

  # Change according to you hardware
  config.vm.provider "virtualbox" do |vm|
    vm.memory = 512;
    vm.cpus = 1;
  end
end
