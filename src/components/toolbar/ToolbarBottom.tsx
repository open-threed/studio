import Actions from '../general/Actions'
import useToolbar from '../../hooks/useToolbar'
import mountToolbarActions from '../../utils/mountToolbarActions'
import CONSTANTS from '../../constants'
import { useElementsStore } from '../../store/elements'
import { useLayoutStore } from '../../store/layout'
import { Badge } from "@/components/ui/badge"
export default function ToolbarBottom() {
  const { showHorizontalBottom } = useToolbar()
  const { current } = useElementsStore()
  const { footer, setFooter } = useLayoutStore()

  const toolbarHorizontalBottom = mountToolbarActions(
    CONSTANTS.toolbar.bottom,
  {
    log: { onClick: () => setFooter(footer === 'log' ? null : 'log') },
    previus_change: { onClick: null },
    next_change: { onClick: null },
    studio: { onClick: () => setFooter(footer === 'studio' ? null : 'studio') },
  })

  if(!showHorizontalBottom) {
    return <div />
  }

  return (
    <>
      <div className={`toolbarContainer bg-background`}>
        <>
          <Actions data={toolbarHorizontalBottom}/>
          <div className="toolbarDivider" />
          <div className="toolbarTextInfo">
            <small>
              {current
                ? (
                  <>
                    <span className="opacity-60">
                      {current.id}
                    </span>
                    <Badge className="ml-2 text-slate-600 cursor-default" variant="secondary">
                      {current.type}
                    </Badge>
                  </>
                  )
                : 'No item selected'}
            </small>
          </div>
        </>
      </div>
    </>
  );
}
