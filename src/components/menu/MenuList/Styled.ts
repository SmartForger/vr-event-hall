import styled from 'styled-components'

export const StyledOpenRightDrawer = styled.div`
  width: 350px;
  padding: 40px;
  position: relative;
  border-bottom: 1px solid #fff;

  @media screen and (max-width: 575px) {
    width: 100%;
    padding: 15px;
  }
`

export const StyledMenuListHeader = styled.div`
  display: flex;
  margin-bottom: 20px;

  .user-avatar {
    height: 50px;
    width: 50px;
    margin-right: 20px;
  }
`

export const StyledMenuListHeaderPortrait = styled.div`
  flex: 2;
  display: flex;
`

export const StyledSvgWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const StyledMenuList = styled.div`
  width: 100%;
`

export const StyledDropdownItem = styled.div`
  position: relative;
  padding-left: 30px;
  margin-bottom: 25px;
  font-size: 1.25rem;
  user-select: none;
  cursor: pointer;

  @media screen and (max-width: 575px) {
    font-size: 24px;
  }
`

export const StyledDropdownIcon = styled.img`
  position: absolute;
  left: 2px;
  top: 7px;
`
