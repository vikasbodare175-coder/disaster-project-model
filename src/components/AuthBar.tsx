import React, { useState, useEffect } from 'react';
import { 
  LogIn, 
  LogOut, 
  User as UserIcon, 
  ShieldCheck, 
  Cloud, 
  Database,
  CheckCircle2
} from 'lucide-react';
import { User, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db, handleFirestoreError, OperationType } from '../lib/firebase';

interface AuthBarProps {
  onUserChanged?: (user: User | null) => void;
}

export const AuthBar: React.FC<AuthBarProps> = ({ onUserChanged }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setLoading(false);
      if (onUserChanged) onUserChanged(user);

      if (user) {
        // Sync user profile to Firestore
        try {
          const userRef = doc(db, 'users', user.uid);
          await setDoc(
            userRef,
            {
              uid: user.uid,
              email: user.email || '',
              displayName: user.displayName || 'Disaster Operations Officer',
              photoURL: user.photoURL || '',
              role: 'officer',
              createdAt: new Date().toISOString(),
            },
            { merge: true }
          );
        } catch (err) {
          console.error('Failed to sync user profile:', err);
        }
      }
    });

    return () => unsubscribe();
  }, [onUserChanged]);

  const handleSignIn = async () => {
    setErrorMsg(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setErrorMsg(err.message || 'Google sign-in failed');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Sign-out error:', err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {loading ? (
        <div className="h-8 w-24 bg-slate-200/60 animate-pulse rounded-lg" />
      ) : currentUser ? (
        <div className="flex items-center gap-2.5 bg-white border border-slate-200 px-3 py-1.5 rounded-lg shadow-2xs">
          {currentUser.photoURL ? (
            <img
              src={currentUser.photoURL}
              alt={currentUser.displayName || 'User'}
              className="w-6 h-6 rounded-full border border-slate-300 object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
              {currentUser.email ? currentUser.email[0].toUpperCase() : 'U'}
            </div>
          )}

          <div className="hidden sm:block text-left">
            <span className="block text-xs font-bold text-slate-800 leading-none truncate max-w-[130px]">
              {currentUser.displayName || currentUser.email?.split('@')[0]}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Officer · Firestore Synced</span>
            </span>
          </div>

          <button
            onClick={handleSignOut}
            className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors ml-1"
            title="Sign out of Firebase"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          onClick={handleSignIn}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-2xs transition-colors"
          title="Sign in with Google using Firebase Authentication"
        >
          {/* Google Icon */}
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.43 7.37 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.98 0 12c0 2.02.46 3.84 1.26 5.42l4.02-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.57 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
            />
          </svg>
          <span>Sign In</span>
        </button>
      )}

      {errorMsg && (
        <span className="text-[10px] text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
          {errorMsg}
        </span>
      )}
    </div>
  );
};
