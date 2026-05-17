import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import EmergencyButton from '../common/EmergencyButton';
import Chatbot from '../common/Chatbot';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <EmergencyButton />
      <Chatbot />
    </div>
  );
}
