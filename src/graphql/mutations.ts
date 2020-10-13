/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser($input: CreateUserInput!, $condition: ModelUserConditionInput) {
    createUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      avatar
      phoneNumber
      company
      companySize
      companyAddress1
      companyCity
      companyState
      companyPostalCode
      address1
      city
      state
      postalCode
      title
      conversations {
        items {
          id
          userId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          authorId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      sessions {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      avatar
      phoneNumber
      company
      companySize
      companyAddress1
      companyCity
      companyState
      companyPostalCode
      address1
      city
      state
      postalCode
      title
      conversations {
        items {
          id
          userId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          authorId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      sessions {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      avatar
      phoneNumber
      company
      companySize
      companyAddress1
      companyCity
      companyState
      companyPostalCode
      address1
      city
      state
      postalCode
      title
      conversations {
        items {
          id
          userId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      messages {
        items {
          id
          content
          authorId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      sessions {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createConversation = /* GraphQL */ `
  mutation CreateConversation($input: CreateConversationInput!, $condition: ModelConversationConditionInput) {
    createConversation(input: $input, condition: $condition) {
      id
      name
      members
      messages {
        items {
          id
          content
          authorId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      associated {
        items {
          id
          userId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const updateConversation = /* GraphQL */ `
  mutation UpdateConversation($input: UpdateConversationInput!, $condition: ModelConversationConditionInput) {
    updateConversation(input: $input, condition: $condition) {
      id
      name
      members
      messages {
        items {
          id
          content
          authorId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      associated {
        items {
          id
          userId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteConversation = /* GraphQL */ `
  mutation DeleteConversation($input: DeleteConversationInput!, $condition: ModelConversationConditionInput) {
    deleteConversation(input: $input, condition: $condition) {
      id
      name
      members
      messages {
        items {
          id
          content
          authorId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      associated {
        items {
          id
          userId
          conversationId
          createdAt
          updatedAt
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`
export const createSession = /* GraphQL */ `
  mutation CreateSession($input: CreateSessionInput!, $condition: ModelSessionConditionInput) {
    createSession(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const updateSession = /* GraphQL */ `
  mutation UpdateSession($input: UpdateSessionInput!, $condition: ModelSessionConditionInput) {
    updateSession(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const deleteSession = /* GraphQL */ `
  mutation DeleteSession($input: DeleteSessionInput!, $condition: ModelSessionConditionInput) {
    deleteSession(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const createSessionReservation = /* GraphQL */ `
  mutation CreateSessionReservation(
    $input: CreateUserSessionReservationInput!
    $condition: ModelUserSessionReservationConditionInput
  ) {
    createSessionReservation(input: $input, condition: $condition) {
      id
      userId
      sessionId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      session {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateSessionReservation = /* GraphQL */ `
  mutation UpdateSessionReservation(
    $input: UpdateUserSessionReservationInput!
    $condition: ModelUserSessionReservationConditionInput
  ) {
    updateSessionReservation(input: $input, condition: $condition) {
      id
      userId
      sessionId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      session {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createMessage = /* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!, $condition: ModelMessageConditionInput) {
    createMessage(input: $input, condition: $condition) {
      id
      content
      authorId
      conversationId
      createdAt
      updatedAt
    }
  }
`
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage($input: UpdateMessageInput!, $condition: ModelMessageConditionInput) {
    updateMessage(input: $input, condition: $condition) {
      id
      content
      authorId
      conversationId
      createdAt
      updatedAt
    }
  }
`
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage($input: DeleteMessageInput!, $condition: ModelMessageConditionInput) {
    deleteMessage(input: $input, condition: $condition) {
      id
      content
      authorId
      conversationId
      createdAt
      updatedAt
    }
  }
`
export const createSurveyQuestion = /* GraphQL */ `
  mutation CreateSurveyQuestion($input: CreateSurveyQuestionInput!, $condition: ModelSurveyQuestionConditionInput) {
    createSurveyQuestion(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const updateSurveyQuestion = /* GraphQL */ `
  mutation UpdateSurveyQuestion($input: UpdateSurveyQuestionInput!, $condition: ModelSurveyQuestionConditionInput) {
    updateSurveyQuestion(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const deleteSurveyQuestion = /* GraphQL */ `
  mutation DeleteSurveyQuestion($input: DeleteSurveyQuestionInput!, $condition: ModelSurveyQuestionConditionInput) {
    deleteSurveyQuestion(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const createSurveyAnswer = /* GraphQL */ `
  mutation CreateSurveyAnswer($input: CreateSurveyAnswerInput!, $condition: ModelSurveyAnswerConditionInput) {
    createSurveyAnswer(input: $input, condition: $condition) {
      id
      answer
      userId
      questionId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      question {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateSurveyAnswer = /* GraphQL */ `
  mutation UpdateSurveyAnswer($input: UpdateSurveyAnswerInput!, $condition: ModelSurveyAnswerConditionInput) {
    updateSurveyAnswer(input: $input, condition: $condition) {
      id
      answer
      userId
      questionId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      question {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteSurveyAnswer = /* GraphQL */ `
  mutation DeleteSurveyAnswer($input: DeleteSurveyAnswerInput!, $condition: ModelSurveyAnswerConditionInput) {
    deleteSurveyAnswer(input: $input, condition: $condition) {
      id
      answer
      userId
      questionId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      question {
        id
        name
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createConvoLink = /* GraphQL */ `
  mutation CreateConvoLink($input: CreateConvoLinkInput!, $condition: ModelConvoLinkConditionInput) {
    createConvoLink(input: $input, condition: $condition) {
      id
      userId
      conversationId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      conversation {
        id
        name
        members
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateConvoLink = /* GraphQL */ `
  mutation UpdateConvoLink($input: UpdateConvoLinkInput!, $condition: ModelConvoLinkConditionInput) {
    updateConvoLink(input: $input, condition: $condition) {
      id
      userId
      conversationId
      user {
        id
        firstName
        lastName
        email
        avatar
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        address1
        city
        state
        postalCode
        title
        conversations {
          nextToken
        }
        messages {
          nextToken
        }
        sessions {
          nextToken
        }
        createdAt
        updatedAt
      }
      conversation {
        id
        name
        members
        messages {
          nextToken
        }
        associated {
          nextToken
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
