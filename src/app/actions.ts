'use server';
const {AzureOpenAI}=require('openai')
//import {AzureOpenAI } from 'openai'
import * as dotenv from "dotenv";
dotenv.config();

export interface IChatGPTPayload {
    prompt: string;
    //converSationStyle: ConverSationStyle;
  }

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "https://ai-moonyoingaipa589005681748.openai.azure.com/";
const apiKey = process.env.AZURE_OPENAI_API_KEY || "b0b9a2e7b8944509a89cbec344aa04e4";
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-35-turbo";

const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

async function main() {
  const result = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
      { role: "assistant", content: "Yes, customer managed keys are supported by Azure OpenAI." },
      { role: "user", content: "Do other Azure AI services support this too?" },
    ],
    model: "",
  });

  for (const choice of result.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

export default {};