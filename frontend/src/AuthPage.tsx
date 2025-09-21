import React, { useState } from 'react';

interface AuthPageProps {
  onEmailSubmit: (email: string, password: string, name?: string) => void;
  onGoogleSubmit: () => void;
}

export function AuthPage({ onEmailSubmit, onGoogleSubmit }: AuthPageProps) {
  const [isLoginPage, setIsLoginPage] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value;
    
    if (isLoginPage) {
      onEmailSubmit(email, password);
    } else {
      const name = (form.elements.namedItem('name') as HTMLInputElement).value;
      onEmailSubmit(email, password, name);
    }
  };

  if (isLoginPage) {
    return (
      <div className="auth-container" id="login-page">
        <div className="auth-header"><h4>Login</h4></div>
        <div className="auth-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3"><input type="email" name="email" className="form-control" placeholder="Email" required /></div>
            <div className="mb-3"><input type="password" name="password" className="form-control" placeholder="Password" required /></div>
            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <div className="auth-footer"><p>Don't have an account? <a href="#" onClick={() => setIsLoginPage(false)}>Sign up</a></p></div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container" id="signup-page">
      <div className="auth-header"><h4>Create Account</h4></div>
      <div className="auth-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3"><input type="text" name="name" className="form-control" placeholder="Name" required /></div>
          <div className="mb-3"><input type="email" name="email" className="form-control" placeholder="Email" required /></div>
          <div className="mb-3"><input type="password" name="password" className="form-control" placeholder="Password" required /></div>
          <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
          <button type="button" onClick={onGoogleSubmit} className="google-btn"><i className="fab fa-google"></i> Sign up with Google</button>
        </form>
        <div className="auth-footer"><p>Already have an account? <a href="#" onClick={() => setIsLoginPage(true)}>Login</a></p></div>
      </div>
    </div>
  );
}