export type CurationView = DefaultCurationView | FilterCurationView

export interface DefaultCurationView extends CurationViewBase<'default'> {}

export interface FilterCurationView extends CustomView<'filter'> {
  viewFilter: string
}

interface CustomView<CustomType extends string>
  extends CurationViewBase<'custom'> {
  customType: CustomType
}

interface CurationViewBase<ViewType extends string> {
  viewType: ViewType
  viewId: number
  viewLabel: string
}