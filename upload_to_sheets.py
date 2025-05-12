import pandas as pd
from df2gspread import df2gspread as d2g
import gspread
from oauth2client.service_account import ServiceAccountCredentials

# 读入你刚生成的 CSV
df = pd.read_csv("looksrare_takerAsks.csv")
df['blockTime'] = pd.to_datetime(df['blockTime'])
# 拿出第一笔 feeAmountsEth 作为 priceEth
df['priceEth'] = df['feeAmountsEth'].str.split(',').str[0].astype(float)

# Google Sheets 认证
scope = [
    'https://spreadsheets.google.com/feeds',
    'https://www.googleapis.com/auth/drive'
]
creds = ServiceAccountCredentials.from_json_keyfile_name("credentials.json", scope)
gc = gspread.authorize(creds)

# 新建表格并推送
SPREADSHEET_KEY = d2g.create(
    spreadsheet_name="LooksRare TakerAsks",
    namespace=gc,
    col_names=list(df.columns),
    clean=False
)
d2g.upload(
    df,
    SPREADSHEET_KEY,
    wks_name="raw_data",
    credentials=creds,
    row_names=False
)
print("✅ 推送完成，表格 ID：", SPREADSHEET_KEY)
