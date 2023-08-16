import {
  ProfileButtonBase,
  ProfileButtonBaseDataProps,
  ProfileIconBase,
} from './components/ProfileButtonBase'
import { ProfileContentBase } from './components/ProfileContentBase'
import {
  ProfileBopperBase,
  ProfileBopperBaseDataProps,
} from './ProfileBopperBase'

export interface ConsumerProfileBopperProps
  extends ProfileBopperBaseDataProps {}

export function ConsumerProfileBopper(props: ConsumerProfileBopperProps) {
  const { curatorInfo } = props
  return (
    <ProfileBopperBase
      anchorAriaLabel={`show ${curatorInfo.curatorName}'s profile`}
      anchorAriaDescription={`a button that displays a popover with ${curatorInfo.curatorName}'s profile info`}
      SomeAnchorButton={ConsumerProfileButton}
      PopoverContent={ProfileContentBase}
      curatorInfo={curatorInfo}
    />
  )
}

interface ConsumerProfileButtonProps extends ProfileButtonBaseDataProps {}

function ConsumerProfileButton(props: ConsumerProfileButtonProps) {
  return (
    <ProfileButtonBase
      ariaLabel={`show curator's profile`}
      ariaDescription={
        "a button that opens a popover displaying the curator's profile info"
      }
      ProfileIcon={ConsumerProfileIcon}
      {...props}
    />
  )
}

function ConsumerProfileIcon() {
  return (
    <ProfileIconBase
      IconContent={() => (
        <g transform={'scale(0.95) translate(0.5,1.5)'}>
          <circle cx={'12'} cy={'3.75'} r={'2'} />
          <path
            d={
              'M15.89,8.11C15.5,7.72,14.83,7,13.53,7c-0.21,0-1.42,0-2.54,0C8.53,6.99,6.48,5.2,6.07,2.85C5.99,2.36,5.58,2,5.09,2h0 c-0.61,0-1.09,0.54-1,1.14C4.53,5.8,6.47,7.95,9,8.71V21c0,0.55,0.45,1,1,1h0c0.55,0,1-0.45,1-1v-5h2v5c0,0.55,0.45,1,1,1h0 c0.55,0,1-0.45,1-1V10.05l3.24,3.24c0.39,0.39,1.02,0.39,1.41,0v0c0.39-0.39,0.39-1.02,0-1.41L15.89,8.11z'
            }
          />
        </g>
      )}
    />
  )
}