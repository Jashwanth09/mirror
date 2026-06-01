import { useState, useEffect } from 'react'
import { fetchInteractions } from '../lib/supabase'

export default function CalibrationPage() {
  const [interactions, setInteractions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchInteractions()
      setInteractions(data)
      setLoading(false)
    }
    loadData()
  }, [])

  const totalOutputs = interactions.length
  const dependenciesChecked = interactions.filter(i => i.dependencies_clicked > 0).length
  const checkRate = totalOutputs > 0 ? Math.round((dependenciesChecked / totalOutputs) * 100) : 0

  const domainCounts = interactions.reduce((acc, i) => {
    acc[i.domain] = (acc[i.domain] || 0) + 1
    return acc
  }, {})
  const mostUsedDomain = Object.entries(domainCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'

  const blindSpots = Object.keys(domainCounts).map(domain => {
    const domainInteractions = interactions.filter(i => i.domain === domain)
    const unchecked = domainInteractions.filter(i => i.dependencies_clicked === 0)
    const skipRate = domainInteractions.length > 0 ? unchecked.length / domainInteractions.length : 0
    return { domain, skipRate, skipped: unchecked.length }
  }).filter(spot => spot.skipRate >= 0.7)

  const domainBreakdown = Object.keys(domainCounts).map(domain => {
    const domainInteractions = interactions.filter(i => i.domain === domain)
    const avgClicked = domainInteractions.reduce((sum, i) => sum + i.dependencies_clicked, 0) / domainInteractions.length
    return { domain, total: domainInteractions.length, avgClicked: avgClicked.toFixed(1) }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl font-semibold mb-2">My Calibration</h1>
          <p className="text-gray-600">Loading your patterns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-2">My Calibration</h1>
        <p className="text-gray-600 mb-8">Your evaluation patterns over time</p>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-2xl font-semibold text-gray-800">{totalOutputs}</p>
            <p className="text-xs text-gray-600">Total outputs evaluated</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-2xl font-semibold text-gray-800">{checkRate}%</p>
            <p className="text-xs text-gray-600">Dependencies checked</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-2xl font-semibold text-gray-800 capitalize">{mostUsedDomain}</p>
            <p className="text-xs text-gray-600">Most used domain</p>
          </div>
        </div>

        {/* Blind Spots */}
        {blindSpots.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Blind Spots</h2>
            {blindSpots.map(spot => (
              <div key={spot.domain} className="mb-3 last:mb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium capitalize">{spot.domain}</span>
                  <span className="text-xs text-gray-600">{spot.skipped} skipped</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: `${spot.skipRate * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Domain Breakdown */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-8">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Domain Breakdown</h2>
          {domainBreakdown.map(domain => (
            <div key={domain.domain} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <span className="text-sm capitalize">{domain.domain}</span>
              <div className="text-right">
                <p className="text-sm font-medium">{domain.total} interactions</p>
                <p className="text-xs text-gray-600">{domain.avgClicked} avg deps clicked</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Interactions */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">Recent Interactions</h2>
          {interactions.slice(0, 10).map((interaction, index) => (
            <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded capitalize">{interaction.domain}</span>
                <span className="text-xs text-gray-600">{interaction.label_type}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-600">
                  {interaction.dependencies_clicked > 0 ? '✓ Checked' : '✗ Skipped'}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(interaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {interactions.length === 0 && (
            <p className="text-sm text-gray-500 text-center py-4">No interactions yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
