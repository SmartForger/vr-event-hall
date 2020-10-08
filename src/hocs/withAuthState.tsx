import React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'

interface WithAuthStateProps {
  authState: string
  authData: object
}

export const withAuthState = (ChildComponent: React.ComponentType<WithAuthStateProps>, authState = 'signIn') => {
  class AuthBase extends React.Component {
    render() {
      return <ChildComponent {...this.props} authState={authState} authData={{ isInitial: true }} />
    }
  }
  hoistNonReactStatics(AuthBase, ChildComponent)
  // @ts-ignore
  return AuthBase
}
