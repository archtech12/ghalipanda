export const candidatePhotoOptions = [
  { id: 'distinguished', label: 'Distinguished Portrait', src: '/assets/Distinguished%20Portrait.png' },
  { id: 'ghali-photo', label: 'Ghali Photo', src: '/assets/ghali%20pic.jpg' },
  { id: 'portrait-1', label: 'Portrait 1', src: '/assets/images/gallery/0-Portraits-Official/portrait-1.jpg' },
  { id: 'portrait-2', label: 'Portrait 2', src: '/assets/images/gallery/0-Portraits-Official/portrait-2.jpg' },
  { id: 'portrait-3', label: 'Portrait 3', src: '/assets/images/gallery/0-Portraits-Official/portrait-3.jpg' },
] as const

export const defaultCandidatePhoto = candidatePhotoOptions[0].src
