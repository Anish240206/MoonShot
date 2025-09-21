import * as functions from "firebase-functions";
import express from "express";
import * as bodyParser from "body-parser";
import { computeRecommendations, GoalRecommendation, GoalInput } from "./recommender";
import * as db from "./db";

functions.setGlobalOptions({ maxInstances: 10 });

const app = express();
app.use(bodyParser.json());

app.post("/recommend", async (req, res) => {
  try {
    const { target_amount, current_savings = 0, start_date, end_date, monthly_income, history = [] } = req.body;

    if (!target_amount || !start_date || !end_date) {
      return res.status(400).json({ error: "Missing required fields post/recommend" });
    }

    const input: GoalInput = {
      targetAmount: target_amount,
      currentSavings: current_savings,
      start_date,
      end_date,
      monthlyIncome: monthly_income,
      history
    };

    const rec: GoalRecommendation = computeRecommendations(input);

    return res.json({ recommendation: rec });
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Full error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).json({
      error: "Internal server error post/recom1",
      details: err.message
    });
  } else {
    console.error("Unknown error:", err);
    return res.status(500).json({
      error: "Internal server error post/recom2",
      details: JSON.stringify(err)
    });
  }
}

});


app.post("/goal", async (req, res) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ error: "Missing userId in query post/goal 1" });

    const { name, target_amount, start_date, end_date, current_savings = 0, monthly_income, emergency_stash_monthly } = req.body;
    if (!name || !target_amount || !start_date || !end_date) {
      return res.status(400).json({ error: "Missing required fields post/goal2" });
    }

    const input: GoalInput = {
      targetAmount: target_amount,
      start_date,
      end_date,
      currentSavings: current_savings,
      monthlyIncome: monthly_income,
      emergencyStashMonthly: emergency_stash_monthly,
      history: []
    };

    const rec: GoalRecommendation = computeRecommendations(input);

    const goalId = await db.createGoal(userId, {
      name,
      target_amount,
      start_date,
      end_date,
      current_savings,
      recommended_plan: rec
    });

    return res.json({ goalId, recommended_plan: rec });
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Full error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).json({
      error: "Internal server error post/goal1",
      details: err.message
    });
  } else {
    console.error("Unknown error:", err);
    return res.status(500).json({
      error: "Internal server error post/goal2",
      details: JSON.stringify(err)
    });
  }
}

});


app.post("/save", async (req, res) => {
  try {
    const { userId, goalId, amount } = req.body;
    if (!userId || !goalId || !amount) return res.status(400).json({ error: "Missing required fields post/save1" });

    const tx = {
      tx_id: `tx_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      provider: "PHONEPE_SANDBOX",
      status: "SUCCESS",
      amount
    };

    await db.addContribution(userId, goalId, amount, tx);

    return res.json({ ok: true, tx });
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Full error:", err);
    console.error("Error stack:", err.stack);
    return res.status(500).json({
      error: "Internal server error post/save1",
      details: err.message
    });
  } else {
    console.error("Unknown error:", err);
    return res.status(500).json({
      error: "Internal server error post/save2",
      details: JSON.stringify(err)
    });
  }
}

});


app.post("/emergency/save", async (req, res) => {
  try {
    const { userId, amount } = req.body;
    if (!userId || !amount) return res.status(400).json({ error: "Missing required fields" });

    const tx = {
      tx_id: `tx_emergency_${Date.now()}`,
      provider: "INTERNAL",
      status: "SUCCESS",
      amount
    };

    await db.addEmergencyContribution(userId, amount, tx);

    return res.json({ ok: true, message: `Successfully added ${amount} to emergency stash.` });

  } catch (err: unknown) {
    if (err instanceof Error) {
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
    return res.status(500).json({ error: "Unknown internal server error" });
  }
});



export const api = functions.https.onRequest(app);
