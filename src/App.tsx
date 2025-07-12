import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useDispatch } from 'react-redux';
import { setUser } from './features/authSlice';
import NewsFeed from './components/NewsFeed';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AudioAlert from './components/AudioAlert';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isAdmin, setIsAdmin] = useState(false);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      dispatch(setUser(session?.user ?? null));
      setIsAdmin(session?.user?.user_metadata?.role === 'admin');
    });
    return () => authListener.subscription.unsubscribe();
  }, [dispatch]);

  return (
    <div className={`min-h-screen bg-gray-900 text-white ${theme}`}>
      <Navbar setTheme={setTheme} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4">
          <Login />
          <NewsFeed />
          {isAdmin && <AdminDashboard />}
        </main>
      </div>
      <AudioAlert />
    </div>
  );
};

export default App;
