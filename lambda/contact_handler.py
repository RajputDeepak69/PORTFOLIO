import json
import boto3
import os
import base64

ses = boto3.client("ses")

SENDER = os.getenv("SENDER_EMAIL")
RECIPIENT = os.getenv("RECIPIENT_EMAIL")


def lambda_handler(event, context):
    try:
        if event.get("requestContext", {}).get("http", {}).get("method") == "OPTIONS":
            return {
                "statusCode": 200,
                "headers": {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "OPTIONS,POST",
                    "Access-Control-Allow-Headers": "Content-Type",
                },
                "body": json.dumps({
                    "message": "CORS preflight OK"
                }),
            }

        body = event.get("body") or ""

        if event.get("isBase64Encoded"):
            body = base64.b64decode(body).decode("utf-8")

        data = (
            json.loads(body)
            if isinstance(body, str) and body.strip().startswith("{")
            else {}
        )

        email = data.get("email")
        message = data.get("message", "")

        if not email:
            return {
                "statusCode": 400,
                "headers": {
                    "Access-Control-Allow-Origin": "*"
                },
                "body": json.dumps({
                    "error": "Missing email"
                }),
            }

        subject = f"Portfolio contact from {email}"

        text = (
            f"From: {email}\n\n"
            f"Message:\n{message}"
        )

        response = ses.send_email(
            Source=SENDER,
            Destination={
                "ToAddresses": [RECIPIENT]
            },
            Message={
                "Subject": {
                    "Data": subject
                },
                "Body": {
                    "Text": {
                        "Data": text
                    }
                },
            },
        )

        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "messageId": response.get("MessageId")
            }),
        }

    except Exception as e:
        print(f"Error sending email: {e}")

        return {
            "statusCode": 500,
            "headers": {
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "error": "Unable to send message"
            }),
        }

