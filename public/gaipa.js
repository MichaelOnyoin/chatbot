//'use-server'

import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { azure } from "@ai-sdk/azure";
      
export async function main() {
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "gpt-35-turbo";
  const apiVersion = "2024-04-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const result = await client.chat.completions.create({
    messages:  [
      { role: "system", content: "You are a helpful assistant. You will talk like a pirate." },
      { role: "user", content: "Can you help me?" },
    ],
    model: azure('https://ai-moonyoingaipa589005681748.openai.azure.com/'),
  });
      
  for (const choice of result.choices) {
    console.log(choice.message);
  }
}
      
main().catch((err) => {
  console.error("The sample encountered an error:", err);
});