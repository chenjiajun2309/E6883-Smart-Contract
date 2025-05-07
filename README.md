# E6883-Smart-Contract

Thought for a few seconds


# LooksRareProtocol‑v2 Data Intelligence 🚀

Analyze real‑time **LooksRare v2** NFT trades on Ethereum, turn raw on‑chain events into structured dashboards, and let large‑language models surface trends, anomalies, and alpha.

---

## ✨ What’s inside?

| Layer                     | Purpose                                                      | Key Tech                                                            |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------- |
| **Smart‑Contract Source** | Target contract & events (`TakerAsk` / `TakerBid`)           | LooksRareProtocol v2 – `0x0000000000E655fAe4d56241588680F86E3b2377` |
| **Data Pipeline**         | Stream & persist NFT sales                                   | The Graph (hosted) → GraphQL → Python pandas                        |
| **API Layer**             | Clean CSV / Google Sheets export & simple REST endpoints     | FastAPI, pydantic                                                   |
| **Analytics**             | Interactive notebooks & dashboards                           | Jupyter, Plotly                                                     |
| **LLM Insights**          | Natural‑language trend detection & 30‑day volume forecasting | OpenAI GPT‑4o                                                       |

---

## 🔥 Features

* **One‑click data fetch** – `python scripts/fetch_sales.py --days 7`
* **Auto‑ETL** – daily GitHub Actions job writes to `/data/*.csv`
* **Exploratory notebooks** – whale‑wallet radar, top‑collections heatmap
* **LLM prompts** – ask *“Which collection shows sudden wash‑trading spikes?”* and get an answer with rationale
* **Plug‑and‑play API** – hit `/api/v1/sales?collection=0xABC…&from=2025‑05‑01` for JSON

---

## Quick Start

```bash
git clone https://github.com/<org>/LooksRareProtocol-v2-LLM
cd LooksRareProtocol-v2-LLM
pip install -r requirements.txt

# 1️⃣ Pull last 24 h sales and write looksrare_sales.csv
python scripts/fetch_sales.py --hours 24

# 2️⃣ Explore
jupyter lab notebooks/Exploration.ipynb
```

---

## Project Structure

```
.
├── data/                 # Raw & processed CSV snapshots
├── notebooks/            # Jupyter analyses & LLM demos
├── scripts/
│   ├── fetch_sales.py    # GraphQL → CSV
│   └── update_sheets.py  # Google Sheets sync
├── app/                  # FastAPI service
└── README.md
```

---

## Roadmap

* [ ] Live WebSocket ingestion for sub‑minute freshness
* [ ] LangChain agent to cross‑query OpenSea & Blur volumes
* [ ] Streamlit dashboard with real‑time KPIs

---

## Contributors

| Name                 | UNI        | Role                            |
| -------------------- | ---------- | ------------------------------- |
| Jiajun Chen          | **jc6397** | Data pipeline & LLM integration |
| *Add teammates here* |            |                                 |

---

## License

MIT — see [`LICENSE`](LICENSE) for details.
