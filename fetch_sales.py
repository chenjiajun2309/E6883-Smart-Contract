import requests
import pandas as pd
from datetime import datetime
from web3 import Web3

# 1️⃣ GraphQL 查询模板，支持分页
QUERY = """
query FetchTakerAsks($first: Int!, $skip: Int!) {
  takerAsks(first: $first, skip: $skip, orderBy: blockTimestamp, orderDirection: desc) {
    id
    transactionHash
    blockNumber
    blockTimestamp
    askUser
    bidUser
    collection
    itemIds
    amounts
    currency
    strategyId
    feeRecipients
    feeAmounts
    nonceInvalidationParameters_orderHash
    nonceInvalidationParameters_orderNonce
    nonceInvalidationParameters_isNonceInvalidated
  }
}
"""

ENDPOINT = "https://api.studio.thegraph.com/query/111278/looksrare-v2-sales/version/latest"

def fetch_all():
    all_items = []
    skip = 0
    batch = 100
    while True:
        variables = {"first": batch, "skip": skip}
        resp = requests.post(ENDPOINT, json={"query": QUERY, "variables": variables})
        data = resp.json()["data"]["takerAsks"]
        if not data:
            break
        all_items += data
        skip += batch
    return all_items

def normalize(data):
    # 扁平化并转换
    rows = []
    for e in data:
        # 时间转换
        ts = int(e["blockTimestamp"])
        time_str = datetime.utcfromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")
        # Wei -> ETH
        # 这里只示例 currency 为 WETH(18 位)，若其他代币精度不同，请自行调整
        fee_eth = [Web3.fromWei(int(x), "ether") for x in e["feeAmounts"]]
        amount_eth = [Web3.fromWei(int(x), "ether") for x in e["amounts"]]
        rows.append({
            "txHash": e["transactionHash"],
            "blockNumber": int(e["blockNumber"]),
            "blockTime": time_str,
            "askUser": e["askUser"],
            "bidUser": e["bidUser"],
            "collection": e["collection"],
            "itemIds": ",".join(e["itemIds"]),
            "amounts": ",".join(str(a) for a in amount_eth),
            "currency": e["currency"],
            "strategyId": int(e["strategyId"]),
            "feeRecipients": ",".join(e["feeRecipients"]),
            "feeAmountsEth": ",".join(str(f) for f in fee_eth),
            "orderHash": e["nonceInvalidationParameters_orderHash"],
            "orderNonce": int(e["nonceInvalidationParameters_orderNonce"]),
            "isInvalidated": e["nonceInvalidationParameters_isNonceInvalidated"]
        })
    return pd.DataFrame(rows)

def main():
    raw = fetch_all()
    df = normalize(raw)
    df.to_csv("looksrare_takerAsks.csv", index=False)
    print("Saved", len(df), "records to looksrare_takerAsks.csv")

if __name__ == "__main__":
    main()
