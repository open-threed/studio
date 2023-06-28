import { useLayoutStore } from '../store/layout'

export default function useToolbar() {
  const { layout, setToolbarOpen, setToolbarShow } = useLayoutStore()

  const openTopToolbar = () => setToolbarOpen({ name: 'top', value: true })
  const openRightToolbar = () => setToolbarOpen({ name: 'right', value: true })
  const openBottomToolbar = () => setToolbarOpen({ name: 'bottom', value: true })
  const openLeftToolbar = () => setToolbarOpen({ name: 'left', value: true })
  
  const closeTopToolbar = () => setToolbarOpen({ name: 'top', value: false })
  const closeRightToolbar = () => setToolbarOpen({ name: 'right', value: false })
  const closeBottomToolbar = () => setToolbarOpen({ name: 'bottom', value: false })
  const closeLeftToolbar = () => setToolbarOpen({ name: 'left', value: false })

  const showTopToolbar = () => setToolbarShow({ name: 'top', value: true })
  const showRightToolbar = () => setToolbarShow({ name: 'right', value: true })
  const showBottomToolbar = () => setToolbarShow({ name: 'bottom', value: true })
  const showLeftToolbar = () => setToolbarShow({ name: 'left', value: true })
  
  const hideTopToolbar = () => setToolbarShow({ name: 'top', value: false })
  const hideRightToolbar = () => setToolbarShow({ name: 'right', value: false })
  const hideBottomToolbar = () => setToolbarShow({ name: 'bottom', value: false })
  const hideLeftToolbar = () => setToolbarShow({ name: 'left', value: false })

  const toggleOpenTop = () => setToolbarOpen({ name: 'top', value: !layout.toolbar.top.expanded })
  const toggleOpenRight = () => setToolbarOpen({ name: 'right', value: !layout.toolbar.right.expanded })
  const toggleOpenBottom = () => setToolbarOpen({ name: 'bottom', value: !layout.toolbar.bottom.expanded })
  const toggleOpenLeft = () => setToolbarOpen({ name: 'left', value: !layout.toolbar.left.expanded })
  
  const toggleShowTop = () => setToolbarShow({ name: 'top', value: !layout.toolbar.top.visible })
  const toggleShowRight = () => setToolbarShow({ name: 'right', value: !layout.toolbar.right.visible })
  const toggleShowBottom = () => setToolbarShow({ name: 'bottom', value: !layout.toolbar.bottom.visible })
  const toggleShowLeft = () => setToolbarShow({ name: 'left', value: !layout.toolbar.left.visible })

  return {
    openTopToolbar,
    openRightToolbar,
    openBottomToolbar,
    openLeftToolbar,

    closeTopToolbar,
    closeRightToolbar,
    closeBottomToolbar,
    closeLeftToolbar,

    showTopToolbar,
    showRightToolbar,
    showBottomToolbar,
    showLeftToolbar,

    hideTopToolbar,
    hideRightToolbar,
    hideBottomToolbar,
    hideLeftToolbar,

    toggleShowTop,
    toggleShowRight,
    toggleShowBottom,
    toggleShowLeft,

    toggleOpenTop,
    toggleOpenLeft,
    toggleOpenBottom,
    toggleOpenRight,

    showHorizontalTop: layout.toolbar.top.visible,
    showHorizontalBottom: layout.toolbar.top.visible && layout.toolbar.bottom.visible,
    showVerticalLeft: layout.toolbar.top.visible && layout.toolbar.left.visible,
    showVerticalRight: layout.toolbar.top.visible && layout.toolbar.right.visible,

    isTopOpen: layout.toolbar.top.expanded,
    isRightOpen: layout.toolbar.right.expanded,
    isBottomOpen: layout.toolbar.bottom.expanded,
    isLeftOpen: layout.toolbar.left.expanded,
  }
}
