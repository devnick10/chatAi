import { Testimonial } from "@/constant/data";

interface TestimonialCardProps {
    testimonial: Testimonial;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    if (testimonial.featured) {
        return (
            <div className="flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative p-6 bg-primary w-full md:w-[384px] h-[502px]">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/images/large-card-background.svg')",
                        zIndex: 0
                    }}
                />
                <div className="relative z-10 font-normal break-words text-primary-foreground text-2xl font-medium leading-8">
                    {testimonial.quote}
                </div>
                <div className="relative z-10 flex justify-start items-center gap-3">
                    <img
                        alt={`${testimonial.name} avatar`}
                        loading="lazy"
                        width="48"
                        height="48"
                        className="w-12 h-12 rounded-[41px] border border-white/8"
                        src={testimonial.avatar}
                    />
                    <div className="flex flex-col justify-start items-start gap-0.5">
                        <div className="text-primary-foreground text-base font-normal leading-6">
                            {testimonial.name}
                        </div>
                        <div className="text-primary-foreground/60 text-base font-normal leading-6">
                            {testimonial.company}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col justify-between items-start overflow-hidden rounded-[10px] shadow-[0px_2px_4px_rgba(0,0,0,0.08)] relative p-[30px] bg-card outline outline-1 outline-border outline-offset-[-1px] w-full md:w-[384px] h-[244px]">
            <div className="relative z-10 font-normal break-words text-foreground/80 text-[17px] font-normal leading-6">
                {testimonial.quote}
            </div>
            <div className="relative z-10 flex justify-start items-center gap-3">
                <img
                    alt={`${testimonial.name} avatar`}
                    loading="lazy"
                    width="36"
                    height="36"
                    className="w-9 h-9 rounded-[30.75px] border border-white/8"
                    src={testimonial.avatar}
                />
                <div className="flex flex-col justify-start items-start gap-0.5">
                    <div className="text-foreground text-sm font-normal leading-[22px]">
                        {testimonial.name}
                    </div>
                    <div className="text-muted-foreground text-sm font-normal leading-[22px]">
                        {testimonial.company}
                    </div>
                </div>
            </div>
        </div>
    );
};
