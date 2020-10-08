import styled from 'styled-components'

export const StyledChatSection = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledChatSectionItem = styled.div`
  margin-bottom: 1rem;

  &:hover {
    cursor: pointer;
  }
`

export const StyledChatSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

export const StyledChatSectionHeaderTitle = styled.h3`
  font-size: 1.25rem,
  margin: 0,
  font-weight: bold
`

export const StyledNotificationIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 1rem;
  width: 1.5rem;
  border-radius: 20px;
  background-color: #ff1200;
  color: #fff;
  font-size: 0.75rem;
  line-height: 0;
  margin-right: 0.5rem;
`

export const StyledUserName = styled.span`
  color: #fff;
`

export const StyledUserStatus = styled.span`
  display: block;
  height: 0.75rem;
  width: 0.75rem;
  border-radius: 50%;
  margin-right: 0.5rem;

  &.online {
    background-color: #00ac3e;
  }

  &.offline {
    background-color: #d8dada;
  }
`

export const StyledLeftContent = styled.div`
  display: flex;
  align-items: center;
`

export const StyledDirectMessageItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const StyledDirectMessage = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const StyledChannel = styled.div`
  &:after {
    display: block;
    content: '';
    border-bottom: 2px solid #fff;
    transform: scaleX(0);
    transition: transform 0.3s ease-in-out;
    transform-origin: 100% 50%;
  }
  &:hover {
    &:after {
      transform: scaleX(1);
      transform-origin: 0% 50%;
    }
  }
`
