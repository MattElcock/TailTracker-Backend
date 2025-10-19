terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "6.8.0"
    }
  }
}

provider "google" {
  project = var.project_id
  region  = var.region
}

variable "project_id" {
  description = "The GCP project ID"
  type        = string
}

variable "region" {
  description = "The GCP region"
  type        = string
  default     = "europe-west2"
}

variable "database_url" {
  description = "The database connection URL"
  type        = string
}

resource "google_cloud_run_v2_service" "default" {
  name     = "tailtracker-backend"
  location = var.region

  deletion_protection=false

  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = "${var.region}-docker.pkg.dev/${var.project_id}/cloud-run-source-deploy/tailtracker-backend/tailtracker-backend"
      env {
        name  = "DATABASE_URL"
        value = var.database_url
      }
    }

    scaling {
      min_instance_count = 1
      max_instance_count = 1
    }
  }
}