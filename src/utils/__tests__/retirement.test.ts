import { calculateRetirement } from '../retirement';
import { RetirementInputs } from '../../types/global';

describe('calculateRetirement', () => {
  const baseInputs: RetirementInputs = {
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 100000,
    monthlyContribution: 2000,
    monthlyExpenses: 2000,
    earlyRetirementExpenses: 3000,
    lateRetirementExpenses: 2500,
    inflationRate: 2.0,
    taxRate: 20,
    retirementTaxRate: 15,
    socialSecurityBenefit: 2000,
    socialSecurityStartAge: 67,
    expectedReturns: [5, 6, 7],
    simulationRuns: 1000
  };

  test('returns expected result structure', () => {
    const result = calculateRetirement(baseInputs);
    
    expect(result).toHaveProperty('medianTotalNeeded');
    expect(result).toHaveProperty('medianProjectedSavings');
    expect(result).toHaveProperty('medianGap');
    expect(result).toHaveProperty('successRate');
    expect(result).toHaveProperty('medianAdjustedMonthly');
  });

  test('success rate is between 0 and 100', () => {
    const result = calculateRetirement(baseInputs);
    expect(result.successRate).toBeGreaterThanOrEqual(0);
    expect(result.successRate).toBeLessThanOrEqual(100);
  });

  test('higher monthly contribution improves financial metrics', () => {
    const lowContribution = calculateRetirement({
      ...baseInputs,
      monthlyContribution: 1000,
      simulationRuns: 5000,
    });

    const highContribution = calculateRetirement({
      ...baseInputs,
      monthlyContribution: 3000,
      simulationRuns: 5000,
    });

    expect(highContribution.successRate).toBeGreaterThan(lowContribution.successRate);
  });

  test('higher current savings improves financial metrics', () => {
    const lowSavings = calculateRetirement({
      ...baseInputs,
      currentSavings: 50000,
      simulationRuns: 5000,
    });

    const highSavings = calculateRetirement({
      ...baseInputs,
      currentSavings: 200000,
      simulationRuns: 5000,
    });

    expect(highSavings.successRate).toBeGreaterThan(lowSavings.successRate);
  });

  test('higher expenses worsen financial metrics', () => {
    const lowExpenses = calculateRetirement({
      ...baseInputs,
      monthlyExpenses: 1500,
      earlyRetirementExpenses: 2000,
      lateRetirementExpenses: 1500,
      simulationRuns: 5000
    });

    const highExpenses = calculateRetirement({
      ...baseInputs,
      monthlyExpenses: 3000,
      earlyRetirementExpenses: 4000,
      lateRetirementExpenses: 3000,
      simulationRuns: 5000
    });

    expect(lowExpenses.successRate).toBeGreaterThan(highExpenses.successRate);
  });

  test('medianAdjustedMonthly is positive when there is a shortfall', () => {
    const result = calculateRetirement({
      ...baseInputs,
      currentSavings: 10000,
      monthlyContribution: 500,
      simulationRuns: 5000,
    });

    expect(result.medianGap).toBeLessThan(0);
    expect(result.medianAdjustedMonthly).toBeGreaterThan(0);
  });

  test('medianTotalNeeded reflects retirement expenses', () => {
    const result = calculateRetirement({
      ...baseInputs,
      earlyRetirementExpenses: 4000,
      lateRetirementExpenses: 3000,
      inflationRate: 2.0,
      expectedReturns: [3, 4, 5],
      simulationRuns: 5000
    });
    
    const minExpected = 350000;
    expect(result.medianTotalNeeded).toBeGreaterThan(minExpected);
  });
});
