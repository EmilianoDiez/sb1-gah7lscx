import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { checkConnection } from './lib/supabase';
import { PageLayout } from './components/layout/PageLayout';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const isConnected = await checkConnection();
        if (!isConnected) {
          setError('Could not connect to database. Please try again later.');
        }
      } catch (err) {
        console.error('Initialization error:', err);
        // Don't show error to user during initial setup
        if (process.env.NODE_ENV !== 'development') {
          setError('An error occurred while initializing the application.');
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 p-4 rounded-lg text-red-700">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <PageLayout />
    </BrowserRouter>
  );
}

export default App;
