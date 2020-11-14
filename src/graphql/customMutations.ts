export const createSessionReservation = /* GraphQL */ `
  mutation CreateSessionReservation(
    $input: CreateUserSessionReservationInput!
    $condition: ModelUserSessionReservationConditionInput
  ) {
    createSessionReservation(input: $input, condition: $condition) {
      id
      userId
      sessionId
      createdAt
      updatedAt
    }
  }
`
export const createSessionParticipantMin = /* GraphQL */ `
  mutation CreateSessionParticipant(
    $input: CreateUserSessionParticipantInput!
    $condition: ModelUserSessionParticipantConditionInput
  ) {
    createSessionParticipant(input: $input, condition: $condition) {
      id
      userId
      sessionId
      user {
        id
        firstName
        lastName
        email
        avatar
        company
        title
        onVideoCall
        online
        createdAt
        updatedAt
      }
      session {
        id
      }
      createdAt
      updatedAt
    }
  }
`
export const updateSessionParticipantMin = /* GraphQL */ `
  mutation UpdateSessionParticipant(
    $input: UpdateUserSessionParticipantInput!
    $condition: ModelUserSessionParticipantConditionInput
  ) {
    updateSessionParticipant(input: $input, condition: $condition) {
      id
      userId
      sessionId
      user {
        id
        firstName
        lastName
        email
        avatar
        company
        title
        onVideoCall
        online
        createdAt
        updatedAt
      }
      session {
        id
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteSessionParticipantMin = /* GraphQL */ `
  mutation DeleteSessionParticipant(
    $input: DeleteUserSessionParticipantInput!
    $condition: ModelUserSessionParticipantConditionInput
  ) {
    deleteSessionParticipant(input: $input, condition: $condition) {
      id
    }
  }
`
