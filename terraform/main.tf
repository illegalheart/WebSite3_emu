terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "rg" {
  name     = "rg-web3emu"
  location = "eastasia"
}

resource "azurerm_static_site" "web" {
  name                = "stapp-web3emu"
  resource_group_name = azurerm_resource_group.rg.name
  location            = "eastasia"
  sku_tier            = "Free"
  sku_size            = "Free"
}

output "deployment_token" {
  value     = azurerm_static_site.web.api_key
  sensitive = true
}

output "default_hostname" {
    value = azurerm_static_site.web.default_host_name
}
