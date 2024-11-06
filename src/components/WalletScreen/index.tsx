'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import tonConnect from '@/utils/tonConnect';
import { toast } from 'react-toastify';
import { AppDispatch, RootState } from '@/store';
import {
  connectWalletStart,
  connectWalletSuccess,
  disconnectWallet,
} from '@/store/slices/WalletSlice';
import { fetchBalance } from '@/store/actions/WalletAction';

export const WalletScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const walletInfo = useSelector((state: RootState) => state.wallet);

  useEffect(() => {
    if (tonConnect) {
      tonConnect.restoreConnection();
      const unsubscribe = tonConnect.onStatusChange((walletData: any) => {
        if (walletData?.address) {
          dispatch(connectWalletSuccess(walletData.address));
          dispatch(fetchBalance(walletData.address));
          toast.success('Wallet linked successfully!');
        } else {
          dispatch(disconnectWallet());
        }
      });
      return () => unsubscribe();
    }
  }, [dispatch]);

  const connectWallet = async () => {
    if (!tonConnect) {
      console.error('TonConnect is not available on the server side.');
      return;
    }

    dispatch(connectWalletStart());

    const wallets = await tonConnect.getWallets();
    const tonkeeper: any = wallets.find(wallet => wallet.name === 'Tonkeeper');

    if (tonkeeper) {
      const connectionSource = {
        universalLink: tonkeeper.universalLink,
        bridgeUrl: tonkeeper.bridgeUrl,
      };
      tonConnect.connect(connectionSource);
    } else {
      toast.error('Tonkeeper wallet not found.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4 text-center">
        <h2 className="text-2xl font-bold text-primary">My Wallet</h2>
        <button
          className="px-4 py-2 font-semibold text-white bg-primary rounded-md hover:bg-indigo-700"
          onClick={connectWallet}
          disabled={walletInfo.status === 'loading'}
        >
          {walletInfo.status === 'loading' ? 'Connecting...' : 'Link Wallet'}
        </button>
        {walletInfo.address ? (
          <div className="text-gray-700">
            <p>
              <strong>Address:</strong> {walletInfo.address}
            </p>
            <p>
              <strong>Balance:</strong> {walletInfo.balance.toFixed(2)} TON
            </p>
          </div>
        ) : (
          <p className="text-gray-500">No wallet connected</p>
        )}
      </div>
    </div>
  );
};
