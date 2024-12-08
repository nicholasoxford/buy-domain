import * as React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { Label } from "./label";

interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
}

export function FormSection({
  title,
  description,
  children,
  className,
  ...props
}: FormSectionProps) {
  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <div className={cn("p-6 space-y-6", className)} {...props}>
        {(title || description) && (
          <div className="space-y-1">
            {title && (
              <h3 className="text-lg font-semibold text-slate-200">{title}</h3>
            )}
            {description && (
              <p className="text-sm text-slate-400">{description}</p>
            )}
          </div>
        )}
        {children}
      </div>
    </Card>
  );
}

interface FormRowProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number;
}

export function FormRow({
  children,
  columns = 1,
  className,
  ...props
}: FormRowProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        {
          "grid-cols-1": columns === 1,
          "grid-cols-2": columns === 2,
          "grid-cols-3": columns === 3,
          "grid-cols-4": columns === 4,
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  optional?: boolean;
}

export function FormField({
  label,
  optional,
  children,
  className,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)} {...props}>
      <Label className="text-slate-200">
        {label} {optional && <span className="text-slate-500">(Optional)</span>}
      </Label>
      {children}
    </div>
  );
}

interface FormActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function FormActions({
  children,
  className,
  ...props
}: FormActionsProps) {
  return (
    <div
      className={cn("flex items-center justify-end space-x-4", className)}
      {...props}
    >
      {children}
    </div>
  );
}
