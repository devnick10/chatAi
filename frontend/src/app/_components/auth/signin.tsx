import { IconMessageQuestion } from "@tabler/icons-react";
import { SignInCard } from "./signin-card";

export default function SignIn() {
    return (
        <section id='signin' className='w-screen h-screen flex flex-col justify-center items-center -mt-12 '>
            {/* Logo */}
            <div className="mx-auto flex gap-1 ">
                <IconMessageQuestion className="text-blue-500/80" />
                <h1 className="text-2xl font-bold text-foreground">Chat AI</h1>
            </div>
            <SignInCard />
        </section>
    )
}





