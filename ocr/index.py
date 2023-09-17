from pypdf import PdfReader
import requests
import boto3


def download_pdf(bucketname: str, filename: str):
    s3 = boto3.client("s3")
    fileObj = s3.get_object(Bucket=bucketname, Key=filename)
    file_content = fileObj["Body"].read()
    return file_content


def call_webhook(text: str):
    print("Calling webhook")
    requests.post("localhost:8000/webhook", json={"text": text})


def read_pdf(file):
    reader = PdfReader(file)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
        print(text)
        print()
    return text


def lambda_handler(event, _):
    pdf_file = download_pdf(
        event["Records"][0]["s3"]["bucket"]["name"],
        event["Records"][0]["s3"]["object"]["key"],
    )
    text = read_pdf(pdf_file)
    call_webhook(text)
    