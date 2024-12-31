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
    inflationRate,
    taxRate,
    retirementTaxRate,
    socialSecurityBenefit,
    socialSecurityStartAge,
    expectedReturns,
    simulationRuns,
  } = inputs;

  const yearsToRetirement = retirementAge - currentAge;
  const yearsInRetirement = 30;
  const yearsInEarlyRetirement = 20;

  /**
   * Run a single simulation(Monte Carlo) of the retirement scenario.
   * https://en.wikipedia.org/wiki/Monte_Carlo_method
   *
   * This function returns the final amount of savings after running the simulation.
   * If the simulation fails, i.e. the user runs out of money, the function returns -1.
   *
   * The function first runs the accumulation phase, where it adds contributions and
   * subtracts expenses from the savings. It then runs the retirement phase, where it
   * subtracts expenses and taxes from the savings.
   */
  function runSimulation(): number {
    let savings = currentSavings;
    let contributions = monthlyContribution;
    let expenses = monthlyExpenses;

    // Accumulation phase
    for (let year = 1; year <= yearsToRetirement; year++) {
      const annualReturn =
        expectedReturns[Math.floor(Math.random() * expectedReturns.length)];

      contributions *= 1 + inflationRate;
      expenses *= 1 + inflationRate;
      savings *= 1 + annualReturn;
      savings += contributions * 12;
      savings -= expenses * 12; // Subtract annual expenses

      const growth =
        savings - (currentSavings + (contributions - expenses) * 12 * year);
      savings -= growth * taxRate;
    }

    // Retirement phase
    for (let year = 1; year <= yearsInRetirement; year++) {
      const annualReturn =
        expectedReturns[Math.floor(Math.random() * expectedReturns.length)];

      let yearlyExpenses =
        year <= yearsInEarlyRetirement
          ? earlyRetirementExpenses * 12 * Math.pow(1 + inflationRate, year)
          : lateRetirementExpenses * 12 * Math.pow(1 + inflationRate, year);

      if (currentAge + yearsToRetirement + year >= socialSecurityStartAge) {
        const adjustedSocialSecurity =
          socialSecurityBenefit * 12 * Math.pow(1 + inflationRate, year);
        yearlyExpenses -= adjustedSocialSecurity;
      }

      savings *= 1 + annualReturn;
      savings -= yearlyExpenses;
      savings -= savings * annualReturn * retirementTaxRate;

      if (savings < 0) {
        return -1; // Simulation failed
      }
    }

    return savings;
  }

  const simulationResults: number[] = [];
  let successCount = 0;

  for (let i = 0; i < simulationRuns; i++) {
    const result = runSimulation();
    if (result >= 0) {
      successCount++;
      simulationResults.push(result);
    }
  }

  simulationResults.sort((a, b) => a - b);

  const medianProjectedSavings =
    simulationResults[Math.floor(simulationResults.length / 2)];
  const successRate = (successCount / simulationRuns) * 100;

  // Calculate total needed (median case)
  let medianTotalNeeded = 0;
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

    medianTotalNeeded += yearlyExpenses;
  }

  // Calculate adjusted monthly contribution (if success rate < 100%)
  let medianAdjustedMonthly = 0;
  if (successRate < 100) {
    const additionalNeeded = medianTotalNeeded - medianProjectedSavings;
    const monthlyReturn =
      expectedReturns.reduce((a, b) => a + b) / expectedReturns.length / 12;
    medianAdjustedMonthly =
      (additionalNeeded * monthlyReturn) /
      (Math.pow(1 + monthlyReturn, yearsToRetirement * 12) - 1);
  }

  return {
    medianTotalNeeded,
    medianProjectedSavings,
    successRate,
    medianAdjustedMonthly,
  };
}
