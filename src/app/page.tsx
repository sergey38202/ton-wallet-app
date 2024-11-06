import { WalletScreen } from '@/components';
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <main>
      <WalletScreen />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </main>
  );
}
