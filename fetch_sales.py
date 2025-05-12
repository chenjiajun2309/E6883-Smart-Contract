import requests, pandas as pd, time, json

# 把这里换成你自己的 subgraph + 版本号
ENDPOINT = "https://api.studio.thegraph.com/query/111278/looksrare-v2-sales/v0.0.1"
print("▶️ Using endpoint:", ENDPOINT)

QUERY = """
query($first: Int!, $blockNumber_lt: BigInt) {
  takerAsks(
    first: $first,
    orderBy: blockNumber,
    orderDirection: desc,
    where: { blockNumber_lt: $blockNumber_lt }
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

def fetch_all(page_size=1000):
    all_items = []
    last_block = None
    while True:
        variables = {"first": page_size, "blockNumber_lt": last_block or 10**30}
        resp = requests.post(ENDPOINT, json={"query": QUERY, "variables": variables})
        print("→ HTTP", resp.status_code)
        body = resp.json()
        if "errors" in body:
            raise RuntimeError("GraphQL error:\n" + json.dumps(body["errors"], indent=2))
        batch = body["data"]["takerAsks"]
        if not batch:
            break
        all_items.extend(batch)
        last_block = min(int(item["blockNumber"]) for item in batch)
        time.sleep(0.2)
    return all_items

def main():
    items = fetch_all()
    df = pd.json_normalize(items)
    df.to_csv("looksrare_takerAsks.csv", index=False)
    print(f"✅ Saved {len(items)} records to looksrare_takerAsks.csv")

if __name__ == "__main__":
    main()
