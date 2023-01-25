import { Dispatch, Fragment, ReactNode, SetStateAction, useState } from "react";
import ClickAwayListener from "react-click-away-listener";
import { usePopper } from "react-popper";
import { MusicCurationsPageProps } from "../MusicCurationsPage";
import styles from "./CurationInfoButton.module.scss";

export interface CurationInfoButtonProps
  extends Pick<MusicCurationsPageProps, "musicCurator"> {}

export function CurationInfoButton(props: CurationInfoButtonProps) {
  const { musicCurator } = props;
  const [infoButtonElement, setInfoButtonElement] =
    useState<HTMLDivElement | null>(null);
  const [infoDisplay, setInfoDisplay] = useState<ReactNode>(null);
  return (
    <Fragment>
      <div
        tabIndex={0}
        className={styles.infoButton}
        ref={setInfoButtonElement}
        onClick={() => {
          setInfoDisplay(
            <CurationInfoDisplay
              musicCurator={musicCurator}
              infoButtonElement={infoButtonElement}
              setInfoDisplay={setInfoDisplay}
            />
          );
        }}
      >
        <svg viewBox="0 0 100 100" width={32} height={32}>
          <circle
            cx={50}
            cy={50}
            r={40}
            stroke={"black"}
            strokeWidth={6}
            fill={"transparent"}
          />
          <defs>
            <path id={"textBaselinePath"} d={"M32.5,69 L67.5,69"} />
          </defs>
          <text>
            <textPath
              href={"#textBaselinePath"}
              style={{
                fontSize: 60,
                fontWeight: "bold",
              }}
            >
              i
            </textPath>
          </text>
        </svg>
      </div>
      {infoDisplay}
    </Fragment>
  );
}

interface CurationInfoDisplayProps
  extends Pick<CurationInfoButtonProps, "musicCurator"> {
  infoButtonElement: HTMLDivElement | null;
  setInfoDisplay: Dispatch<SetStateAction<ReactNode>>;
}

