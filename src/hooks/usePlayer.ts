const PLAYER_URI = '?play=all'

export default function usePlayer() {
  const isPlayerScreen = window.location.href.includes(PLAYER_URI)

  const goPlayerScreen = () => window.open('/' + PLAYER_URI, '_blank');

  return {
    isPlayerScreen,
    goPlayerScreen
  }
}