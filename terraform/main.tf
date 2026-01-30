resource "azurerm_resource_group" "rg" {
  name     = var.resource_group_name
  location = var.location
}

# 1. Private Container Registry (ACR)
resource "azurerm_container_registry" "acr" {
  name                = "${var.project_name}registry"
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true
}

# 2. Environment for Container Apps
resource "azurerm_container_app_environment" "env" {
  name                       = "${var.project_name}-env"
  location                   = azurerm_resource_group.rg.location
  resource_group_name        = azurerm_resource_group.rg.name
}

# 3. Cosmos DB with MongoDB API
resource "azurerm_cosmosdb_account" "db" {
  name                = "${var.project_name}-cosmos-db"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  offer_type          = "Standard"
  kind                = "MongoDB"

  capabilities { name = "EnableMongo" }
  capabilities { name = "EnableServerless" }

  consistency_policy {
    consistency_level = "Session"
  }

  geo_location {
    location          = var.location
    failover_priority = 0
  }
}