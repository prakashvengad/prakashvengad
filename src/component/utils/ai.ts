export async function getAIResponse(prompt: string) {
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 100,
    }),
  });

  const data = await res.json();
  return data.choices[0].message.content;
}

// Modify handleVoiceCommand in VoiceWidget.tsx:
// const gptResponse = await getAIResponse(command);
// setAiResponse(gptResponse);