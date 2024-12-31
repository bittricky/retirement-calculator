export type Theme = "dark" | "light" | "system";

export type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

export type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export interface RetirementInputs {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthlyContribution: number;
  monthlyExpenses: number;
  earlyRetirementExpenses: number;
  lateRetirementExpenses: number;
  inflationRate: number;
  taxRate: number;
  retirementTaxRate: number;
  socialSecurityBenefit: number;
  socialSecurityStartAge: number;
  expectedReturns: number[];
  simulationRuns: number;
}

export interface RetirementResults {
  medianTotalNeeded: number;
  medianProjectedSavings: number;
  successRate: number;
  medianAdjustedMonthly: number;
}
