import requests
import pandas as pd
from datetime import datetime
from web3 import Web3

# 1️⃣ GraphQL 查询模板，使用时间戳分页
QUERY = """
query FetchTakerAsks($first: Int!, $timestamp: Int) {
  takerAsks(
    first: $first, 
    orderBy: blockTimestamp, 
    orderDirection: desc,
    where: {blockTimestamp_lt: $timestamp}
  ) {
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
    batch = 100
    # 从当前时间戳开始向后查询
    timestamp = int(datetime.now().timestamp())

    while True:
        variables = {"first": batch, "timestamp": timestamp}
        resp = requests.post(ENDPOINT, json={"query": QUERY, "variables": variables})
        result = resp.json()

        # 检查响应中是否有错误
        if "errors" in result:
            error_message = result["errors"][0]["message"] if result["errors"] else "Unknown GraphQL error"
            print(f"GraphQL Error: {error_message}")
            print(f"Full response: {result}")
            raise Exception(f"GraphQL query failed: {error_message}")

        # 如果没有data字段，也打印完整响应
        if "data" not in result:
            print(f"Unexpected response format: {result}")
            raise Exception("Response missing 'data' field")

        data = result["data"]["takerAsks"]
        if not data:
            break

        all_items += data
        print(f"Fetched {len(data)} records, total: {len(all_items)}")

        # 更新时间戳游标为最后一条记录的时间戳
        timestamp = int(data[-1]["blockTimestamp"])

    return all_items


def normalize(data):
    # 扁平化并转换
    rows = []
    for e in data:
        # 时间转换
        ts = int(e["blockTimestamp"])
        time_str = datetime.utcfromtimestamp(ts).strftime("%Y-%m-%d %H:%M:%S")

        # 修复这里：使用 from_wei 而不是 fromWei
        try:
            # 尝试使用新API (Web3.py >= v6.0.0)
            fee_eth = [Web3.from_wei(int(x), "ether") for x in e["feeAmounts"]]
            amount_eth = [Web3.from_wei(int(x), "ether") for x in e["amounts"]]
        except AttributeError:
            # 如果失败，尝试使用旧API (Web3.py < v6.0.0)
            # 创建Web3实例
            w3 = Web3()
            fee_eth = [w3.fromWei(int(x), "ether") for x in e["feeAmounts"]]
            amount_eth = [w3.fromWei(int(x), "ether") for x in e["amounts"]]

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