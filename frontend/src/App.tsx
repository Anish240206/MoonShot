import { useState, useEffect } from 'react';
import { auth, googleProvider } from './firebase';
import { onAuthStateChanged, type User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, signOut } from 'firebase/auth';

import { AuthPage } from './AuthPage';
import { MainApp } from './MainApp';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe(); 
  }, []);

  const handleEmailSubmit = async (email: string, password: string, name?: string) => {
    try {
      if (name) { 
        const cred = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(cred.user, { displayName: name });
      } else { 
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error: any) {
      alert(error.message);
    }
  };
  
  const handleGoogleSubmit = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  if (loading) {
    return <div className="container"><h4>Loading...</h4></div>;
  }

  return (
    <div className="container">
      {user ? (
        <MainApp user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onEmailSubmit={handleEmailSubmit} onGoogleSubmit={handleGoogleSubmit} />
      )}
    </div>
  );
}

export default App;