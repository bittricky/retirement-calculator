import { FC } from "react";
import {
  TrendingUp,
  ArrowRight,
  Wallet,
  PiggyBank,
  CalendarClock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import { ResultsProps } from "@/types/global";
import { formatCurrency } from "@/utils/currency";
import { cn } from "@/lib/utils";

import Outlook from "@/components/common/Outlook";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";

const Results: FC<ResultsProps> = ({ results, inputs }) => {
  const yearsToRetirement = inputs.retirementAge - inputs.currentAge;
  const progressPercentage = (inputs.currentAge / inputs.retirementAge) * 100;

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Outlook</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <Outlook successRate={results.successRate} />

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <CalendarClock className="w-4 h-4" />
              Timeline
            </h3>
            <Card className="border bg-card/50">
              <CardContent className="p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Age: {inputs.currentAge}</span>
                  <span>Retirement Age: {inputs.retirementAge}</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                <p className="text-sm text-muted-foreground text-center mt-2">
                  {yearsToRetirement} years until retirement
                </p>
              </CardContent>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Financial Overview
            </h3>
            <div className="grid gap-4">
              <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Total Needed for Retirement
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {formatCurrency(results.medianTotalNeeded)}
                      </p>
                    </div>
                    <Wallet className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Projected Savings
                      </p>
                      <p className="text-2xl font-bold text-primary mt-1">
                        {formatCurrency(results.medianProjectedSavings)}
                      </p>
                    </div>
                    <PiggyBank className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Success Rate
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <p className={cn(
                          "text-2xl font-bold",
                          results.successRate >= 80 
                            ? "text-green-600 dark:text-green-400"
                            : results.successRate >= 60
                            ? "text-yellow-600 dark:text-yellow-400"
                            : "text-destructive"
                        )}>
                          {results.successRate.toFixed(0)}%
                        </p>
                      </div>
                    </div>
                    <Progress 
                      value={results.successRate} 
                      className={cn(
                        "w-24",
                        results.successRate >= 80 
                          ? "bg-green-600/30 dark:bg-green-400/30"
                          : results.successRate >= 60
                          ? "bg-yellow-600/30 dark:bg-yellow-400/30"
                          : "bg-destructive/30"
                      )}
                      indicatorClassName={cn(
                        results.successRate >= 80 
                          ? "bg-green-600 dark:bg-green-400"
                          : results.successRate >= 60
                          ? "bg-yellow-600 dark:bg-yellow-400"
                          : "bg-destructive"
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card
                className={cn(
                  "border transition-colors",
                  results.medianGap < 0
                    ? "bg-destructive/10 hover:bg-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30"
                    : "bg-green-100/50 hover:bg-green-100/70 dark:bg-green-900/20 dark:hover:bg-green-900/30"
                )}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">
                        Savings Gap
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        {results.medianGap < 0 ? (
                          <ArrowDownRight className="w-5 h-5 text-destructive" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-green-600 dark:text-green-400" />
                        )}
                        <p
                          className={cn(
                            "text-2xl font-bold",
                            results.medianGap < 0
                              ? "text-destructive"
                              : "text-green-600 dark:text-green-400"
                          )}
                        >
                          {formatCurrency(Math.abs(results.medianGap))}
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className={cn(
                        "w-8 h-8",
                        results.medianGap < 0
                          ? "text-destructive/30"
                          : "text-green-600/30 dark:text-green-400/30"
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {results.medianGap < 0 && (
                <Card className="border bg-card/50 hover:bg-card/80 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Recommended Monthly Adjustment
                        </p>
                        <p className="text-2xl font-bold text-primary mt-1">
                          +{formatCurrency(results.medianAdjustedMonthly)}
                        </p>
                      </div>
                      <TrendingUp className="w-8 h-8 text-muted-foreground/30" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              These projections are based on Monte Carlo simulations with{" "}
              <span className="font-medium">1,000 different scenarios</span>,
              considering market volatility and various economic factors.
            </p>
            <p className="text-sm text-muted-foreground">
              The success rate indicates the percentage of scenarios where your
              savings last through retirement.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

Results.displayName = "Results";

export default Results;
