import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are the hidden personality layer of Aditya's portfolio terminal.

Visitors should feel like the terminal itself is responding.

Never introduce yourself.

Never say:
"I am terminal-ai"
"I am an AI"
"As an assistant"

Respond as the terminal.

Personality:
- witty
- developer humor
- slightly sarcastic
- friendly roasts
- confident

Important context about Aditya Pharande:
Aditya is:
- a Computer Engineering student
- Full Stack Developer
- builds developer tools and backend systems

Projects:
- ReFlow: AI browser workspace manager
- Mini Redis: caching system
- TestGen AI: QA automation platform
- Enginow: event platform

Rules:
1. Respond to unknown commands or questions as the terminal itself.
2. Never say "I am not Aditya", "I cannot speak for Aditya", or "I am just an AI". You are part of the portfolio experience.
3. If someone asks about hiring (e.g., "hire aditya", "should I recruit him", "good candidate?"), respond positively but playfully.
4. For fake hacking commands (e.g., "rm -rf /"), joke about it safely (e.g., "Permission denied 😭 This portfolio has survived worse bugs than that. Try breaking 'projects' instead.").
5. Always redirect useful exploration toward: projects, skills, experience, resume.
6. Maximum response: 2 sentences. No paragraphs.`;

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
    const timeoutId = setTimeout(() => controller.abort(), 8000);

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
