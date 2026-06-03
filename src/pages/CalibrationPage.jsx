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
      <div className="min-h-screen bg-[#FFFFFF] pt-[52px] px-4">
        <div className="max-w-[720px] mx-auto mt-20">
          <h1 className="text-[24px] font-semibold mb-2 text-[#1A1A1A]">My Calibration</h1>
          <p className="text-[15px] text-[#6B6B6B]">Loading your patterns...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-[52px] px-4">
      <div className="max-w-[720px] mx-auto mt-20 mb-10">
        <h1 className="text-[24px] font-semibold mb-2 text-[#1A1A1A]">My Calibration</h1>
        <p className="text-[15px] text-[#6B6B6B] mb-8">Your evaluation patterns over time</p>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl p-4">
            <p className="text-[11px] uppercase text-[#6B6B6B] mb-1">Total outputs</p>
            <p className="text-[28px] font-semibold text-[#1A1A1A]">{totalOutputs}</p>
          </div>
          <div className="bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl p-4">
            <p className="text-[11px] uppercase text-[#6B6B6B] mb-1">Dependencies checked</p>
            <p className="text-[28px] font-semibold text-[#1A1A1A]">{checkRate}%</p>
          </div>
          <div className="bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl p-4">
            <p className="text-[11px] uppercase text-[#6B6B6B] mb-1">Most used domain</p>
            <p className="text-[28px] font-semibold text-[#1A1A1A] capitalize">{mostUsedDomain}</p>
          </div>
        </div>

        {/* Blind Spots */}
        {blindSpots.length > 0 && (
          <div className="mb-8">
            <h2 className="text-[13px] font-medium text-[#1A1A1A] mb-4">Blind Spots</h2>
            {blindSpots.map(spot => (
              <div key={spot.domain} className="mb-3 last:mb-0 bg-[#FDF0EB] border border-[#F5D5C8] rounded-xl p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[13px] font-medium capitalize text-[#1A1A1A]">{spot.domain}</span>
                  <span className="text-[12px] text-[#6B6B6B]">{spot.skipped} skipped</span>
                </div>
                <div className="w-full bg-[#F5D5C8] rounded-full h-2">
                  <div className="bg-[#D97757] h-2 rounded-full" style={{ width: `${spot.skipRate * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Domain Breakdown */}
        <div className="bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl p-4 mb-8">
          <h2 className="text-[13px] font-medium text-[#1A1A1A] mb-4">Domain Breakdown</h2>
          {domainBreakdown.map(domain => (
            <div key={domain.domain} className="flex justify-between items-center py-[10px] border-b border-[#E5E5E5] last:border-b-0">
              <span className="text-[13px] capitalize text-[#1A1A1A]">{domain.domain}</span>
              <div className="text-right">
                <p className="text-[13px] font-medium text-[#1A1A1A]">{domain.total} interactions</p>
                <p className="text-[12px] text-[#6B6B6B]">{domain.avgClicked} avg deps clicked</p>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Interactions */}
        <div className="bg-[#F5F5F0] border border-[#E5E5E5] rounded-xl p-4">
          <h2 className="text-[13px] font-medium text-[#1A1A1A] mb-4">Recent Interactions</h2>
          {interactions.slice(0, 10).map((interaction, index) => (
            <div key={index} className="flex justify-between items-center py-[10px] border-b border-[#E5E5E5] last:border-b-0">
              <div className="flex items-center gap-2">
                <span className="text-[12px] px-2 py-1 bg-[#EBEBEB] rounded capitalize text-[#1A1A1A]">{interaction.domain}</span>
                <span className="text-[12px] text-[#6B6B6B]">{interaction.label_type}</span>
              </div>
              <div className="text-right">
                <p className="text-[12px] text-[#6B6B6B]">
                  {interaction.dependencies_clicked > 0 ? '✓ Checked' : '✗ Skipped'}
                </p>
                <p className="text-[12px] text-[#9B9B9B]">
                  {new Date(interaction.timestamp).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
          {interactions.length === 0 && (
            <p className="text-[13px] text-[#6B6B6B] text-center py-4">No interactions yet</p>
          )}
        </div>
      </div>
    </div>
  )
}
