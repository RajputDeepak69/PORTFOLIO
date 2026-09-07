variable "project_name" {
  type    = string
  default = "portfolio"
}

variable "region" {
  type    = string
  default = "us-east-1"
}

variable "sender_email" {
  type        = string
  description = "SES verified sender"
}

variable "recipient_email" {
  type        = string
}
