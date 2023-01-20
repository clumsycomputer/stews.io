import {
  Dispatch,
  Fragment,
  ReactNode,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import ClickAwayListener from "react-click-away-listener";
import { usePopper } from "react-popper";
import { MusicCurationsPageState, StringPermutation } from "../common/models";
import styles from "./DataViewSelect.module.scss";

export interface DataViewSelectProps {
  value: MusicCurationsPageState["dataView"];
  onChange: (nextSortOrder: MusicCurationsPageState["dataView"]) => void;
}

export function DataViewSelect(props: DataViewSelectProps) {
  const { value, onChange } = props;
  const [selectButtonElement, setSelectButtonElement] =
    useState<HTMLDivElement | null>(null);
  const [selectMenu, setSelectMenu] = useState<ReactNode>(null);
  return (
    <Fragment>
      <div
        tabIndex={0}
        className={styles.selectButton}
        ref={setSelectButtonElement}
        onClick={() => {
          setSelectMenu(
            <DataViewSelectMenu
              value={value}
              onChange={onChange}
              selectButtonElement={selectButtonElement}
              setSelectMenu={setSelectMenu}
            />
          );
        }}
      >
        <div className={styles.buttonLabel}>
          {getDataViewLabel({
            someDataView: value,
          })}
        </div>
        <svg className={styles.buttonArrow} viewBox={"0 0 1 1"}>
          <polygon
            points={"0.2,0.375 0.8,0.375 0.5,0.775"}
            stroke={"black"}
            strokeWidth={0.085}
            strokeLinejoin={"round"}
            fill={"white"}
          />
        </svg>
      </div>
      {selectMenu}
    </Fragment>
  );
}

interface DataViewSelectMenuProps
  extends Pick<DataViewSelectProps, "value" | "onChange"> {
  selectButtonElement: HTMLDivElement | null;
  setSelectMenu: Dispatch<SetStateAction<ReactNode>>;
}

function DataViewSelectMenu(props: DataViewSelectMenuProps) {
  const { selectButtonElement, setSelectMenu, value, onChange } = props;
  const [selectMenuElement, setSelectMenuElement] =
    useState<HTMLDivElement | null>(null);
  const selectMenuPopper = usePopper(selectButtonElement, selectMenuElement, {
    placement: "bottom-start",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, -29],
        },
      },
    ],
  });
  const dataViewList = useMemo<
    StringPermutation<MusicCurationsPageState["dataView"]>
  >(() => ["all"], []);
  return (
    <ClickAwayListener
      onClickAway={() => {
        setSelectMenu(null);
      }}
    >
      <div
        className={styles.selectMenuContainer}
        {...selectMenuPopper.attributes.popper}
        style={{ ...selectMenuPopper.styles.popper }}
        ref={setSelectMenuElement}
      >
        {dataViewList.map((someDataView) => (
          <div
            key={someDataView}
            className={`${styles.selectMenuItem} ${
              someDataView === value ? styles.itemSelected : ""
            }`}
            onClick={() => {
              const nextDataView = someDataView;
              onChange(nextDataView);
              setTimeout(() => {
                setSelectMenu(null);
              });
            }}
          >
            <div className={styles.itemCheck}>✓</div>
            {getDataViewLabel({
              someDataView,
            })}
          </div>
        ))}
      </div>
    </ClickAwayListener>
  );
}

interface GetDataViewLabelApi {
  someDataView: MusicCurationsPageState["dataView"];
}

function getDataViewLabel(api: GetDataViewLabelApi) {
  const { someDataView } = api;
  switch (someDataView) {
    case "all":
      return "all";
    default:
      throw new Error(`getDataViewLabel: ${someDataView} not handled`);
  }
}
