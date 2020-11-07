import styled from 'styled-components'
import { Flex } from 'amazon-chime-sdk-component-library-react'

export const StyledFlex = styled(Flex)`
  background: black;
  &.classroom {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    justify-content: flex-start;
  }
`

export const StyledList = styled.dl`
  font-size: 1rem;
  dt {
    display: inline-block;
    margin-bottom: 0.75rem;
    margin-right: 0.5rem;
    &::after {
      content: ':';
    }
  }
  dd {
    display: inline-block;
    font-weight: 600;
  }
`
