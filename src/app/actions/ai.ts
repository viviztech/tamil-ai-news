"use server";

import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";

// Define the schema for structured AI output (Article Metadata)
const newsMetadataSchema = z.object({
    title_ta: z.string().describe("Catchy headline in Tamil"),
    summary_ta: z.array(z.string()).describe("3-5 bullet points summarizing the article in Tamil"),
    category: z.enum(["politics", "cinema", "technology", "world", "sports", "business"]),
    seo_tags: z.array(z.string()).describe("10 relevant SEO keywords in English and Tamil"),
    sentiment: z.enum(["positive", "negative", "neutral"]),
});

export async function generateNewsMetadata(content: string) {
    "use server";

    try {
        const { object } = await generateObject({
            model: google("gemini-1.5-pro-latest"),
            schema: newsMetadataSchema,
            prompt: `
        Analyze the following news content and generate metadata for a Tamil news portal.
        
        Content:
        ${content.substring(0, 10000)}
        
        Requirements:
        1. Translate/Summarize the core essence into Tamil.
        2. Create a catchy, click-worthy but factual headline in Tamil.
        3. Identify the category.
        4. Generate high-value SEO tags.
      `,
        });

        return { success: true, data: object };
    } catch (error) {
        console.error("AI Generation Error:", error);
        return { success: false, error: "Failed to generate metadata" };
    }
}

export async function translateToTamil(text: string) {
    "use server";

    try {
        const { text: translatedText } = await generateText({
            model: google("gemini-1.5-pro-latest"),
            prompt: `
        Translate the following news text into formal yet accessible Tamil (News Style).
        Maintain the journalistic tone.
        
        Text:
        ${text}
      `
        });

        return { success: true, data: translatedText };
    } catch (error) {
        return { success: false, error: "Translation failed" };
    }
}
