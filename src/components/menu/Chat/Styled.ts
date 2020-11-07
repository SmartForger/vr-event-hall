import styled from 'styled-components'

export const StyledChat = styled.div`
  color: #ffffff;
  padding: 30px 20px;

  .drawer-close {
    opacity: 0;
    user-select: none;
  }

  @media (max-width: 960px), screen and (max-height: 540px) {
    padding: 30px 20px 50px;
  }
`

export const StyledChatHeader = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 30px;

  .header-icon {
    margin-right: 20px;
    cursor: pointer;
  }

  .header-title {
    margin: 0;
    line-height: 1;
    font-weight: bold;
    font-size: 24px;
    font-family: 'Verizon-Bold';
  }

  .header-button {
    margin-left: auto;
  }

  @media (max-width: 960px), screen and (max-height: 540px) {
    margin-bottom: 6px;

    .header-title {
      font-size: 16px;
    }
  }
`

export const StyledChatSection = styled.div`
  padding-left: 44px;
`
