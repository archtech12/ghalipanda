import { websiteColors } from './colors';
import { websiteTypography } from './typography';
import { websiteAnimations } from './animations';

export const websiteComponents = {
  button: {
    primary: `${websiteColors.primary.bg} text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl ${websiteAnimations.hover.button} shadow-lg text-base`,
    secondary: `bg-white ${websiteColors.primary.DEFAULT} border-2 ${websiteColors.primary.border} font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl ${websiteAnimations.hover.button} shadow-sm text-base`,
  },
  card: {
    base: `bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden flex flex-col ${websiteAnimations.hover.card}`,
  },
  badge: {
    default: `inline-block px-4 py-2 ${websiteColors.primary.light} rounded-full text-sm font-semibold`,
    success: `inline-block px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold`,
  }
}
