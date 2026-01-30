output "registry_login_server" {
  value = azurerm_container_registry.acr.login_server
}

output "cosmosdb_connection_string" {
  value     = azurerm_cosmosdb_account.db.connection_strings[0]
  sensitive = true
}

output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}