import { Check } from "lucide-react";

interface Step {
  id: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className="flex items-center">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300
                  ${isCompleted ? "bg-[#0064d9] border-[#0064d9]" : ""}
                  ${isActive ? "bg-[#0064d9] border-[#0064d9]" : ""}
                  ${!isActive && !isCompleted ? "bg-white border-[#c9cdd4]" : ""}
                `}
                style={{ minWidth: 32 }}
              >
                {isCompleted ? (
                  <Check size={14} className="text-white" strokeWidth={2.5} />
                ) : (
                  <span
                    className={`${isActive ? "text-white" : "text-[#8696a9]"}`}
                    style={{ fontSize: "13px", fontWeight: 600 }}
                  >
                    {step.id}
                  </span>
                )}
              </div>
              <span
                className={`text-center whitespace-nowrap ${
                  isActive
                    ? "text-[#0064d9]"
                    : isCompleted
                    ? "text-[#0064d9]"
                    : "text-[#8696a9]"
                }`}
                style={{
                  fontSize: "12px",
                  fontWeight: isActive ? 600 : 400,
                  maxWidth: 100,
                }}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div
                className={`h-px mx-3 transition-all duration-500 ${
                  isCompleted ? "bg-[#0064d9]" : "bg-[#c9cdd4]"
                }`}
                style={{ width: 60, marginBottom: 18 }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