function CurationInfoDisplay(props: CurationInfoDisplayProps) {
  const { infoButtonElement, setInfoDisplay, musicCurator } = props;
  const [infoDisplayElement, setInfoDisplayElement] =
    useState<HTMLDivElement | null>(null);
  const infoDisplayPopper = usePopper(infoButtonElement, infoDisplayElement, {
    placement: "bottom-end",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [3, -30],
        },
      },
    ],
  });
  return (
    <ClickAwayListener
      onClickAway={() => {
        setInfoDisplay(null);
      }}
    >
      <div
        className={styles.infoDisplayContainer}
        {...infoDisplayPopper.attributes.popper}
        style={{ ...infoDisplayPopper.styles.popper }}
        ref={setInfoDisplayElement}
      >
        <div className={styles.infoDisplayHeader}>
          <div className={styles.curatorNameText}>
            {musicCurator.curatorName}
          </div>
          <div
            className={styles.closeDisplayButton}
            onClick={() => {
              setInfoDisplay(null);
            }}
          >
            <svg className={styles.clearSearchIcon} viewBox={"0 0 1 1"}>
              <circle
                cx={0.5}
                cy={0.5}
                r={0.35}
                stroke={"black"}
                strokeWidth={0.07}
                strokeLinejoin={"round"}
                strokeLinecap={"round"}
                fill={"white"}
              />
              <polygon
                points={
                  "0.5,0.5 0.625,0.375, 0.5,0.5 0.625,0.625 0.5,0.5, 0.375,0.625 0.5,0.5, 0.375,0.375 0.5,0.5"
                }
                stroke={"black"}
                strokeWidth={0.07}
                strokeLinejoin={"round"}
                fill={"white"}
              />
            </svg>
          </div>
        </div>
        <div className={styles.curatorLocationText}>
          {musicCurator.curatorLocation}
        </div>
        <div className={styles.curatorStatusText}>
          {musicCurator.curatorStatus}
        </div>
        <div className={styles.socialIconList}>
          {musicCurator.curatorLinks.map((someCuratorLink) => {
            return (
              <div className={styles.socialIconContainer}>
                <a
                  href={someCuratorLink.linkHref}
                  rel={"noreferrer"}
                  target={"_blank"}
                  onClick={() => {
                    setInfoDisplay(null);
                  }}
                >
                  <SocialIcon linkType={someCuratorLink.linkType} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </ClickAwayListener>
  );
}

interface SocialIconProps
  extends Pick<
    CurationInfoDisplayProps["musicCurator"]["curatorLinks"][number],
    "linkType"
  > {}

function SocialIcon(props: SocialIconProps) {
  const { linkType } = props;
  if (linkType === "website") {
    return (
      <svg width={20} height={20} viewBox="0 8 500 500">
        <path d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z" />
      </svg>
    );
  } else if (linkType === "github") {
    return (
      <svg width={20} height={20} viewBox="12 12 500 500">
        <path d="M255.969,21.733c-131.739,0-238.572,107.541-238.572,240.206      c0,106.107,68.362,196.121,163.205,227.91c11.929,2.22,16.285-5.196,16.285-11.567c0-5.713-0.205-20.817-0.33-40.856      c-66.36,14.507-80.375-32.208-80.375-32.208c-10.828-27.756-26.489-35.139-26.489-35.139      c-21.684-14.893,1.613-14.591,1.613-14.591c23.948,1.701,36.534,24.759,36.534,24.759      c21.295,36.694,55.866,26.105,69.465,19.947c2.146-15.521,8.318-26.105,15.154-32.116      c-52.974-6.073-108.69-26.681-108.69-118.699c0-26.229,9.31-47.668,24.576-64.478c-2.475-6.071-10.646-30.507,2.329-63.554      c0,0,20.045-6.455,65.613,24.614c19.031-5.325,39.432-7.982,59.742-8.072c20.25,0.123,40.676,2.747,59.738,8.105      c45.547-31.074,65.559-24.614,65.559-24.614c13.002,33.077,4.832,57.482,2.387,63.549c15.297,16.81,24.516,38.25,24.516,64.482      c0,92.258-55.773,112.563-108.92,118.512c8.559,7.422,16.191,22.069,16.191,44.471c0,32.124-0.297,58.019-0.297,65.888      c0,6.427,4.293,13.903,16.402,11.54c94.697-31.824,162.998-121.805,162.998-227.883      C494.604,129.273,387.771,21.733,255.969,21.733L255.969,21.733z M255.969,21.733" />
      </svg>
    );
  } else if (linkType === "twitter") {
    return (
      <svg width={20} height={20} viewBox="0 0 512 512">
        <path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm-45.091,392.158c113.283,0 175.224,-93.87 175.224,-175.223c0,-2.682 0,-5.364 -0.128,-7.919c12.005,-8.684 22.478,-19.54 30.779,-31.928c-10.983,4.853 -22.861,8.174 -35.377,9.706c12.772,-7.663 22.478,-19.668 27.076,-34.099c-11.878,7.024 -25.032,12.132 -39.081,14.942c-11.239,-12.005 -27.203,-19.412 -44.955,-19.412c-33.972,0 -61.558,27.586 -61.558,61.558c0,4.853 0.511,9.578 1.66,14.048c-51.213,-2.554 -96.552,-27.075 -126.947,-64.368c-5.237,9.068 -8.302,19.668 -8.302,30.907c0,21.328 10.856,40.23 27.459,51.213c-10.09,-0.255 -19.541,-3.065 -27.842,-7.662l0,0.766c0,29.885 21.2,54.661 49.425,60.409c-5.108,1.404 -10.6,2.171 -16.219,2.171c-3.96,0 -7.791,-0.383 -11.622,-1.15c7.79,24.521 30.523,42.274 57.471,42.784c-21.073,16.476 -47.637,26.31 -76.501,26.31c-4.981,0 -9.834,-0.256 -14.687,-0.894c26.948,17.624 59.387,27.841 94.125,27.841Z" />
      </svg>
    );
  } else if (linkType === "instagram") {
    return (
      <svg width={20} height={20} viewBox="0 0 512 512">
        <path d="M256,0c141.29,0 256,114.71 256,256c0,141.29 -114.71,256 -256,256c-141.29,0 -256,-114.71 -256,-256c0,-141.29 114.71,-256 256,-256Zm0,96c-43.453,0 -48.902,0.184 -65.968,0.963c-17.03,0.777 -28.661,3.482 -38.839,7.437c-10.521,4.089 -19.444,9.56 -28.339,18.455c-8.895,8.895 -14.366,17.818 -18.455,28.339c-3.955,10.177 -6.659,21.808 -7.437,38.838c-0.778,17.066 -0.962,22.515 -0.962,65.968c0,43.453 0.184,48.902 0.962,65.968c0.778,17.03 3.482,28.661 7.437,38.838c4.089,10.521 9.56,19.444 18.455,28.34c8.895,8.895 17.818,14.366 28.339,18.455c10.178,3.954 21.809,6.659 38.839,7.436c17.066,0.779 22.515,0.963 65.968,0.963c43.453,0 48.902,-0.184 65.968,-0.963c17.03,-0.777 28.661,-3.482 38.838,-7.436c10.521,-4.089 19.444,-9.56 28.34,-18.455c8.895,-8.896 14.366,-17.819 18.455,-28.34c3.954,-10.177 6.659,-21.808 7.436,-38.838c0.779,-17.066 0.963,-22.515 0.963,-65.968c0,-43.453 -0.184,-48.902 -0.963,-65.968c-0.777,-17.03 -3.482,-28.661 -7.436,-38.838c-4.089,-10.521 -9.56,-19.444 -18.455,-28.339c-8.896,-8.895 -17.819,-14.366 -28.34,-18.455c-10.177,-3.955 -21.808,-6.66 -38.838,-7.437c-17.066,-0.779 -22.515,-0.963 -65.968,-0.963Zm0,28.829c42.722,0 47.782,0.163 64.654,0.933c15.6,0.712 24.071,3.318 29.709,5.509c7.469,2.902 12.799,6.37 18.397,11.969c5.6,5.598 9.067,10.929 11.969,18.397c2.191,5.638 4.798,14.109 5.509,29.709c0.77,16.872 0.933,21.932 0.933,64.654c0,42.722 -0.163,47.782 -0.933,64.654c-0.711,15.6 -3.318,24.071 -5.509,29.709c-2.902,7.469 -6.369,12.799 -11.969,18.397c-5.598,5.6 -10.928,9.067 -18.397,11.969c-5.638,2.191 -14.109,4.798 -29.709,5.509c-16.869,0.77 -21.929,0.933 -64.654,0.933c-42.725,0 -47.784,-0.163 -64.654,-0.933c-15.6,-0.711 -24.071,-3.318 -29.709,-5.509c-7.469,-2.902 -12.799,-6.369 -18.398,-11.969c-5.599,-5.598 -9.066,-10.928 -11.968,-18.397c-2.191,-5.638 -4.798,-14.109 -5.51,-29.709c-0.77,-16.872 -0.932,-21.932 -0.932,-64.654c0,-42.722 0.162,-47.782 0.932,-64.654c0.712,-15.6 3.319,-24.071 5.51,-29.709c2.902,-7.468 6.369,-12.799 11.968,-18.397c5.599,-5.599 10.929,-9.067 18.398,-11.969c5.638,-2.191 14.109,-4.797 29.709,-5.509c16.872,-0.77 21.932,-0.933 64.654,-0.933Zm0,49.009c-45.377,0 -82.162,36.785 -82.162,82.162c0,45.377 36.785,82.162 82.162,82.162c45.377,0 82.162,-36.785 82.162,-82.162c0,-45.377 -36.785,-82.162 -82.162,-82.162Zm0,135.495c-29.455,0 -53.333,-23.878 -53.333,-53.333c0,-29.455 23.878,-53.333 53.333,-53.333c29.455,0 53.333,23.878 53.333,53.333c0,29.455 -23.878,53.333 -53.333,53.333Zm104.609,-138.741c0,10.604 -8.597,19.199 -19.201,19.199c-10.603,0 -19.199,-8.595 -19.199,-19.199c0,-10.604 8.596,-19.2 19.199,-19.2c10.604,0 19.201,8.596 19.201,19.2Z" />
      </svg>
    );
  } else {
    throw new Error("invalid path reached: SocialIcon");
  }
}
