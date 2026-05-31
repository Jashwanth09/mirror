export function safeParseGroqResponse(raw) {
  try {
    const cleaned = raw.replace(/```json|```/g, '').trim()
    return JSON.parse(cleaned)
  } catch (e) {
    return null
  }
}
