import { Button } from '@stews/components/Button'
import { getCssClass } from '@stews/helpers'
import { MusicView } from '@stews/pages/MusicCurationsPage/data'
import { Ref, StateUpdater } from 'preact/hooks'
import { JSXInternal } from 'preact/src/jsx'
import {
  useSelectMenuNavigation,
  UseSelectMenuNavigationResult,
} from '../hooks/useSelectMenuNavigation'
import { MusicViewSelectBaseProps } from '../MusicViewSelectBase'
import cssModule from './SelectMenuBase.module.scss'

export interface SelectMenuProps<
  CustomOptionActionItemProps,
  CustomMenuFooterProps
> extends Pick<
    MusicViewSelectBaseProps<
      CustomOptionActionItemProps,
      CustomMenuFooterProps
    >,
    | 'musicViews'
    | 'selectedMusicView'
    | 'selectMusicView'
    | 'customOptionActionItemProps'
    | 'customMenuFooterProps'
  > {
  anchorRef: Ref<HTMLDivElement>
  popoverOpen: boolean
  setPopoverOpen: StateUpdater<boolean>
}

export interface SelectMenuBaseProps<
  CustomOptionActionItemProps,
  CustomMenuFooterProps
> extends SelectMenuProps<CustomOptionActionItemProps, CustomMenuFooterProps> {
  OptionActionItem: (
    props: OptionActionItemProps<CustomOptionActionItemProps>
  ) => JSXInternal.Element | null
  MenuFooter: (
    props: MenuFooterProps<CustomMenuFooterProps>
  ) => JSXInternal.Element | null
}

export type OptionActionItemProps<CustomOptionActionItemProps> =
  CustomOptionActionItemProps &
    Pick<UseSelectMenuNavigationResult, 'getOptionActionButtonProps'> & {
      someMusicView: MusicView
      musicViewIndex: number
    }

export type MenuFooterProps<CustomMenuFooterProps> = CustomMenuFooterProps &
  Pick<UseSelectMenuNavigationResult, 'getFooterActionButtonProps'>

export function SelectMenuBase<
  CustomOptionActionItemProps,
  CustomMenuFooterProps
>(
  props: SelectMenuBaseProps<CustomOptionActionItemProps, CustomMenuFooterProps>
) {
  const {
    anchorRef,
    popoverOpen,
    setPopoverOpen,
    musicViews,
    selectedMusicView,
    selectMusicView,
    OptionActionItem,
    customOptionActionItemProps,
    MenuFooter,
    customMenuFooterProps,
  } = props
  const {
    focusedViewIndex,
    getMenuContainerProps,
    getMenuOptionProps,
    getOptionActionButtonProps,
    getFooterActionButtonProps,
  } = useSelectMenuNavigation({
    anchorRef,
    popoverOpen,
    setPopoverOpen,
  })
  return (
    <div className={cssModule.menuContainer} {...getMenuContainerProps()}>
      <div className={cssModule.optionList}>
        {musicViews.map((someMusicView, musicViewIndex) => (
          <Button
            {...getMenuOptionProps(musicViewIndex)}
            key={someMusicView.viewId}
            className={getCssClass(
              cssModule.optionItem,
              [
                cssModule.selectedOption,
                selectedMusicView.viewId === someMusicView.viewId,
              ],
              [
                cssModule.latestFocusedOption,
                focusedViewIndex === musicViewIndex,
              ]
            )}
            onSelect={() => {
              selectMusicView(someMusicView)
            }}
          >
            <svg className={cssModule.optionSelectedIcon} viewBox={'0 0 24 24'}>
              <path
                d={
                  'M9 16.17L5.53 12.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71c.39-.39.39-1.02 0-1.41-.39-.39-1.02-.39-1.41 0L9 16.17z'
                }
              />
            </svg>
            <div className={cssModule.optionLabelContainer}>
              <div className={cssModule.optionLabel}>
                {someMusicView.viewLabel}
              </div>
            </div>
            <div className={cssModule.optionActionItemContainer}>
              <OptionActionItem
                getOptionActionButtonProps={getOptionActionButtonProps}
                someMusicView={someMusicView}
                musicViewIndex={musicViewIndex}
                {...customOptionActionItemProps}
              />
            </div>
          </Button>
        ))}
      </div>
      <MenuFooter
        getFooterActionButtonProps={getFooterActionButtonProps}
        {...customMenuFooterProps}
      />
    </div>
  )
}
