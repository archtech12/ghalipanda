import { projects as siteProjects } from './projects'

// Compatibility shape used by any legacy data consumers; the canonical
// project records live in lib/projects.ts.
export const projects = siteProjects.map(project => ({
  id: project._id,
  titleEN: project.title,
  titleHA: project.titleHA,
  category: project.category,
  date: project.date,
  shortDesc: project.description,
  impact: project.impact,
  location: project.location,
  images: project.images,
}))

export const constituencyData = {
  name: 'Albasu / Gaya / Ajingi Federal Constituency',
  representative: 'Hon. Dr. Ghali Mustapha Tijjani (PhD)',
  party: 'All Progressives Congress (APC)',
  electionYear: '2023',
  reContestYear: '2027',
  communities: ['Albasu', 'Gaya', 'Ajingi'],
  population: 'Over 300,000 residents',
  committee: 'Chairman, House Committee on Ethics and Privileges',
}

export const initiatives = [
  {
    id: 1,
    title: 'Youth & Women Empowerment',
    description: 'Motorcycles, grinding machines, pasta machines, cash grants, and skills support for sustainable livelihoods.',
    icon: 'trending_up',
  },
  {
    id: 2,
    title: 'Education & Human Capital',
    description: 'Classroom blocks, an ICT center, school renovations, and 60 nursing and midwifery scholarships.',
    icon: 'school',
  },
  {
    id: 3,
    title: 'Clean Water Access',
    description: 'Industrial 20,000-litre solar boreholes and repairs to over 30 existing boreholes.',
    icon: 'water_drop',
  },
  {
    id: 4,
    title: 'Infrastructure Development',
    description: 'The 5 km Faragai road, Panda bypass, and over 1,500 solar street lights.',
    icon: 'construction',
  },
  {
    id: 5,
    title: 'Agriculture Support',
    description: 'Fertilizer, 4,000 insecticide and herbicide pieces, and tractors for farmers.',
    icon: 'agriculture',
  },
  {
    id: 6,
    title: 'Job Creation & Placements',
    description: 'Placements in the Police, Air Force, Navy, NLNG, Rano Air, FMC Azare, and PTDF scholarships.',
    icon: 'work',
  },
]

export const visionContent = `Hon. Dr. Ghali Mustapha Tijjani’s vision for Albasu, Gaya, and Ajingi is rooted in transparent service delivery, youth empowerment, quality education, clean water, and lasting infrastructure. From over 1,500 solar street lights and multiple industrial solar boreholes to classroom blocks, hospital construction, farm support, and empowerment tools, the first term has delivered measurable results. The next term (2027–2031) will focus on completing ongoing projects and scaling impact. One Constituency, Forward Together.`
