import styled from 'styled-components'

export const StyledMapMarker = styled.div`
  position: absolute;
  left: 20px;
  top: calc(50% - 100px);
  padding: 15px 25px;
  display: inline-block;
  border-radius: 15px;

  @media screen and (max-width: 768px) {
    visibility: hidden;
  }

  ul {
    margin: 0px;
    list-style: none;
    padding-left: 30px;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      width: 2px;
      height: calc(100% - 22px);
      background: white;
      top: 11px;
      left: 2px;
    }
  }

  li {
    user-select: none;
    position: relative;
    cursor: pointer;
    padding: 5px;
    &:not(:last-of-type) {
      margin-bottom: 20px;
    }
    &:before {
      content: '';
      width: 14px;
      height: 14px;
      position: absolute;
      border: solid 2px white;
      background: black;
      top: 7px;
      left: -34px;
      border-radius: 50%;
    }
  }

  .active-location:before {
    background: white;
  }
`
