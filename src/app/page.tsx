'use client';

import React, { useEffect, useState } from "react";
import { AzureOpenAI } from "openai";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const endpoint = process.env.AZURE_OPENAI_ENDPOINT || "https://ai-moonyoingaipa589005681748.openai.azure.com/";
const apiKey = process.env.AZURE_OPENAI_API_KEY || "b0b9a2e7b8944509a89cbec344aa04e4";
const apiVersion = "2024-04-01-preview";
const deployment = "gpt-35-turbo";

const client = new AzureOpenAI({ endpoint, apiKey, apiVersion, deployment });

const ChatCompletion = () => {
  const [messages, setMessages] = useState<any[]>([
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Does Azure OpenAI support customer managed keys?" },
  ]);

  const { data, error, mutate } = useSWR(
    messages,
    async (messages) => {
      const result = await client.chat.completions.create({
        messages,
        model: 'gpt-3.5-turbo',
      });
      return result.choices[0].message;
    },
    { revalidateOnFocus: false }
  );

  useEffect(() => {
    if (data) {
      setMessages((prev) => [...prev, data]);
    }
  }, [data]);

  if (error) return <div>Error loading messages...</div>;
  if (!data) return <div>Loading messages...</div>;

  return (
    <div>
      <p>Hello</p>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.role}: {message.content}
          </li>
        ))}
      </ul>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const userInput = "What is an Alibi"//e.target.elements.userInput.value;
          if (!userInput.trim()) return;

          setMessages((prev) => [
            ...prev,
            { role: "user", content: userInput },
            {role:'assistant'}
          ]);
          mutate();
          client.chat.completions.create({
            messages: [
              ...messages,
              { role: "user", content: userInput },
            ],
            model: "",
          })
          .then((result) => {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: result.choices[0].message.content },
            ]);
          })
          .catch((error) => {
            console.error(error);
          });
         
          //e.target.elements.userInput.value = "";
        }}
      >
      
        <input type="text" id="userInput" />
        <button type="submit">Send Message</button>
        <h1>Come on Work</h1>
      </form>
    </div>
  );
};

export default ChatCompletion;

// import { useState } from 'react';
// import { Message, continueConversation } from './actions';

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export default function Home() {
//   const [conversation, setConversation] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>('');

//   return (
//     <div>
//       <div>
//         {conversation.map((message, index) => (
//           <div key={index}>
//             {message.role}: {message.content}
//           </div>
//         ))}
//       </div>

//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={event => {
//             setInput(event.target.value);
//           }}
//         />
//         <button
//           onClick={async () => {
//             const { messages } = await continueConversation([
//               ...conversation,
//               { role: 'user', content: input },
//             ]);

//             setConversation(messages);
//           }}
//         >
//           Send Message
//         </button>
//       </div>
//     </div>
//   );
// }

