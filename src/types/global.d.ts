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

export interface InputFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
  icon?: React.ReactNode;
  prefix?: string;
  suffix?: string;
  min?: number;
  max?: number;
}

export interface ResultsProps {
  results: {
    totalNeeded: number;
    projectedSavings: number;
    gap: number;
    adjustedMonthly: number;
  };
  inputs: {
    retirementAge: number;
    currentAge: number;
  };
}
