import { FC } from "react";

import { ResultsProps } from "@/types/global";
import { formatCurrency } from "@/utils/currency";

import Outlook from "@/components/common/Outlook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const Results: FC<ResultsProps> = ({ results, inputs }) => {
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge;

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Your Retirement Outlook</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Outlook successRate={results.successRate} />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Median Total Needed for Retirement
                </p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {formatCurrency(results.medianTotalNeeded)}
                </p>
              </CardContent>
            </Card>

            <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Median Projected Savings
                </p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {formatCurrency(results.medianProjectedSavings)}
                </p>
              </CardContent>
            </Card>

            <Card
              className={cn(
                "border transition-colors",
                results.medianGap > 0
                  ? "bg-destructive/10 hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30"
                  : "bg-green-100/50 hover:bg-green-100/70 dark:bg-green-900/20 dark:hover:bg-green-900/30"
              )}
            >
              <CardContent className="p-4">
                <p className="text-sm font-medium text-muted-foreground">Savings Gap</p>
                <p className={cn(
                  "text-2xl font-bold mt-1",
                  results.medianGap > 0 ? "text-destructive" : "text-green-600 dark:text-green-400"
                )}>
                  {results.medianGap > 0 ? "-" : "+"}
                  {formatCurrency(Math.abs(results.medianGap))}
                </p>
              </CardContent>
            </Card>

            {results.medianGap > 0 && (
              <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    Recommended Monthly Adjustment
                  </p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    +{formatCurrency(results.medianAdjustedMonthly)}
                  </p>
                </CardContent>
              </Card>
            )}

            <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
              <CardContent className="p-4">
                <p className="text-sm font-medium text-muted-foreground">
                  Time Until Retirement
                </p>
                <p className="text-2xl font-bold text-primary mt-1">
                  {yearsToRetirement} years
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Results.displayName = "Results";

export default Results;
