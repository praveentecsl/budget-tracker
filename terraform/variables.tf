variable "resource_group_name" {
  default     = "praveen-project-rg"
  description = "Name of the resource group"
}

variable "location" {
  default     = "East US"
  description = "Azure Region"
}

variable "project_name" {
  default     = "praveenapp"
  description = "Prefix for all resources (must be lowercase/alphanumeric)"
}