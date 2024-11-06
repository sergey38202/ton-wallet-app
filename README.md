
## Requirements

- Node.js and npm
- A TON API key from [toncenter](https://toncenter.com)
- [TonKeeper Wallet](https://tonkeeper.com) installed on your mobile device

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ton-wallet-app.git
cd ton-wallet-app
npm install

NEXT_PUBLIC_APP_URL=https://your-app.vercel.app  # Replace with your actual app URL
NEXT_PUBLIC_TON_API_KEY=your_toncenter_api_key   # Replace with your TON API key from toncenter

# Replace
{
  "url": "https://your-app.vercel.app",
  "name": "TON Wallet App",
  "iconUrl": "https://your-app.vercel.app/icon.png",
  "termsOfUseUrl": "https://your-app.vercel.app/terms",
  "privacyPolicyUrl": "https://your-app.vercel.app/privacy"
}

npm run dev