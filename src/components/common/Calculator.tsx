import { FC, useState, useEffect } from "react";
import {
  Calculator as CalculatorIcon,
  DollarSign,
  Calendar,
  Wallet,
  TrendingUp,
  PiggyBank,
} from "lucide-react";
import { calculateRetirement } from "@/utils/retirement";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Calculator: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <CalculatorIcon className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl font-bold text-foreground">
          Retirement Calculator
        </h1>
        <p className="text-muted-foreground mt-2">
          Plan your future with confidence
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Input Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* TODO: Add input fields */}
          </CardContent>
        </Card>

        {/* TODO: Add results */}
      </div>
    </div>
  );
};

Calculator.displayName = "Calculator";

export default Calculator;
