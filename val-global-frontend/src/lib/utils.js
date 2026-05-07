// cn utility - combines class names (mimics shadcn/ui pattern for Vite/React)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
