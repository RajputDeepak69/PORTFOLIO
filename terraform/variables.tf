variable "project_name" {
  type    = string
  default = "portfolio"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "site_bucket_name" {
  type    = string
}

variable "sender_email" {
  type        = string
  description = "SES verified sender"
}

variable "recipient_email" {
  type        = string
}
