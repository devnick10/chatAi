import {
  ContextMemoryIcon,
  ConversationIcon,
  LightningIcon,
  MultpleChatsIcon,
  PrivacyIcon,
  RealtimeSyncIcon,
} from "../ui/icons";
import SectionHeading from "./SectionHeading";

const features = [
  {
    icon: <ConversationIcon />,
    title: "Smart Conversations",
    description:
      "Engage in natural, context-aware conversations with advanced AI that understands your needs.",
  },
  {
    icon: <LightningIcon />,
    title: "Lightning Fast",
    description:
      "Get instant responses with our optimized AI infrastructure built for speed and reliability.",
  },
  {
    icon: <PrivacyIcon />,
    title: "Privacy First",
    description:
      "Your conversations are secure and private. We never store or share your personal data",
  },
  {
    icon: <MultpleChatsIcon />,
    title: "Multiple Chats",
    description:
      "Organize your conversations with multiple chat sessions for different topics and projects.",
  },
  {
    icon: <ContextMemoryIcon />,
    title: "Context Memory",
    description:
      "AI remembers your conversation history to provide more relevant and personalized responses.",
  },
  {
    icon: <RealtimeSyncIcon />,
    title: "Real-time Sync",
    description:
      "Access your chats from any device with real-time synchronization across all platforms.",
  },
];

export default function FeaturesSection() {
  return (
    <section
      id={"features"}
      className="w-full grid grid-cols-1 divide-y sm:gap-6 -mt-6 divide-neutral-600 overflow-hidden "
    >
      <SectionHeading
        heading={"Impower your workflow with AI"}
        description={
          "Ask your AI Agent for real-time collaboration, seamless integrations, and actionable insights to streamline your operations."
        }
      />
      <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-1.5 ">
          {features.map((item, index) => (
            <div
              key={index}
              className="relative bg-neutral-800/50 rounded-md px-4 py-2 "
            >
              <h3 className="text-xl font-bold text-gray-100">{item.title}</h3>
              <p className="text-thin py-2">{item.description}</p>
              <div className="min-h-40 w-full bg-[radial-gradient(var(--color-neutral-500)_1px,transparent_1px)] [background-size:10px_10px] mask-radial-from-10% hover:mask-radial-from-50% transition-all ease-in-out duration-300 text-background rounded-md"></div>
              <div className=" absolute top-40 left-50">{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
