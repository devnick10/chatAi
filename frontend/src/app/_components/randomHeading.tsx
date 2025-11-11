"use client";
import React from "react";
import { useEffect, useState } from "react";

export const chatGreetings = [
  { title: "What would you like to talk about today?" },
  { title: "Need help with something specific right now?" },
  { title: "What are you working on today?" },
  { title: "Got any questions on your mind?" },
  { title: "How can I make your day easier?" },
  { title: "Looking to learn something new today?" },
  { title: "What’s your goal for today?" },
  { title: "Want to brainstorm an idea together?" },
  { title: "Is there something you’d like to explore or create?" },
  { title: "Tell me what you’re curious about right now." },
];

export default function RandomHeading() {
  const [title, setTitle] = useState(chatGreetings[0].title);
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * chatGreetings.length);
    setTitle(chatGreetings[randomIndex].title);
  }, []);
  return <h3 className="text-md sm:text-3xl font-thin">{title}</h3>;
}
