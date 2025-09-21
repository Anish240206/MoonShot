// functions/src/recommender.ts

export interface GoalInput {
  targetAmount: number;   
  start_date: string;     
  end_date: string;       
  monthlyIncome?: number; 
  history?: number[];     
  currentSavings?: number;
  emergencyStashMonthly?: number;
}

export interface GoalRecommendation {
  goalContribution: number;
  emergencyStashContribution: number; 
  explanation: string;  
}


function monthsBetween(startISO: string, endISO: string): number {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const days = Math.max(0, Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
  return Math.max(1, Math.ceil(days / 30));
}


export function computeRecommendations(input: GoalInput): GoalRecommendation {
  const { targetAmount, start_date, end_date, monthlyIncome, emergencyStashMonthly = 0 } = input;

  const months = monthsBetween(start_date, end_date);
  const incomeForGoal = monthlyIncome ? monthlyIncome - emergencyStashMonthly : undefined;
  
  const base = targetAmount / months;
  const min_contrib = Math.round(base * 0.8);
  const max_contrib = Math.round(base * 1.2);
  const tidy = Math.round(base);

  let goalContribution = tidy;

  if (incomeForGoal && incomeForGoal > 0) {
    goalContribution = Math.max(min_contrib, Math.min(max_contrib, Math.round(incomeForGoal * 0.15)));
  }

  if (goalContribution <= 0) goalContribution = tidy;

  const explanation = monthlyIncome
    ? `To reach ₹${targetAmount} in ${months} months, save ~₹${goalContribution}/month (±20% of base, max ~12% of income ₹${monthlyIncome}).`
    : `To reach ₹${targetAmount} in ${months} months, save ~₹${goalContribution}/month (evenly divided).`;

  return { goalContribution, emergencyStashContribution: emergencyStashMonthly, explanation };
}
