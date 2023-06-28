export default function clearLocalStorage() {
  localStorage.removeItem('@threed-graph')
  localStorage.removeItem('@threed-commands')
  localStorage.removeItem('@threed-document')
  localStorage.removeItem('@threed-files')
  localStorage.removeItem('@threed-settings')
  localStorage.removeItem('@threed-layout')
  localStorage.removeItem('@threed-history')
  localStorage.removeItem('@threed-elements')
}