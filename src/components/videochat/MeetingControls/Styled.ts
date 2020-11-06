import { ControlBarButton } from 'amazon-chime-sdk-component-library-react'
import styled from 'styled-components'

interface StyledProps {
  active: boolean
  totalControls: number
}

export const StyledControls = styled.div<StyledProps>`
  z-index: 1301;
  background-color: transparent;
  opacity: ${props => (props.active ? '1' : '0')};
  transition: opacity 250ms ease;
  @media screen and (max-width: 768px) {
    opacity: 1;
  }
  .controls-menu {
    width: 100%;
    position: static;
    background-color: transparent;
    display: grid;
    grid-template-columns: 1fr repeat(${props => props.totalControls || '5'}, auto) 1fr;
    justify-items: center;

    & div:nth-child(1) {
      grid-column-start: 2;
    }
  }
  .controls-menu-right {
    background-color: transparent;
    display: flex;
    justify-self: end;
    justify-content: center;
    align-items: center;

    .present {
      border-radius: 16px;
      background-color: white;
      color: black;
      text-transform: none;
      padding: 4px 24px;
    }
  }
`

interface CustomControlBarButtonProps {
  removeSideMargin?: 'left' | 'right'
  backgroundColor?: string
}

export const CustomControlBarButton = styled(ControlBarButton)<CustomControlBarButtonProps>`
  ${props => (props.removeSideMargin ? `margin-${props.removeSideMargin}: 0;` : '')}
  button[data-testid='button'] {
    background-color: ${props => props.backgroundColor || 'white'};
    color: black;
  }
  button,
  button > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
