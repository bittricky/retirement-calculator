import { FC } from "react";

import { Sparkles, AlertTriangle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { OutlookProps } from "@/types/global";

const Outlook: FC<OutlookProps> = ({ successRate }) => {
  const getMessage = () => {
    if (successRate >= 80) {
      return {
        icon: <Sparkles className="w-5 h-5 text-green-500" />,
        title: "Exceptional Outlook!",
        message:
          "You're well ahead of your retirement goals. Consider exploring legacy planning or charitable giving options.",
        className: "bg-green-100/50 dark:bg-green-900/20",
      };
    } else if (successRate >= 50) {
      return {
        icon: <Sparkles className="w-5 h-5 text-primary" />,
        title: "On Track",
        message:
          "You're meeting your retirement goals. Keep up the great work and stay consistent with your savings.",
        className: "bg-primary/10 dark:bg-primary/20",
      };
    } else if (successRate >= 20) {
      return {
        icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
        title: "Minor Adjustments Needed",
        message:
          "You're close to your goals. Small increases in savings can help bridge the gap.",
        className: "bg-yellow-100/50 dark:bg-yellow-900/20",
      };
    } else {
      return {
        icon: <AlertTriangle className="w-5 h-5 text-destructive" />,
        title: "Action Required",
        message:
          "Consider increasing your savings rate or adjusting your retirement expectations to meet your goals.",
        className: "bg-destructive/10 dark:bg-destructive/20",
      };
    }
  };

  const { icon, title, message, className } = getMessage();

  return (
    <Card className={cn("border", className)}>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <CardTitle className="font-semibold">{title}</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
};

Outlook.displayName = "Outlook";

export default Outlook;
