import styled, { keyframes } from 'styled-components'

interface DoubleBounceProps {
  inverted?: boolean
}

const bounceAnimation = keyframes`
  0%,
  100% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
`

export const StyledDoubleBounce = styled.div<DoubleBounceProps>`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #333;
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  animation: ${bounceAnimation} 2s infinite ease-in-out;

  ${({ inverted }) => (inverted ? `animation-delay: -1s;` : ``)}
`

export const StyledSpinner = styled.div`
  width: 40px;
  height: 40px;
  position: relative;
  margin: 100px auto;
`
