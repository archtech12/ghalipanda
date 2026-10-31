import scorecardData from './scorecard.json'
import { projects, projectCount } from './projects'

export const scorecard = scorecardData

export interface ScorecardMetric {
  label: string
  value: string
  projectId: string
}

// Turns an impact string such as "Over 1,500 Solar Street Lights" into "1,500+".
// Only the figure that is already in the report is used; nothing is computed or invented.
function figureFromImpact(impact: string): string {
  const match = impact.match(/(over\s+)?(\d[\d,]*)(\+)?/i)
  if (!match) return impact
  const hasPlus = Boolean(match[1]) || Boolean(match[3])
  return `${match[2]}${hasPlus ? '+' : ''}`
}

export const homepageMetrics: ScorecardMetric[] = scorecard.homepageMetrics.flatMap(metric => {
  const project = projects.find(p => p._id === metric.projectId)
  return project
    ? [{ label: metric.label, value: figureFromImpact(project.impact), projectId: project._id }]
    : []
})

export const totalProjectsMetric: ScorecardMetric = {
  label: 'Documented projects',
  value: String(projectCount),
  projectId: '',
}

export const localGovernmentAreas = scorecard.constituency.length
