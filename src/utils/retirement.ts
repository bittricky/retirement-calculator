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
   * Run a single Monte Carlo simulation of the retirement plan.
   * https://en.wikipedia.org/wiki/Monte_Carlo_method
   *
   * The simulation has two phases: accumulation and retirement. During the
   * accumulation phase, the function simulates the growth of the savings based
   * on the user's contributions and expected returns. During the retirement phase,
   * the function simulates the expenses of the retirement based on the user's
   * expenses and inflation rate.
   *
   * The function returns the final savings after the simulation. If the savings
   * run out during the simulation, the function returns -1.
   */
  function runSimulation(): number {
    let savings = currentSavings;
    let contributions = monthlyContribution;

    // Accumulation phase
    for (let year = 1; year <= yearsToRetirement; year++) {
      const annualReturn =
        expectedReturns[Math.floor(Math.random() * expectedReturns.length)];

      contributions *= 1 + inflationRate;
      savings *= 1 + annualReturn;
      savings += contributions * 12;

      const growth = savings - (currentSavings + contributions * 12 * year);
      savings -= growth * taxRate;
    }

    // Retirement phase
    let totalNeeded = 0;
    for (let year = 1; year <= yearsInRetirement; year++) {
      const annualReturn =
        expectedReturns[Math.floor(Math.random() * expectedReturns.length)];

      const yearlyExpenses =
        year <= yearsInEarlyRetirement
          ? earlyRetirementExpenses * 12 * Math.pow(1 + inflationRate, year)
          : lateRetirementExpenses * 12 * Math.pow(1 + inflationRate, year);

      totalNeeded += yearlyExpenses;

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
    const yearlyExpenses =
      year <= yearsInEarlyRetirement
        ? earlyRetirementExpenses * 12 * Math.pow(1 + inflationRate, year)
        : lateRetirementExpenses * 12 * Math.pow(1 + inflationRate, year);
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
