import { useState } from 'react';
import { motion } from 'framer-motion';
import { AuthPanel } from './components/auth/AuthPanel';
import { Hero } from './components/landing/Hero';
import { Workflow } from './components/landing/Workflow';
import { Dashboard } from './pages/Dashboard';

export default function App() {
  const [view, setView] = useState('landing');
  const [authMode, setAuthMode] = useState('id');
  const [patient, setPatient] = useState(null);

  function openAuth(mode) {
    setAuthMode(mode);
    setView('auth');
    window.setTimeout(() => document.getElementById('auth')?.scrollIntoView({ behavior: 'smooth' }), 50);
  }

  if (patient) {
    return <Dashboard patient={patient} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero onLogin={() => openAuth('id')} onQr={() => openAuth('qr')} />
      <Workflow />
      {view === 'auth' ? (
        <motion.section
          id="auth"
          className="px-4 py-14 sm:px-6 lg:px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AuthPanel mode={authMode} onAuthenticated={setPatient} />
        </motion.section>
      ) : null}
    </div>
  );
}
