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
