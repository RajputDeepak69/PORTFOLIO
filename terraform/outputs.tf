output "s3_bucket_name" {
  description = "S3 bucket containing the portfolio website"
  value       = aws_s3_bucket.site.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID"
  value       = aws_cloudfront_distribution.cdn.id
}

output "cloudfront_url" {
  description = "CloudFront URL for the portfolio"
  value       = "https://${aws_cloudfront_distribution.cdn.domain_name}"
}

output "api_gateway_url" {
  description = "API Gateway endpoint for the contact form"
  value       = aws_apigatewayv2_api.http_api.api_endpoint
}

output "lambda_function_name" {
  description = "Lambda contact function name"
  value       = aws_lambda_function.contact.function_name
}
