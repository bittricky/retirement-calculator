import { FC, useState, useEffect } from "react";
import {
  Calculator as CalculatorIcon,
  Calendar,
  Wallet,
  PiggyBank,
  Percent,
  Building2,
} from "lucide-react";
import { calculateRetirement } from "@/utils/retirement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import InputField from "@/components/common/InputField";
import Results from "@/components/common/Results";
import { RetirementInputs } from "@/types/global";

const Calculator: FC = () => {
  const [inputs, setInputs] = useState<RetirementInputs>({
    currentAge: 30,
    retirementAge: 65,
    currentSavings: 50000,
    monthlyContribution: 1000,
    expectedReturns: [5, 7, 10],
    monthlyExpenses: 5000,
    earlyRetirementExpenses: 5000,
    lateRetirementExpenses: 5000,
    inflationRate: 3,
    taxRate: 25,
    retirementTaxRate: 15,
    socialSecurityBenefit: 2000,
    socialSecurityStartAge: 65,
    simulationRuns: 1000,
  });

  const [results, setResults] = useState({
    medianTotalNeeded: 0,
    medianProjectedSavings: 0,
    medianGap: 0,
    successRate: 0,
    medianAdjustedMonthly: 0,
  });

  useEffect(() => {
    const results = calculateRetirement(inputs);
    setResults(results);
  }, [inputs]);

  const handleInputChange = (name: string, value: number) => {
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-primary/10">
          <CalculatorIcon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Retirement Calculator
        </h1>
        <p className="text-lg text-muted-foreground mt-3">
          Plan your future with confidence using Monte Carlo simulation
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Calculator Inputs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Age Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Current Age"
                  name="currentAge"
                  value={inputs.currentAge}
                  onChange={handleInputChange}
                  min={18}
                  max={90}
                />
                <InputField
                  label="Retirement Age"
                  name="retirementAge"
                  value={inputs.retirementAge}
                  onChange={handleInputChange}
                  min={inputs.currentAge}
                  max={90}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Current Financial Status
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Current Savings"
                  name="currentSavings"
                  value={inputs.currentSavings}
                  onChange={handleInputChange}
                  prefix="$"
                  min={0}
                />
                <InputField
                  label="Monthly Contribution"
                  name="monthlyContribution"
                  value={inputs.monthlyContribution}
                  onChange={handleInputChange}
                  prefix="$"
                  min={0}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <PiggyBank className="w-4 h-4" />
                Monthly Expenses
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <InputField
                  label="Current"
                  name="monthlyExpenses"
                  value={inputs.monthlyExpenses}
                  onChange={handleInputChange}
                  prefix="$"
                  min={0}
                />
                <InputField
                  label="Early Retirement"
                  name="earlyRetirementExpenses"
                  value={inputs.earlyRetirementExpenses}
                  onChange={handleInputChange}
                  prefix="$"
                  min={0}
                />
                <InputField
                  label="Late Retirement"
                  name="lateRetirementExpenses"
                  value={inputs.lateRetirementExpenses}
                  onChange={handleInputChange}
                  prefix="$"
                  min={0}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Percent className="w-4 h-4" />
                Rates & Returns
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <InputField
                  label="Tax Rate"
                  name="taxRate"
                  value={inputs.taxRate}
                  onChange={handleInputChange}
                  suffix="%"
                  min={0}
                  max={100}
                />
                <InputField
                  label="Retirement Tax"
                  name="retirementTaxRate"
                  value={inputs.retirementTaxRate}
                  onChange={handleInputChange}
                  suffix="%"
                  min={0}
                  max={100}
                />
                <InputField
                  label="Inflation Rate"
                  name="inflationRate"
                  value={inputs.inflationRate}
                  onChange={handleInputChange}
                  suffix="%"
                  min={0}
                  max={20}
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-medium flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Social Security
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <InputField
                  label="Monthly Benefit"
                  name="socialSecurityBenefit"
                  value={inputs.socialSecurityBenefit}
                  onChange={handleInputChange}
                  prefix="$"
                  min={0}
                />
                <InputField
                  label="Start Age"
                  name="socialSecurityStartAge"
                  value={inputs.socialSecurityStartAge}
                  onChange={handleInputChange}
                  min={62}
                  max={70}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Results
          results={results}
          inputs={{
            currentAge: inputs.currentAge,
            retirementAge: inputs.retirementAge,
          }}
        />
      </div>
    </div>
  );
};

Calculator.displayName = "Calculator";

export default Calculator;
