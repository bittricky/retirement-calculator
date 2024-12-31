import { FC } from "react";

import { InputFieldProps } from "@/types/global";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const InputField: FC<InputFieldProps> = ({
  label,
  name,
  value,
  onChange,
  icon,
  prefix,
  suffix,
  min,
  max,
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="relative">
        {icon && (
          <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {icon}
          </div>
        )}
        {prefix && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {prefix}
          </div>
        )}
        <Input
          type="text"
          value={value}
          onChange={(e) => {
            const val = e.target.value;
            // Allow empty string, numbers, and decimal point
            if (val === "" || /^\d*\.?\d*$/.test(val)) {
              onChange(name, val === "" ? 0 : Number(val));
            }
          }}
          onBlur={(e) => {
            const val = e.target.value;

            if (val !== "") {
              const num = Number(val);
              if (min !== undefined && num < min) {
                onChange(name, min);
              } else if (max !== undefined && num > max) {
                onChange(name, max);
              }
            }
          }}
          min={min}
          max={max}
          className={cn(
            "transition-colors focus:ring-2",
            icon ? "pl-9" : "",
            prefix ? (icon ? "pl-7" : "pl-7") : "",
            suffix ? "pr-7" : ""
          )}
        />
        {suffix && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {suffix}
          </div>
        )}
      </div>
    </div>
  );
};

InputField.displayName = "InputField";

export default InputField;
