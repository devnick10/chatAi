import { CTA, Feature } from "@/constant/data";
import { Button } from "../ui/button";

interface PricingCardProps {
  planType: string;
  price: number;
  interval: string;
  description: string;
  features: Feature[];
  highlight?: boolean;
  cta: CTA;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  planType,
  price,
  interval,
  description,
  features,
  highlight,
  cta,
}: PricingCardProps) => {
  const handleClick = () => {
    if (cta.onClick) {
      cta.onClick();
    } else if (cta.href) {
      window.location.href = cta.href;
    }
  };

  return (
    <div
      className={`flex-1 p-6 overflow-hidden rounded-xl flex flex-col justify-start items-start gap-6 bg-gradient-to-b from-gray-50/5 to-gray-50/0 ${highlight ? "ring-2 ring-blue-500 scale-105" : ""}`}
      style={{ outline: "1px solid hsl(var(--border))", outlineOffset: "-1px" }}
    >
      <div className="self-stretch flex flex-col justify-start items-start gap-6">
        <div className="self-stretch flex flex-col justify-start items-start gap-8">
          <div className="w-full text-sm font-medium leading-tight text-zinc-200">
            {planType}
          </div>
          <div className="self-stretch flex flex-col justify-start items-start gap-1">
            <div className="flex justify-start items-center gap-1.5">
              <div className="relative h-10 flex items-center text-3xl font-medium leading-10 text-zinc-50">
                <span className="invisible">${price}</span>
                <span
                  className="absolute inset-0 flex items-center transition-all duration-500"
                  style={{
                    opacity: 0,
                    transform: "scale(0.8)",
                    filter: "blur(4px)",
                  }}
                  aria-hidden="true"
                >
                  ${price}
                </span>
                <span
                  className="absolute inset-0 flex items-center transition-all duration-500"
                  style={{
                    opacity: 1,
                    transform: "scale(1)",
                    filter: "blur(0px)",
                  }}
                  aria-hidden="false"
                >
                  ${price}
                </span>
              </div>
              <div className="text-center text-sm font-medium leading-tight text-zinc-400">
                /{interval}
              </div>
            </div>
            <div className="self-stretch text-sm font-medium leading-tight text-zinc-400">
              {description}
            </div>
          </div>
        </div>
        <Button variants="large" onClick={handleClick}>
          <div className="px-1.5 flex justify-center items-center gap-2">
            <span className="text-center text-sm font-medium leading-tight text-gray-800">
              {cta.text}
            </span>
          </div>
        </Button>
      </div>
      <div className="self-stretch flex flex-col justify-start items-start gap-4">
        <div className="self-stretch text-sm font-medium leading-tight text-muted-foreground">
          What&apos;s included:
        </div>
        <div className="self-stretch flex flex-col justify-start items-start gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="self-stretch flex justify-start items-center gap-2"
            >
              <div className="w-4 h-4 flex items-center justify-center">
                {feature.included ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`lucide lucide-check w-full h-full ${feature.highlight ? "text-green-500" : "text-muted-foreground"}`}
                  >
                    <path d="M20 6 9 17l-5-5"></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-x w-full h-full text-red-400"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                )}
              </div>
              <div
                className={`leading-tight font-normal text-sm text-left ${feature.included ? "text-muted-foreground" : "text-zinc-500 line-through"} ${feature.highlight ? "text-green-500 font-semibold" : ""}`}
              >
                {feature.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
