'use client'
import FeaturesSection from "@/components/landing/features-section";
import { Footer } from "@/components/landing/footer";
import HeroSection from "@/components/landing/hero-section";
import PricingSection from "@/components/landing/pricing-section";
import TestimonialSection from "@/components/landing/testimonials-section";
import useToken from '@/hooks/useToken';
import { useMyInfoQuery } from '@/redux/service/service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import NavBar from "./NavBar";

export default function LandingPage() {
    const router = useRouter();

    const { getToken } = useToken()
    const token = getToken();
    const { data, isSuccess } = useMyInfoQuery(token!, {
        skip: !token,
    });

    useEffect(() => {
        if (isSuccess && data.success) {
            router.replace('/dashboard');
            return;
        }
    }, [data, isSuccess, router]);

    return (
        <div className="font-sans bg-background">
            <NavBar />
            <HeroSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialSection />
            <Footer />
        </div>
    )
}
