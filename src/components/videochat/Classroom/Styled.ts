import styled from 'styled-components'

interface StyledProps {
  drawerWidth: number
}

export const StyledLayout = styled.section<StyledProps>`
  height: 100vh;
  width: 100%;
  transition: all 0.15s ease-in;
  ${({ drawerWidth }) => `
    width: calc(100% - ${drawerWidth}px);
    margin-right: ${drawerWidth}px;
  `}
  display: flex;
  z-index: 99999999;
  background: #333;
  .presenter {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;
  }
  .attendees {
    display: flex;
    flex-direction: column;
    & > div {
      width: 150px;
      height: 100px;
    }
  }
  .chat {
    flex: 0.33;
    position: relative;
  }
`

export const StyledContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  display: flex;
  z-index: 9999999;
  .videos {
    flex: 1;
  }
  .controls {
    position: absolute;
    bottom: 20px;
    left: 0;
    opacity: 1;
    width: 100%;
    display: flex;
  }
  .mini-video {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 200px;
    height: 120px;
  }
  @media screen and (max-width: 768px) {
    .controls {
      position: static;
      transform: unset;
    }
  }
`
