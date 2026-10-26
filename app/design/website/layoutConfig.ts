export const websiteLayout = {
  grid: {
    base: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    gap: 'gap-6 sm:gap-8 lg:gap-10',
  },
  flex: {
    center: 'flex flex-col items-center justify-center text-center',
    between: 'flex flex-col md:flex-row items-center justify-between',
    start: 'flex flex-col md:flex-row items-start justify-start',
  },
  image: {
    fill: 'absolute inset-0 w-full h-full object-cover',
    overlay: 'absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent',
  }
}
