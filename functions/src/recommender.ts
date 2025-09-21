// functions/src/recommender.ts

export interface GoalInput {
  targetAmount: number;   
  start_date: string;     
  end_date: string;       
  monthlyIncome?: number; 
  history?: number[];     
  currentSavings?: number;
}

export interface GoalRecommendation {
  contribution: number; 
  explanation: string;  
}


function monthsBetween(startISO: string, endISO: string): number {
  const s = new Date(startISO);
  const e = new Date(endISO);
  const days = Math.max(0, Math.floor((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)));
  return Math.max(1, Math.ceil(days / 30));
}


export function computeRecommendations(input: GoalInput): GoalRecommendation {
  const { targetAmount, start_date, end_date, monthlyIncome } = input;

  const months = monthsBetween(start_date, end_date);

  
  const base = targetAmount / months;
  const min_contrib = Math.round(base * 0.8);
  const max_contrib = Math.round(base * 1.2);
  const tidy = Math.round(base);

  let contribution = tidy;

  if (monthlyIncome) {
       contribution = Math.max(min_contrib, Math.min(max_contrib, Math.round(monthlyIncome * 0.12)));
  }

  if (contribution <= 0) contribution = tidy;

  const explanation = monthlyIncome
    ? `To reach ₹${targetAmount} in ${months} months, save ~₹${contribution}/month (±20% of base, max ~12% of income ₹${monthlyIncome}).`
    : `To reach ₹${targetAmount} in ${months} months, save ~₹${contribution}/month (evenly divided).`;

  return { contribution, explanation };
}
