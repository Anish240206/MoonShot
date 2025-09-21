SHORT PITCH:
We're planning on building a smart savings recommender that helps everyday users set & achieve realistic, personalised financial goals — by suggesting personalized, achievable savings plans. 
By using simple, customisable AI-driven math rules instead of complex jargon, it adjusts savings targets dynamically — so whether you’re planning for a trip, an expensive gadget, or an emergency fund, it adapts to your habits and income, keeping you on track without stress.
We use a web dashboard integrated with PhonePe’s sandbox API to simulate real UPI savings contributions, so users can actually see their progress and stick to their goals. 

LONG PITCH:
The Idea
A Smart Investment Goal Recommender & Tracker—a web dashboard that helps everyday users set their own unique savings goals (e.g., travel, expensive purchases, emergency fund) and automatically 
	(a) tracks their spending and saving in terms of their goals and
	(b) recommends monthly/weekly contributions based on their target and time horizon. Users can then “commit” savings through a simulated PhonePe/UPI integration and track progress in real-time.

The Problem
Most people, especially new/young earners, gig workers, and students, struggle with starting, and most importantly, maintaining structured saving habits. 
As (mostly broke) college students ourselves, we've seen how easily small purchases stack up to become a sudden 3000 Rs. hit to the wallet — and yet, financial planning feels too intimidating for us to implement. 
Most apps on the market focus either on budgeting (too complex, and require a significant chunk of personal time investment) or investments (too advanced).
As such, even saving for a trip or gadget feels overwhelming at times, simply because we don’t know how much to save and when.
While fintech adoption is huge in India — there’s no fun, AI-powered tool to make small savings fast, easy, and engaging. We're hoping to change that.

The Solution
Our tool bridges this gap by combining relatively simple math formulae + AI personalization with mock UPI integration:
	1. User sets a goal (e.g., “Kerala trip – ₹80,000 in 2 years”). We'll have core, deterministic math rules set for these
	2. The app tunes the core math formulae within safe limits, and recommends a SMART scenario-based saving plan (e.g., “Save ₹3,500/month; if you add ₹2,000 more in festival months, you’ll reach early”), accounting for timeline urgency, as well as user behavioral patterns.
	Additionally, it also explains why the adjustment makes sense, in easy-to-understand, accessible terms.
	3. With one click, the user can “Save Now” via a PhonePe sandbox API transaction simulation.
	4. The dashboard updates live, showing progress bars and encouragement.
This turns savings into a game-like, actionable experience instead of abstract numbers.

Potential Tech Stack
	• Frontend: React-based web dashboard (intuitive goal tracker, charts, progress bars).
	• Backend: FastAPI/Flask (for managing users, goals, and transactions).
	• Database: MongoDB/Firebase (store user goals and history).
	• AI Layer: Lightweight model + rule engine to recommend savings based on target, income range, and habits, and also to explain purpose of rule tuning.
	• Fintech Integration: PhonePe Sandbox API (simulating UPI transactions).

The Impact
	• Financial Inclusion: Helps young and first-time savers form and maintain structured saving habits in an easy, engaging way.
	• Accessibility: Works with familiar payment flow (UPI), so no extra learning curve.
	• Scalable Vision: Can expand into micro-investments, group/pooled savings, or gamified milestones/challenges.