// functions/src/db.ts
import * as admin from "firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { GoalRecommendation } from "./recommender";


if (!admin.apps.length) admin.initializeApp();

const db = admin.firestore();

export async function createGoal(userId: string, goalData: {
  name: string;
  target_amount: number;
  start_date: string;
  end_date: string;
  current_savings?: number;
  currency?: string;
  recommended_plan?: GoalRecommendation;
}) {
  const ref = db.collection("users").doc(userId).collection("goals").doc();
  const now = FieldValue.serverTimestamp(); 

  await ref.set({
    ...goalData,
    current_savings: goalData.current_savings || 0,
    currency: goalData.currency || "INR",
    created_at: now,
    updated_at: now
  });

  return ref.id;
}


export async function getGoals(userId: string) {
  const snap = await db.collection("users").doc(userId).collection("goals").get();
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}


export async function addContribution(
  userId: string,
  goalId: string,
  amount: number,
  tx: { tx_id: string; provider?: string; status?: string }
) {
  const goalRef = db.collection("users").doc(userId).collection("goals").doc(goalId);
  const contribRef = goalRef.collection("contributions").doc();

  const batch = db.batch();

  batch.set(contribRef, {
    amount,
    date: FieldValue.serverTimestamp(),
    tx
  });

  
  batch.update(goalRef, {
    current_savings: FieldValue.increment(amount),
    updated_at: FieldValue.serverTimestamp()
  });

  await batch.commit();
}
