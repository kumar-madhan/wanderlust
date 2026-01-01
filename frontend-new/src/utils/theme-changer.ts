// utils/theme-changer.ts
export function applyThemeClass() {
  const theme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', theme);
}
