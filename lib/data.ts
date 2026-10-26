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
  name: 'Ajingi / Albasu / Gaya Federal Constituency',
  representative: 'Hon. Dr. Ghali Mustapha Tijjani Panda (PhD)',
  party: 'All Progressives Congress (APC)',
  electionYear: '2023',
  reContestYear: '2027',
  communities: ['Ajingi', 'Albasu', 'Gaya'],
  population: 'Over 300,000 residents',
  committee: 'Chairman, House Committee on Ethics and Privileges',
}

export const initiatives = [
  {
    id: 1,
    title: 'Youth & Women Empowerment',
    description: 'Distribution of production tools, motorcycles, startup grants, and skills support to help create sustainable livelihoods.',
    icon: 'trending_up',
  },
  {
    id: 2,
    title: 'Education & Human Capital',
    description: 'Classroom construction, ICT hubs, school renovations, and scholarship programmes for nursing and higher education.',
    icon: 'school',
  },
  {
    id: 3,
    title: 'Clean Water & Health',
    description: 'Solar boreholes, hospital construction, and healthcare support for rural communities.',
    icon: 'water_drop',
  },
  {
    id: 4,
    title: 'Infrastructure & Connectivity',
    description: 'Roads, bridges, solar streetlights, transformers, and power grid extensions across the three LGAs.',
    icon: 'construction',
  },
  {
    id: 5,
    title: 'Agriculture & Food Security',
    description: 'Fertilizer, herbicides, tractors, and food relief to support farmers and families.',
    icon: 'agriculture',
  },
  {
    id: 6,
    title: 'Transparent Governance',
    description: 'Ghalimetre, a digital project tracker that lets residents monitor projects.',
    icon: 'visibility',
  },
]

export const visionContent = `Hon. Dr. Ghali Mustapha Tijjani Panda's vision for Ajingi, Albasu, and Gaya is built on transparent service, youth empowerment, quality education, clean water, and lasting infrastructure. Having delivered measurable results in his first term—from classroom blocks and industrial solar boreholes to solar streetlights, farm support, and human capital development—he is committed to completing ongoing projects and scaling their impact in the next term (2027–2031). One Constituency, Forward Together.`
