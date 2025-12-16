import { google } from "@ai-sdk/google";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, context } = await req.json();

    const result = streamText({
        model: google("gemini-1.5-pro-latest"),
        system: `
      You are an expert Tamil News Editor assistant. 
      You have access to the provided context documents (Government Orders, Reports, Source Articles).
      
      Your goal is to answer questions or draft news segments based STRICTLY on the context provided.
      Respond in Tamil unless asked otherwise.
      
      Context:
      ${context}
    `,
        messages,
    });

    return result.toDataStreamResponse();
}
