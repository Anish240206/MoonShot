/*import React, { useState } from 'react';
import { type User } from 'firebase/auth';

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

export function MainApp({ user, onLogout }: MainAppProps) {
  const [apiResponse, setApiResponse] = useState('Responses will appear here...');

  const handleGoalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setApiResponse('Processing...');

    const form = new FormData(e.currentTarget);
    
    const payload: { [key: string]: any } = {
        name: form.get('name'),
        target_amount: Number(form.get('target_amount')),
        start_date: form.get('start_date'),
        end_date: form.get('end_date'),
        monthly_income: Number(form.get('monthly_income')) || 0,
        emergency_stash_monthly: Number(form.get('emergency_stash_monthly')) || 0,
    };
            
    const apiUrl = `http://127.0.0.1:5001/skarjams2025/us-central1/api/goal?userId=${user.uid}`;
    
    try {
      const response = await fetch(apiUrl, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.details || 'API request failed');
      setApiResponse("Goal created successfully!\n\n" + JSON.stringify(result, null, 2));
    } catch (error: any) { 
      setApiResponse(`Error: ${error.message}`); 
    }
  };

  const handleEmergencySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setApiResponse('Processing...');

    const form = new FormData(e.currentTarget);
    const payload = {
      userId: user.uid,
      amount: Number(form.get('amount'))
    };

    const apiUrl = `http://127.0.0.1:5001/skarjams2025/us-central1/api/emergency/save`;

    try {
      const response = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.details || 'API request failed');
      setApiResponse("Emergency stash updated!\n\n" + JSON.stringify(result, null, 2));
    } catch (error: any) {
      setApiResponse(`Error: ${error.message}`);
    }
  };
  
  return (
    <>
      <div className="app-container mb-4">
        <div className="auth-header"><h4>Welcome, {user.displayName || 'User'}!</h4></div>
        <div className="auth-body">
          <p className="text-muted">{user.email}</p>
          <button className="btn btn-danger w-100" onClick={onLogout}>Logout</button>
        </div>
      </div>

      <div className="app-container">
        <div className="auth-header"><h4>Create a New Goal</h4></div>
        <div className="auth-body">
          <form onSubmit={handleGoalSubmit}>
            <div className="mb-3"><input type="text" name="name" className="form-control" placeholder="Goal Name" required /></div>
            <div className="mb-3"><input type="number" name="target_amount" className="form-control" placeholder="Target Amount" required /></div>
            <div className="mb-3"><label className="form-label small text-muted">Start Date</label><input type="date" name="start_date" className="form-control" required /></div>
            <div className="mb-3"><label className="form-label small text-muted">End Date</label><input type="date" name="end_date" className="form-control" required /></div>
            <div className="mb-3"><input type="number" name="monthly_income" className="form-control" placeholder="Monthly Income (Optional)" /></div>
            <div className="mb-3"><input type="number" name="emergency_stash_monthly" className="form-control" placeholder="Monthly Emergency Stash (Optional)" /></div>
            <button type="submit" className="btn btn-primary w-100">Create Goal & Get Recommendation</button>
          </form>
        </div>
      </div>

      <div className="app-container mt-4">
          <div className="auth-header"><h4>Add to Emergency Stash</h4></div>
          <div className="auth-body">
              <form onSubmit={handleEmergencySubmit}>
                  <div className="mb-3"><input type="number" name="amount" className="form-control" placeholder="Amount" required /></div>
                  <button type="submit" className="btn btn-success w-100">Add to Stash</button>
              </form>
          </div>
      </div>

      <div className="app-container mt-4">
        <div className="auth-header"><h4>API Response</h4></div>
        <div className="auth-body">
          <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', minHeight: '50px' }}>{apiResponse}</pre>
        </div>
      </div>
    </>
  );
}
*/

import React, { useState } from "react";
import { type User } from "firebase/auth";

interface MainAppProps {
  user: User;
  onLogout: () => void;
}

export function MainApp({ user, onLogout }: MainAppProps) {
  const [apiResponse, setApiResponse] = useState("Responses will appear here...");

  const handleGoalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setApiResponse("Processing...");

    const form = new FormData(e.currentTarget);

    const payload = {
      name: form.get("name"),
      target_amount: Number(form.get("target_amount")),
      start_date: form.get("start_date"),
      end_date: form.get("end_date"),
      monthly_income: Number(form.get("monthly_income")) || 0,
      emergency_stash_monthly: Number(form.get("emergency_stash_monthly")) || 0,
    };

    const apiUrl = `http://127.0.0.1:5001/skarjams2025/us-central1/api/goal?userId=${user.uid}`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.details || "API request failed");
      setApiResponse("Goal created successfully!\n\n" + JSON.stringify(result, null, 2));
    } catch (error: any) {
      setApiResponse(`Error: ${error.message}`);
    }
  };

  const handleEmergencySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;
    setApiResponse("Processing...");

    const form = new FormData(e.currentTarget);
    const payload = {
      userId: user.uid,
      amount: Number(form.get("amount")),
    };

    const apiUrl = `http://127.0.0.1:5001/skarjams2025/us-central1/api/emergency/save`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.details || "API request failed");
      setApiResponse("Emergency stash updated!\n\n" + JSON.stringify(result, null, 2));
    } catch (error: any) {
      setApiResponse(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-moonshot-bg font-questrial relative overflow-hidden">
      <div className="relative z-10 px-6 py-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-moonshot-gold text-2xl sm:text-3xl">
            Welcome, {user.displayName || "User"}!
          </h1>
          <button
            onClick={onLogout}
            className="bg-white bg-opacity-20 text-moonshot-blue-dark px-6 py-2 rounded-full hover:bg-opacity-40 transition"
          >
            Logout
          </button>
        </div>

        {/* Forms Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Goal */}
          <div className="bg-moonshot-card-bg rounded-3xl p-6">
            <h2 className="text-moonshot-gold text-xl mb-4">Create a New Goal</h2>
            <form onSubmit={handleGoalSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Goal Name" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" required />
              <input type="number" name="target_amount" placeholder="Target Amount" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" required />
              <input type="date" name="start_date" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" required />
              <input type="date" name="end_date" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" required />
              <input type="number" name="monthly_income" placeholder="Monthly Income (Optional)" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" />
              <input type="number" name="emergency_stash_monthly" placeholder="Monthly Emergency Stash (Optional)" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" />
              <button type="submit" className="w-full bg-moonshot-gold text-moonshot-blue-dark py-3 rounded-lg font-semibold">
                Create Goal & Get Recommendation
              </button>
            </form>
          </div>

          {/* Emergency Stash */}
          <div className="bg-moonshot-card-bg rounded-3xl p-6">
            <h2 className="text-moonshot-gold text-xl mb-4">Add to Emergency Stash</h2>
            <form onSubmit={handleEmergencySubmit} className="space-y-4">
              <input type="number" name="amount" placeholder="Amount" className="w-full p-3 rounded-lg bg-moonshot-bg text-white" required />
              <button type="submit" className="w-full bg-moonshot-green text-white py-3 rounded-lg font-semibold">
                Add to Stash
              </button>
            </form>
          </div>
        </div>

        {/* API Response */}
        <div className="bg-moonshot-card-bg rounded-3xl p-6 mt-8">
          <h2 className="text-moonshot-gold text-xl mb-4">API Response</h2>
          <pre className="bg-moonshot-bg text-white p-4 rounded-lg whitespace-pre-wrap">
            {apiResponse}
          </pre>
        </div>
      </div>
    </div>
  );
}