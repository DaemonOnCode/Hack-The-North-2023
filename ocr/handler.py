import boto3
import json
import requests
from pypdf import PdfReader


def download_pdf(bucketname: str, filename: str):
    s3 = boto3.client("s3")
    fileObj = s3.get_object(Bucket=bucketname, Key=filename)
    file_content = fileObj["Body"].read()
    return file_content


def call_webhook(key, text: str):
    # we'll split the PDF file name to retrieve job application ID
    application_id = key.split("__")[-1].split(".")[0]
    requests.post("https://api.onehirehub.tech/v1/jobs/applications/webhook",
                  json={"text": text, "job_application_id": application_id})


def read_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text


def lambda_handler(event, _):
    bucket_name = event["Records"][0]["s3"]["bucket"]["name"]
    key = event["Records"][0]["s3"]["object"]["key"]

    pdf_file = download_pdf(
        bucket_name,
        key,
    )
    text = read_pdf(pdf_file)
    call_webhook(key, text)
