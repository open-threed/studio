import { useElementSize } from '@mantine/hooks'
import ToolbarTop from '../toolbar/ToolbarTop';
import ToolbarLeft from '../toolbar/ToolbarLeft';
import ToolbarRight from '../toolbar/ToolbarRight';
import ToolbarBottom from '../toolbar/ToolbarBottom';
import useToolbar from '../../hooks/useToolbar';
import usePlayer from '../../hooks/usePlayer';
import { useSettingsStore } from '../../store/settings';
import React from 'react';
import '../../styles/layout.css'

type DimensionsType = {
  width: number
  height: number
  showHorizontalTop: boolean
  showVerticalRight: boolean
  showHorizontalBottom: boolean
  showVerticalLeft: boolean
  isLeftOpen: boolean
  isRightOpen: boolean
}

const getMiddleWidth = ({
  width,
  showVerticalLeft,
  showVerticalRight,
  isLeftOpen,
  isRightOpen
}: DimensionsType) => {
  const left = !showVerticalLeft ? 0 : (isLeftOpen ? 250 : 40)
  const right = !showVerticalRight ? 0 : (isRightOpen ? 350 : 40)

  return width - (left + right)
}

const getMiddleHeight = ({
  height,
  showHorizontalTop,
  showHorizontalBottom
}: DimensionsType) => {
  const top = !showHorizontalTop ? 0 : 40
  const bottom = !showHorizontalBottom ? 0 : 40

  const result = height - (top + bottom)

  return result
}

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { ref, width, height } = useElementSize()
  const { isPlayerScreen } = usePlayer()
  const { settings } = useSettingsStore()

  const { isLeftOpen: ilo, isRightOpen,
    showHorizontalTop,
    showVerticalRight,
    showHorizontalBottom,
    showVerticalLeft
  } = useToolbar()

  const isLeftOpen = ilo && settings.main === 'code'

  const dimensions = {
    width,
    height,
    showHorizontalTop,
    showVerticalRight,
    showHorizontalBottom,
    showVerticalLeft,
    isLeftOpen,
    isRightOpen
  }

  const styles = {
    main: {
      width: `${dimensions.width}px`,
    },
    sectionContent: {
      width: `${dimensions.width}px`,
      height: `${getMiddleHeight(dimensions)}px`
    },
    sectionHorizontal: {
      width: `${dimensions.width}px`
    },
    sectionVertical: {
      height: `${getMiddleHeight(dimensions)}px`
    },
    sectionMiddle: {
      width: `${getMiddleWidth(dimensions)}px`,
      height: `${getMiddleHeight(dimensions)}px`
    }
  }

  if(isPlayerScreen) {
    return (
      <div className="playerScreen">
        {children}
      </div>
    )
  }

  return (
    <div className="sectionWrap" ref={ref}>
      <div style={styles.main}>
        {showHorizontalTop && (
          <div
            className="sectionHorizontal"
            style={styles.sectionHorizontal}
          >
            <ToolbarTop />
          </div>
        )}
        <div
          className="sectionContent"
          style={styles.sectionContent}
        >
          {showVerticalLeft && (
            <div
              className={`sectionVertical ${isLeftOpen ? 'opened': ''}`}
              style={styles.sectionVertical}
            >
              <ToolbarLeft />
            </div>
          )}
          <div
            className="sectionMiddle border"
            style={styles.sectionMiddle}
          >
            {children}
          </div>
          {showVerticalRight && (
            <div
              className={`sectionVertical ${isRightOpen ? 'opened': ''} big`}
              style={styles.sectionVertical}
            >
              <ToolbarRight />
            </div>
          )}
        </div>
        {showHorizontalBottom && (
          <div
            className="sectionHorizontal"
            style={styles.sectionHorizontal}
          >
            <ToolbarBottom />
          </div>
        )}
      </div>
    </div>
  )
}