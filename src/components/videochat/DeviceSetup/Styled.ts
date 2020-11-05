import styled from 'styled-components'

export const StyledContainer = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #333;
`

export const StyledLayout = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  max-width: 85rem;
  padding: 2rem;
  margin: auto;
  @media (max-width: 760px) {
    border-right: unset;
    align-items: unset;
    justify-content: unset;
  }
`

export const SmallText = styled.small`
  color: rgba(0, 0, 0, 0.5);
`

export const StyledCard = styled.div`
  .ch-body {
    margin-bottom: 1rem;
  }
  .ch-header {
    font-size: 1.5rem;
  }
  .ch-title {
    font-size: 1.25rem;
    margin-top: 1rem;
  }
  .ch-description {
    margin: 1rem 0 1rem 0;
  }
`
