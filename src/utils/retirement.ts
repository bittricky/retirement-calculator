import { RetirementInputs, RetirementResults } from "../types/global";

export function calculateRetirement(
  inputs: RetirementInputs
): RetirementResults {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthlyContribution,
    monthlyExpenses,
    earlyRetirementExpenses,
    lateRetirementExpenses,
    inflationRate: rawInflationRate,
    taxRate: rawTaxRate,
    retirementTaxRate: rawRetirementTaxRate,
    socialSecurityBenefit,
    socialSecurityStartAge,
    expectedReturns: rawExpectedReturns,
    simulationRuns,
  } = inputs;

  // Convert rates from percentages to decimals
  const inflationRate = rawInflationRate / 100;
  const taxRate = rawTaxRate / 100;
  const retirementTaxRate = rawRetirementTaxRate / 100;
  const expectedReturns = rawExpectedReturns.map(rate => rate / 100);

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = 30;
  const yearsInEarlyRetirement = 20;

  function runSimulation(): number {
    let savings = currentSavings;
    let contributions = monthlyContribution;
    let expenses = monthlyExpenses;

    // Accumulation phase
    for (let year = 1; year <= yearsToRetirement; year++) {
      const annualReturn =
        expectedReturns[Math.floor(Math.random() * expectedReturns.length)];

      // Apply returns first
      savings *= (1 + annualReturn);

      // Adjust for inflation
      contributions *= (1 + inflationRate);
      expenses *= (1 + inflationRate);

      // Add contributions and subtract expenses
      savings += contributions * 12;
      savings -= expenses * 12;

      // Apply tax on investment gains
      const growth = savings - (currentSavings + (contributions - expenses) * 12 * year);
      if (growth > 0) {
        savings -= growth * taxRate;
      }
    }

    // Retirement phase
    for (let year = 1; year <= yearsInRetirement; year++) {
      const annualReturn =
        expectedReturns[Math.floor(Math.random() * expectedReturns.length)];

      // Calculate expenses with inflation
      let yearlyExpenses =
        year <= yearsInEarlyRetirement
          ? earlyRetirementExpenses * 12 * Math.pow(1 + inflationRate, year)
          : lateRetirementExpenses * 12 * Math.pow(1 + inflationRate, year);

      // Apply social security benefit if eligible
      if (currentAge + yearsToRetirement + year >= socialSecurityStartAge) {
        const adjustedSocialSecurity =
          socialSecurityBenefit * 12 * Math.pow(1 + inflationRate, year);
        yearlyExpenses -= adjustedSocialSecurity;
      }

      // Apply investment returns
      const investmentGains = savings * annualReturn;
      savings += investmentGains;

      // Subtract expenses
      savings -= yearlyExpenses;

      // Apply tax on investment gains
      if (investmentGains > 0) {
        savings -= investmentGains * retirementTaxRate;
      }

      if (savings < 0) {
        return -1; // Simulation failed
      }
    }

    return savings;
  }

  // Run simulations
  const simulationResults: number[] = [];
  let successCount = 0;

  for (let i = 0; i < simulationRuns; i++) {
    const result = runSimulation();
    if (result >= 0) {
      successCount++;
      simulationResults.push(result);
    }
  }

  // Calculate median projected savings
  simulationResults.sort((a, b) => a - b);
  const medianProjectedSavings = simulationResults.length > 0
    ? simulationResults[Math.floor(simulationResults.length / 2)]
    : 0;

  // Calculate success rate
  const successRate = (successCount / simulationRuns) * 100;

  // Calculate total needed for retirement (present value)
  let medianTotalNeeded = 0;
  let discountedExpenses = 0;
  const averageReturn = expectedReturns.reduce((a, b) => a + b) / expectedReturns.length;

  for (let year = 1; year <= yearsInRetirement; year++) {
    let yearlyExpenses =
      year <= yearsInEarlyRetirement
        ? earlyRetirementExpenses * 12 * Math.pow(1 + inflationRate, year)
        : lateRetirementExpenses * 12 * Math.pow(1 + inflationRate, year);

    if (currentAge + yearsToRetirement + year >= socialSecurityStartAge) {
      const adjustedSocialSecurity =
        socialSecurityBenefit * 12 * Math.pow(1 + inflationRate, year);
      yearlyExpenses -= adjustedSocialSecurity;
    }

    // Discount future expenses to present value
    discountedExpenses += yearlyExpenses / Math.pow(1 + averageReturn, year);
  }

  medianTotalNeeded = discountedExpenses;

  // Calculate the gap (positive means surplus, negative means shortfall)
  const medianGap = medianProjectedSavings - medianTotalNeeded;

  // Calculate required monthly adjustment if there's a shortfall
  let medianAdjustedMonthly = 0;
  if (medianGap < 0) {
    const monthlyReturn = averageReturn / 12;
    medianAdjustedMonthly =
      (Math.abs(medianGap) * monthlyReturn) /
      (Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1);
  }

  return {
    medianTotalNeeded,
    medianProjectedSavings,
    medianGap,
    successRate,
    medianAdjustedMonthly,
  };
}
