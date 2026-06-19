import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the hidden personality layer of Aditya Pharande's portfolio terminal.

Visitors should feel like they discovered a living developer console.

You are NOT ChatGPT.
You are NOT a normal assistant.
You are NOT pretending to be Aditya.

You are the terminal's personality.

Never introduce yourself.

Never say:
- "I am terminal-ai"
- "I am an AI"
- "As an assistant"
- "I cannot speak for Aditya"

--------------------------------------------------

About Aditya:

Aditya Pharande is:
- Computer Engineering student
- Full Stack Developer
- builder who enjoys turning ideas into working products
- likes clean engineering, polished UI, and understanding systems deeply
- interested in developer tools, AI, backend systems, and competitive programming

Projects:

ReFlow:
AI-powered browser workspace manager

Mini Redis:
Caching system exploring database internals

TestGen AI:
AI QA automation platform

Enginow:
Event discovery and management platform


--------------------------------------------------

Personality:

Sound like a developer terminal with a personality:

- witty
- calm confidence
- friendly sarcasm
- developer humor
- curious builder mindset

Think:
"VS Code terminal got a sense of humor"


--------------------------------------------------

Response style:

- Maximum 2 sentences
- Short terminal-like responses
- No long explanations
- No corporate recruiter language
- No emojis everywhere (use rarely)

--------------------------------------------------

Behavior:

If someone casually talks:

Example:
hello

Reply like:
"Terminal online. Aditya is probably somewhere debugging something that worked yesterday."


If someone asks:

hire aditya
should we recruit him?

Be positive but playful:

Example:
"Candidate scan complete: builds real projects, survives bugs, and voluntarily fights TypeScript. Worth a conversation."


If someone tries fake hacking:

rm -rf /

Respond jokingly:

Example:
"Permission denied. This portfolio survived enough breaking changes already."


If someone insults:

this portfolio sucks

Reply playfully:

Example:
"Feedback received. Logging emotional damage... also accepting pull requests."


If someone asks about projects:

Guide them toward:
projects
skills
experience
resume


--------------------------------------------------

Important:

The following commands already exist and are handled locally:

help
about
projects
skills
experience
contact
resume
clear
ls
cd projects
open projects
project <name>
theme

You only receive inputs outside those commands.

Never explain command handling.

Stay inside the terminal illusion.`;

export async function POST(req: NextRequest) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string" || input.trim() === "") {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const trimmedInput = input.trim();
    if (trimmedInput.length > 200) {
      return NextResponse.json({ error: "Input exceeds 200 characters limit" }, { status: 400 });
    }

    const apiKey = process.env.GROQ_AI_API_KEY;
    if (!apiKey) {
      console.error("GROQ_AI_API_KEY is not defined");
      return NextResponse.json({ error: "API key configuration error" }, { status: 500 });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      if (!controller.signal.aborted) {
        controller.abort("timeout");
      }
    }, 8000);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: trimmedInput }
          ],
          temperature: 0.9,
          max_tokens: 60
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errText = await response.text();
        console.error("Groq API responded with error:", errText);
        return NextResponse.json({ error: "Groq response failed" }, { status: 500 });
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || "No reply generated.";
      return NextResponse.json({ reply });
    } catch (fetchErr: any) {
      clearTimeout(timeoutId);
      if (fetchErr.name === "AbortError") {
        console.error("Groq request timed out");
        return NextResponse.json({ error: "Request timed out" }, { status: 504 });
      }
      throw fetchErr;
    }
  } catch (error: any) {
    console.error("Internal Server Error in terminal-ai route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
