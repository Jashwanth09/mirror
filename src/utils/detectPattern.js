export function detectBlindSpot(interactions, currentDomain) {
  const domainInteractions = interactions.filter(i => i.domain === currentDomain)
  
  if (domainInteractions.length < 5) return null

  const unchecked = domainInteractions.filter(i => i.dependencies_clicked === 0)
  const uncheckedRate = unchecked.length / domainInteractions.length

  if (uncheckedRate >= 0.7) {
    return {
      domain: currentDomain,
      message: getDomainMessage(currentDomain),
      examples: unchecked.slice(0, 3)
    }
  }

  return null
}

function getDomainMessage(domain) {
  const messages = {
    career: "You tend to accept career advice without checking its dependencies.",
    research: "You rarely verify assumptions in research outputs before acting on them.",
    strategy: "You tend to accept strategic recommendations without reviewing dependencies."
  }
  return messages[domain] || "You tend to skip dependency checks in this area."
}
