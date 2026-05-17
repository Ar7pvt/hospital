import { Phone } from 'lucide-react';
import { HOSPITAL } from '../../constants/navigation';

export default function EmergencyButton() {
  return (
    <a
      href={`tel:${HOSPITAL.emergency}`}
      className="fixed bottom-24 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl shadow-red-600/50 transition hover:scale-110 hover:bg-red-700 animate-pulse"
      aria-label="Emergency call"
    >
      <Phone className="h-6 w-6" />
    </a>
  );
}
