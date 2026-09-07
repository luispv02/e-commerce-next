
import { FiCheck } from "react-icons/fi";

interface CheckoutStepsProps {
  currentStep: 1 | 2;
  className?: string;
}

export const CheckoutSteps = ({ currentStep, className = "" }: CheckoutStepsProps) => {
  const isReview = currentStep === 2;

  return (
    <div className={`mx-auto w-full max-w-97.5 ${className}`}>
      <div className="grid grid-cols-[auto_1fr_auto] items-center md:px-0 gap-0.5">
        <div className="flex justify-center">
          <div className="flex size-9 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white shadow-sm">
            {isReview ? <FiCheck className="size-5" /> : "1"}
          </div>
        </div>

        <div className="h-0.5 overflow-hidden rounded-full bg-[#b8c7df]">
          <div className={`h-full rounded-full bg-blue-600 transition-all ${isReview ? "w-full" : "w-[50%]"}`} />
        </div>

        <div className="flex justify-center">
          <div className={`flex size-9 items-center justify-center rounded-full border text-sm font-semibold shadow-sm ${isReview
            ? "border-blue-600 bg-blue-600 text-white"
            : "border-[#b8c7df] bg-slate-50 text-[#38558a]"}`
          }>
            2
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 text-center text-sm font-medium">
        <span className="text-slate-950">Dirección de envío</span>
        <span className={isReview ? "text-slate-950" : "text-[#38558a]"}>
          Revisar pedido
        </span>
      </div>
    </div >
  );
};
