'use client'

import { plans } from '@/constant/data';
import React from 'react'
import { PricingCard } from './pricing-card';
import SectionHeading from './SectionHeading';


export default function PricingSection() {
    return (
        <section id={"pricing"} className='w-full  mt-16 sm:mt-0 grid grid-cols-1 divide-y divide-neutral-600'>
            <SectionHeading
                heading={"Affordable AI - Powered Plan"}
                description={"Get 100 monthly credits to power your AI conversations and boost your productivity"}
            />
            <div className=' w-full h-auto mt-2 sm:mt-10 sm:w-7xl mx-auto flex justify-center items-center'>
                <div className='grid sm:grid-cols-3 gap-2 sm:gap-8 px-2 sm:px-0'>
                    {plans.map((plan, index) => (
                        <PricingCard
                            key={index}
                            planType={plan.name}
                            price={plan.price}
                            interval={plan.interval}
                            description={plan.description}
                            features={plan.features}
                            highlight={plan.highlight}
                            cta={plan.cta}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

