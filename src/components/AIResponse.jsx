import SignalLabel from './SignalLabel'
import WeakPointText from './WeakPointText'

export default function AIResponse({ response }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <SignalLabel type={response.signalLabel} />
      <WeakPointText text={response.content} weakPoints={response.weakPoints || []} />
    </div>
  )
}
