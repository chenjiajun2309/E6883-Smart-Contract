#!/usr/bin/env python3
"""
upload_to_sheets.py

Uploads a CSV to Google Sheets.
Usage:
    python upload_to_sheets.py data.csv
"""
import os
import argparse
import pandas as pd
import gspread
from oauth2client.service_account import ServiceAccountCredentials
from gspread_dataframe import set_with_dataframe

def parse_args():
    parser = argparse.ArgumentParser(description="Upload CSV to Google Sheets")
    parser.add_argument("csv_path", help="Path to the CSV file")
    parser.add_argument(
        "--sheet-name", default="LooksRare TakerAsks",
        help="Spreadsheet title"
    )
    parser.add_argument(
        "--worksheet-name", default="raw_data",
        help="Worksheet title"
    )
    parser.add_argument(
        "--credentials", default="credentials.json",
        help="Path to credentials JSON"
    )
    parser.add_argument(
        "--work-dir", help="Directory to switch to before running"
    )
    return parser.parse_args()

def main():
    args = parse_args()
    if args.work_dir:
        os.chdir(args.work_dir)

    df = pd.read_csv(args.csv_path)
    df['blockTime'] = pd.to_datetime(df['blockTime'])
    df['priceEth'] = df['feeAmountsEth'].str.split(',').str[0].astype(float)

    scope = [
        'https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive'
    ]
    creds = ServiceAccountCredentials.from_json_keyfile_name(
        args.credentials, scope
    )
    client = gspread.authorize(creds)

    try:
        sheet = client.open(args.sheet_name)
    except gspread.SpreadsheetNotFound:
        sheet = client.create(args.sheet_name)
    # share to your personal Google account
    YOUR_EMAIL = 'youremail@gmail.com'
    sheet.share(YOUR_EMAIL, perm_type='user', role='writer')
    print(f"Shared spreadsheet with {YOUR_EMAIL}")

    try:
        ws = sheet.worksheet(args.worksheet_name)
        sheet.del_worksheet(ws)
    except gspread.WorksheetNotFound:
        pass

    rows, cols = df.shape
    ws = sheet.add_worksheet(
        title=args.worksheet_name,
        rows=str(rows + 1),
        cols=str(cols)
    )

    set_with_dataframe(ws, df)
    print("Upload complete. Spreadsheet ID:", sheet.id)

if __name__ == "__main__":
    main()
