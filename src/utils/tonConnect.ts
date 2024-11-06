import { TonConnect } from '@tonconnect/sdk';

let tonConnect: TonConnect | undefined;

if (typeof window !== 'undefined') {
  tonConnect = new TonConnect({
    manifestUrl: `${process.env.NEXT_PUBLIC_APP_URL}/tonconnect-manifest.json`,
  });
}

export default tonConnect;
