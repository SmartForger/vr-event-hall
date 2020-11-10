import styled from 'styled-components'

export const StyledOpenRightDrawer = styled.div`
  padding: 78px 20px 30px;
  border-bottom: 1px solid #747676;
  color: #ffffff;

  .drawer-close {
    color: #000000;
  }

  @media (max-width: 960px), screen and (max-height: 540px) {
    padding-top: 55px;
    padding-bottom: 20px;
  }
`

export const StyledMenuListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 34px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }

  .header-avatar {
    width: 24px;
    height: 24px;
    font-size: 16px;
    font-family: 'Verizon-Bold';
    border: 1px solid #fff;
    background-color: #8b8b8b;
    margin-right: 20px;
  }

  .header-title {
    font-size: 20px;
    line-height: 1;
    display: block;
    margin-bottom: 8px;
    font-family: 'Verizon-Bold';
  }

  .header-subtitle {
    display: block;
    font-size: 14px;
    line-height: 1;
  }

  @media (max-width: 960px), screen and (max-height: 540px) {
    margin-bottom: 20px;

    .header-title {
      font-size: 16px;
      margin-bottom: 8px;
    }

    .header-subtitle {
      font-size: 12px;
    }
  }
`

export const StyledMenuList = styled.div`
  width: 100%;
`

export const StyledMenuListItem = styled.div`
  display: flex;
  flex-wrap: nowrap;
  margin-bottom: 35px;
  font-size: 24px;
  font-weight: bold;
  align-items: center;
  user-select: none;
  color: inherit;
  line-height: 1;
  cursor: pointer;
  font-family: 'Verizon-Bold';

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 960px), screen and (max-height: 540px) {
    font-size: 16px;
    margin-bottom: 16px;
  }
`

export const StyledMenuListIcon = styled.div`
  display: flex;
  width: 25px;
  justify-content: center;
  margin-right: 19px;

  @media (max-width: 960px), screen and (max-height: 540px) {
    width: 20px;
    margin-right: 18px;
  }
`
