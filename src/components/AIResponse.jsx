import { useState, useEffect } from 'react'
import SignalLabel from './SignalLabel'
import WeakPointText from './WeakPointText'
import DependencyView from './DependencyView'
import MirrorInsightCard from './MirrorInsightCard'
import { fetchInteractions } from '../lib/supabase'
import { detectBlindSpot } from '../utils/detectPattern'

export default function AIResponse({ response }) {
  const [blindSpot, setBlindSpot] = useState(null)

  useEffect(() => {
    const checkBlindSpot = async () => {
      const interactions = await fetchInteractions()
      const detected = detectBlindSpot(interactions, response.domain)
      setBlindSpot(detected)
    }
    checkBlindSpot()
  }, [response.domain])

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <SignalLabel type={response.signalLabel} />
      <WeakPointText text={response.content} weakPoints={response.weakPoints || []} />
      {response.dependencies && response.dependencies.length > 0 && (
        <DependencyView dependencies={response.dependencies} interactionId={response.interactionId} />
      )}
      {blindSpot && <MirrorInsightCard insight={blindSpot} />}
    </div>
  )
}
