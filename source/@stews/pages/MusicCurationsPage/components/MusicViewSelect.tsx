import { Popover } from '@stews/components/Popover'
import { Ref, StateUpdater, useEffect, useRef, useState } from 'preact/hooks'
import { Fragment } from 'preact/jsx-runtime'
import { MusicView } from '../data'
import cssModule from './MusicViewSelect.module.scss'

export interface MusicViewSelectProps {
  musicViews: Array<MusicView>
  selectedMusicView: MusicView
  selectMusicView: (nextSelectedMusicView: MusicView) => void
}

export function MusicViewSelect(props: MusicViewSelectProps) {
  const { selectedMusicView, musicViews, selectMusicView } = props
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [popoverOpen, setPopoverOpen] = useState(false)
  return (
    <Fragment>
      <div className={cssModule.buttonContainer}>
        <button
          ref={buttonRef}
          className={cssModule.selectButton}
          onClick={() => {
            setPopoverOpen(!popoverOpen)
          }}
        >
          <div className={cssModule.buttonLabel}>
            {selectedMusicView.viewLabel}
          </div>
          <div className={cssModule.buttonIconContainer}>
            <svg className={cssModule.buttonIcon} viewBox={'0 0 1 1'}>
              <polygon
                className={cssModule.dropdownPolygon}
                points={'0.2,0.375 0.8,0.375 0.5,0.775'}
              />
            </svg>
          </div>
        </button>
      </div>
      <Popover
        anchorRef={buttonRef}
        popoverOpen={popoverOpen}
        setPopoverOpen={setPopoverOpen}
      >
        <ViewSelectMenu
          musicViews={musicViews}
          selectedMusicView={selectedMusicView}
          selectMusicView={selectMusicView}
          popoverOpen={popoverOpen}
          setPopoverOpen={setPopoverOpen}
        />
      </Popover>
    </Fragment>
  )
}

interface ViewSelectMenuProps
  extends Pick<
    MusicViewSelectProps,
    'musicViews' | 'selectedMusicView' | 'selectMusicView'
  > {
  popoverOpen: boolean
  setPopoverOpen: StateUpdater<boolean>
}

function ViewSelectMenu(props: ViewSelectMenuProps) {
  const { popoverOpen, musicViews, selectMusicView, setPopoverOpen } = props
  const [focusedViewIndex, setFocusedViewIndex] = useState<number | null>(null)
  const listItemsRef = useRef<Array<HTMLDivElement>>([])
  useEffect(() => {
    setFocusedViewIndex(popoverOpen ? 0 : null)
  }, [popoverOpen])
  useEffect(() => {
    if (focusedViewIndex === null) {
      setPopoverOpen(false)
    } else {
      listItemsRef.current[focusedViewIndex]!.focus()
    }
  }, [focusedViewIndex])
  return (
    <div
      className={cssModule.selectMenu}
      onfocusout={(someFocusEvent) => {
        const siblingIndex = listItemsRef.current.find(
          (someListItem) => someListItem === someFocusEvent.relatedTarget
        )
        if (siblingIndex === undefined) {
          setFocusedViewIndex(null)
        }
      }}
    >
      {musicViews.map((someMusicView, musicViewIndex) => (
        <div
          tabIndex={-1}
          className={cssModule.menuItem}
          key={someMusicView.viewId}
          ref={(listItemElement) => {
            listItemsRef.current[musicViewIndex] = listItemElement!
          }}
          onClick={() => {
            selectMusicView(someMusicView)
            setPopoverOpen(false)
          }}
          onKeyDown={(someKeyDownEvent) => {
            const listLength = listItemsRef.current.length
            if (focusedViewIndex === null) {
              throw new Error('invalid path reached: ViewSelectMenu.onKeyDown')
            } else if (someKeyDownEvent.key === 'ArrowDown') {
              setFocusedViewIndex((focusedViewIndex + 1) % listLength)
            } else if (someKeyDownEvent.key === 'ArrowUp') {
              setFocusedViewIndex(
                (((focusedViewIndex - 1) % listLength) + listLength) %
                  listLength
              )
            } else if (someKeyDownEvent.key === 'Enter') {
              selectMusicView(someMusicView)
              setPopoverOpen(false)
            }
          }}
        >
          <div className={cssModule.itemLabel}>{someMusicView.viewLabel}</div>
        </div>
      ))}
    </div>
  )
}
