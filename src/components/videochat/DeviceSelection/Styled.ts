import styled from 'styled-components'

export const title = `
  font-size: 1rem !important;
  margin-bottom: 8px;
  font-weight: bold;
`

export const StyledPreviewGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const StyledWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 65rem;
  height: auto;
  padding: 1rem 0 3rem 0;
  > * {
    flex-basis: auto;
  }
  @media (min-width: 900px) {
    flex-direction: row;
    padding: 2.5rem 0 6rem 0;
    > * {
      flex-basis: 50%;
    }
    @media (max-height: 800px) {
      padding: 2rem 0 2rem;
    }
  }
`

export const StyledAudioGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & > div[data-testid='video-tile'] {
    height: 100%;
  }
  @media (max-width: 900px) {
    padding: 2rem 0 2rem 0;
    border-right: unset;
  }
`

export const StyledVideoGroup = styled.div`
  padding: 0 0 0 1rem;
  @media (max-width: 900px) {
    padding: 0;
  }
`

export const StyledInputGroup = styled.div`
  margin-bottom: 1.5rem;
`

export const preview = `
  & > video {
    border: 1px solid black;
  }
`
