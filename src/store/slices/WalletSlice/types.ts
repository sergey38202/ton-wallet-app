import { IWalletInfo } from '@/types/wallet';

export interface IWalletState extends IWalletInfo {
  status: 'idle' | 'loading' | 'connected' | 'disconnected';
}
