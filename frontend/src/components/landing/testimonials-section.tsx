import { Testimonial, testimonials } from '@/constant/data';
import React from 'react';
import { TestimonialCard } from './testimonial-card';
import SectionHeading from './SectionHeading';

const TestimonialSection: React.FC = () => {
    const featuredTestimonials = testimonials.filter((t: Testimonial) => t.featured);
    const regularTestimonials = testimonials.filter((t: Testimonial) => !t.featured);

    // Split regular testimonials into columns
    const column1: Testimonial[] = regularTestimonials.slice(0, 2);
    const column2: Testimonial[] = regularTestimonials.slice(2, 4);
    const column3: Testimonial[] = regularTestimonials.slice(4, 6);

    return (
        <section id="testimonials" className="w-full mt-16 grid grid-cols-1 divide-y divide-neutral-600">
            <SectionHeading
                heading={"One AI For All Your Needs"}
                description={"One intelligent assistant that helps with everything in your life. From answering questions and writing content to planning and problem-solving - all in one place, all with one AI."}
            />
            <div className="w-full max-w-7xl mx-auto flex justify-center items-center py-10">
                <div className="w-full pt-0.5 pb-4 md:pb-6 lg:pb-10 flex flex-col md:flex-row justify-center items-start gap-4 md:gap-4 lg:gap-6 max-w-[1100px] mx-auto ">
                    <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
                        <TestimonialCard testimonial={featuredTestimonials[0]} />
                        {column1.map((testimonial: Testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
                        {column2.map((testimonial: Testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                        {column3.map((testimonial: Testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                    </div>
                    <div className="flex-1 flex flex-col justify-start items-start gap-4 md:gap-4 lg:gap-6">
                        {column3.length === 0 && column2.slice(2).map((testimonial: Testimonial) => (
                            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                        ))}
                        <TestimonialCard testimonial={featuredTestimonials[1]} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;