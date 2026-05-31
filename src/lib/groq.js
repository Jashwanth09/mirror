import axios from 'axios'

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions'

export async function getMirrorResponse(userPrompt) {
  const systemPrompt = `You are Mirror, an AI assistant that helps users evaluate AI outputs critically.

For every user query, respond with ONLY a valid JSON object. No markdown. No explanation. Just the JSON.

JSON structure:
{
  "signal_label": "one of: widely_agreed | logical_guess | debated | speculative",
  "signal_reason": "one sentence explaining why this label applies",
  "response": "your main answer to the user query, 3-5 sentences",
  "dependencies": [
    {
      "assumption": "what this answer assumes to be true",
      "consequence": "what changes if this assumption is wrong",
      "alternative": "rewrite the answer assuming this assumption is false, 2-3 sentences"
    }
  ],
  "weak_points": [
    {
      "phrase": "exact short phrase from your response text",
      "reason": "one line explaining why this is the weakest part"
    }
  ],
  "domain": "one of: career | research | strategy"
}

Rules:
- dependencies array must have exactly 3 items
- weak_points array must have exactly 2 items
- phrase in weak_points must be an exact substring of response text
- signal_label must reflect genuine epistemic status of the answer
- alternative must be substantively different from the main response`

  const res = await axios.post(
    GROQ_API_URL,
    {
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1500
    },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  )

  const raw = res.data.choices[0].message.content
  return JSON.parse(raw)
}
