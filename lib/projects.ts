import projectsData from './projects.json'

export interface Project {
  _id: string
  title: string
  titleHA: string
  description: string
  impact: string
  location: string
  category: string
  images: string[]
  date: string
  status?: string
}

// Canonical project records live in lib/projects.json (sourced from grok_report.pdf).
// Every record is exported; nothing here caps or slices the list.
export const projects: Project[] = projectsData as Project[]

export const projectCount = projects.length

export function getProjectById(id: string): Project | undefined {
  return projects.find(project => project._id === id)
}
