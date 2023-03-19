import {
  AnchorButton,
  CoreAnchorButtonProps,
  CustomAnchorButtonProps,
} from '@stews/components/Bopper'
import { getCssClass } from '@stews/helpers'
import {
  SelectBaseConfigProps,
  SelectBaseDataProps,
  VerifiedOptionLabelKey,
} from '../SelectBase'
import { SelectOptionLabel } from './SelectOptionLabel'
import cssModule from './SelectButton.module.scss'

export interface SelectButtonProps<
  MenuOption extends object,
  OptionLabelKey extends VerifiedOptionLabelKey<MenuOption>,
  CustomSelectAnchorButtonProps extends CustomAnchorButtonProps
> extends CoreAnchorButtonProps,
    Pick<SelectBaseDataProps<MenuOption>, 'selectedOption'>,
    Pick<
      SelectBaseConfigProps<
        MenuOption,
        OptionLabelKey,
        CustomSelectAnchorButtonProps,
        unknown,
        unknown
      >,
      | 'optionLabelKey'
      | 'anchorBorderClassName'
      | 'fontSizeClassName'
      | 'customSelectAnchorButtonProps'
    > {}

export function SelectButton<
  MenuOption extends object,
  OptionLabelKey extends VerifiedOptionLabelKey<MenuOption>,
  CustomSelectAnchorButtonProps extends CustomAnchorButtonProps
>(
  props: SelectButtonProps<
    MenuOption,
    OptionLabelKey,
    CustomSelectAnchorButtonProps
  >
) {
  const {
    anchorBorderClassName,
    fontSizeClassName,
    customSelectAnchorButtonProps,
    anchorElementRef,
    setPopoverOpen,
    selectedOption,
    optionLabelKey,
  } = props
  return (
    <div
      className={getCssClass(
        cssModule.buttonContainer,
        [anchorBorderClassName, Boolean(anchorBorderClassName)],
        [fontSizeClassName, Boolean(fontSizeClassName)]
      )}
    >
      <AnchorButton
        {...customSelectAnchorButtonProps}
        anchorElementRef={anchorElementRef}
        setPopoverOpen={setPopoverOpen}
        className={getCssClass(cssModule.selectButton, [
          customSelectAnchorButtonProps.className,
          Boolean(customSelectAnchorButtonProps.className),
        ])}
      >
        <div className={cssModule.buttonLabel}>
          <SelectOptionLabel
            optionLabelKey={optionLabelKey}
            someSelectOption={selectedOption}
          />
        </div>
        <div className={cssModule.iconContainer}>
          <svg className={cssModule.selectIcon} viewBox={'0 0 1 1'}>
            <polygon
              className={cssModule.dropdownPolygon}
              points={'0.2,0.375 0.8,0.375 0.5,0.775'}
            />
          </svg>
        </div>
      </AnchorButton>
    </div>
  )
}
