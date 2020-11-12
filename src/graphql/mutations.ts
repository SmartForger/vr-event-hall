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
          deleted
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
      onVideoCall
      online
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
          deleted
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
      onVideoCall
      online
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
          deleted
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
      onVideoCall
      online
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
          deleted
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
          deleted
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
          deleted
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
      description
      active
      conversationId
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
      icId
      ic {
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
      admins {
        items {
          id
          userId
          sessionId
          userType
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
      pinnedMessageId
      pinnedMessage {
        id
        content
        authorId
        author {
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
          onVideoCall
          online
          createdAt
          updatedAt
        }
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        deleted
        createdAt
        updatedAt
      }
      raisedHands {
        items {
          id
          userId
          sessionId
          dismissed
          createdAt
          updatedAt
        }
        nextToken
      }
      questions {
        items {
          id
          userId
          sessionId
          answered
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      polls {
        items {
          id
          sessionId
          active
          name
          question
          optionA
          optionB
          optionC
          optionD
          answer
          createdAt
          updatedAt
        }
        nextToken
      }
      pollAnswers {
        items {
          id
          sessionId
          userId
          answer
          createdAt
          updatedAt
        }
        nextToken
      }
      qaActive
      presenterPins
      muted
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
      description
      active
      conversationId
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
      icId
      ic {
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
      admins {
        items {
          id
          userId
          sessionId
          userType
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
      pinnedMessageId
      pinnedMessage {
        id
        content
        authorId
        author {
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
          onVideoCall
          online
          createdAt
          updatedAt
        }
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        deleted
        createdAt
        updatedAt
      }
      raisedHands {
        items {
          id
          userId
          sessionId
          dismissed
          createdAt
          updatedAt
        }
        nextToken
      }
      questions {
        items {
          id
          userId
          sessionId
          answered
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      polls {
        items {
          id
          sessionId
          active
          name
          question
          optionA
          optionB
          optionC
          optionD
          answer
          createdAt
          updatedAt
        }
        nextToken
      }
      pollAnswers {
        items {
          id
          sessionId
          userId
          answer
          createdAt
          updatedAt
        }
        nextToken
      }
      qaActive
      presenterPins
      muted
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
      description
      active
      conversationId
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
      icId
      ic {
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
      admins {
        items {
          id
          userId
          sessionId
          userType
          createdAt
          updatedAt
        }
        nextToken
      }
      users {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
        }
        nextToken
      }
      pinnedMessageId
      pinnedMessage {
        id
        content
        authorId
        author {
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
          onVideoCall
          online
          createdAt
          updatedAt
        }
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        deleted
        createdAt
        updatedAt
      }
      raisedHands {
        items {
          id
          userId
          sessionId
          dismissed
          createdAt
          updatedAt
        }
        nextToken
      }
      questions {
        items {
          id
          userId
          sessionId
          answered
          content
          createdAt
          updatedAt
        }
        nextToken
      }
      polls {
        items {
          id
          sessionId
          active
          name
          question
          optionA
          optionB
          optionC
          optionD
          answer
          createdAt
          updatedAt
        }
        nextToken
      }
      pollAnswers {
        items {
          id
          sessionId
          userId
          answer
          createdAt
          updatedAt
        }
        nextToken
      }
      qaActive
      presenterPins
      muted
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      session {
        id
        name
        description
        active
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        icId
        ic {
          id
          name
          members
          createdAt
          updatedAt
        }
        admins {
          nextToken
        }
        users {
          nextToken
        }
        pinnedMessageId
        pinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          createdAt
          updatedAt
        }
        raisedHands {
          nextToken
        }
        questions {
          nextToken
        }
        polls {
          nextToken
        }
        pollAnswers {
          nextToken
        }
        qaActive
        presenterPins
        muted
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      session {
        id
        name
        description
        active
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        icId
        ic {
          id
          name
          members
          createdAt
          updatedAt
        }
        admins {
          nextToken
        }
        users {
          nextToken
        }
        pinnedMessageId
        pinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          createdAt
          updatedAt
        }
        raisedHands {
          nextToken
        }
        questions {
          nextToken
        }
        polls {
          nextToken
        }
        pollAnswers {
          nextToken
        }
        qaActive
        presenterPins
        muted
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
      author {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      conversationId
      conversation {
        id
        members
      }
      deleted
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
      author {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      conversationId
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
      deleted
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
      author {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      conversationId
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
      deleted
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
        onVideoCall
        online
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
        onVideoCall
        online
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
        onVideoCall
        online
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
        onVideoCall
        online
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
        onVideoCall
        online
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
export const createAdminLink = /* GraphQL */ `
  mutation CreateAdminLink($input: CreateAdminUserInput!, $condition: ModelAdminUserConditionInput) {
    createAdminLink(input: $input, condition: $condition) {
      id
      userId
      sessionId
      userType
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      session {
        id
        name
        description
        active
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        icId
        ic {
          id
          name
          members
          createdAt
          updatedAt
        }
        admins {
          nextToken
        }
        users {
          nextToken
        }
        pinnedMessageId
        pinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          createdAt
          updatedAt
        }
        raisedHands {
          nextToken
        }
        questions {
          nextToken
        }
        polls {
          nextToken
        }
        pollAnswers {
          nextToken
        }
        qaActive
        presenterPins
        muted
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateAdminLink = /* GraphQL */ `
  mutation UpdateAdminLink($input: UpdateAdminUserInput!, $condition: ModelAdminUserConditionInput) {
    updateAdminLink(input: $input, condition: $condition) {
      id
      userId
      sessionId
      userType
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      session {
        id
        name
        description
        active
        conversationId
        conversation {
          id
          name
          members
          createdAt
          updatedAt
        }
        icId
        ic {
          id
          name
          members
          createdAt
          updatedAt
        }
        admins {
          nextToken
        }
        users {
          nextToken
        }
        pinnedMessageId
        pinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          createdAt
          updatedAt
        }
        raisedHands {
          nextToken
        }
        questions {
          nextToken
        }
        polls {
          nextToken
        }
        pollAnswers {
          nextToken
        }
        qaActive
        presenterPins
        muted
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const createPollAnswer = /* GraphQL */ `
  mutation CreatePollAnswer($input: CreatePollAnswersInput!, $condition: ModelPollAnswersConditionInput) {
    createPollAnswer(input: $input, condition: $condition) {
      id
      pollId
      userId
      answer
      createdAt
      updatedAt
    }
  }
`
export const createNotification = /* GraphQL */ `
  mutation CreateNotification($input: CreateNotificationInput!, $condition: ModelNotificationConditionInput) {
    createNotification(input: $input, condition: $condition) {
      id
      type
      body
      button
      link
      createdAt
      updatedAt
    }
  }
`
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification($input: UpdateNotificationInput!, $condition: ModelNotificationConditionInput) {
    updateNotification(input: $input, condition: $condition) {
      id
      type
      body
      button
      link
      createdAt
      updatedAt
    }
  }
`
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification($input: DeleteNotificationInput!, $condition: ModelNotificationConditionInput) {
    deleteNotification(input: $input, condition: $condition) {
      id
      type
      body
      button
      link
      createdAt
      updatedAt
    }
  }
`
export const createEventConfig = /* GraphQL */ `
  mutation CreateEventConfig($input: CreateEventConfigInput!, $condition: ModelEventConfigConditionInput) {
    createEventConfig(input: $input, condition: $condition) {
      id
      name
      stage
      streamStartTime
      useBackupStream
      environment
      vcOff
      createdAt
      updatedAt
    }
  }
`
export const updateEventConfig = /* GraphQL */ `
  mutation UpdateEventConfig($input: UpdateEventConfigInput!, $condition: ModelEventConfigConditionInput) {
    updateEventConfig(input: $input, condition: $condition) {
      id
      name
      stage
      streamStartTime
      useBackupStream
      environment
      vcOff
      createdAt
      updatedAt
    }
  }
`
export const deleteEventConfig = /* GraphQL */ `
  mutation DeleteEventConfig($input: DeleteEventConfigInput!, $condition: ModelEventConfigConditionInput) {
    deleteEventConfig(input: $input, condition: $condition) {
      id
      name
      stage
      streamStartTime
      useBackupStream
      environment
      vcOff
      createdAt
      updatedAt
    }
  }
`
export const createUserInteraction = /* GraphQL */ `
  mutation CreateUserInteraction($input: CreateUserInteractionInput!, $condition: ModelUserInteractionConditionInput) {
    createUserInteraction(input: $input, condition: $condition) {
      id
      trigger
      type
      name
      userId
      createdAt
      updatedAt
    }
  }
`
export const createContactRequest = /* GraphQL */ `
  mutation CreateContactRequest($input: CreateContactRequestInput!, $condition: ModelContactRequestConditionInput) {
    createContactRequest(input: $input, condition: $condition) {
      id
      firstName
      lastName
      phoneNumber
      email
      message
      demo
      userId
      createdAt
      updatedAt
    }
  }
`
export const createRaisedHand = /* GraphQL */ `
  mutation CreateRaisedHand($input: CreateRaisedHandInput!, $condition: ModelRaisedHandConditionInput) {
    createRaisedHand(input: $input, condition: $condition) {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      dismissed
      createdAt
      updatedAt
    }
  }
`
export const updateRaisedHand = /* GraphQL */ `
  mutation UpdateRaisedHand($input: UpdateRaisedHandInput!, $condition: ModelRaisedHandConditionInput) {
    updateRaisedHand(input: $input, condition: $condition) {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      dismissed
      createdAt
      updatedAt
    }
  }
`
export const createSessionQuestion = /* GraphQL */ `
  mutation CreateSessionQuestion($input: CreateSessionQuestionInput!, $condition: ModelSessionQuestionConditionInput) {
    createSessionQuestion(input: $input, condition: $condition) {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      answered
      content
      createdAt
      updatedAt
    }
  }
`
export const updateSessionQuestion = /* GraphQL */ `
  mutation UpdateSessionQuestion($input: UpdateSessionQuestionInput!, $condition: ModelSessionQuestionConditionInput) {
    updateSessionQuestion(input: $input, condition: $condition) {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      answered
      content
      createdAt
      updatedAt
    }
  }
`
export const createSessionPoll = /* GraphQL */ `
  mutation CreateSessionPoll($input: CreateSessionPollInput!, $condition: ModelSessionPollConditionInput) {
    createSessionPoll(input: $input, condition: $condition) {
      id
      sessionId
      active
      name
      question
      optionA
      optionB
      optionC
      optionD
      answer
      createdAt
      updatedAt
    }
  }
`
export const updateSessionPoll = /* GraphQL */ `
  mutation UpdateSessionPoll($input: UpdateSessionPollInput!, $condition: ModelSessionPollConditionInput) {
    updateSessionPoll(input: $input, condition: $condition) {
      id
      sessionId
      active
      name
      question
      optionA
      optionB
      optionC
      optionD
      answer
      createdAt
      updatedAt
    }
  }
`
export const createSessionPollAnswer = /* GraphQL */ `
  mutation CreateSessionPollAnswer(
    $input: CreateSessionPollAnswerInput!
    $condition: ModelSessionPollAnswerConditionInput
  ) {
    createSessionPollAnswer(input: $input, condition: $condition) {
      id
      sessionId
      userId
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      answer
      createdAt
      updatedAt
    }
  }
`
export const updateSessionPollAnswer = /* GraphQL */ `
  mutation UpdateSessionPollAnswer(
    $input: UpdateSessionPollAnswerInput!
    $condition: ModelSessionPollAnswerConditionInput
  ) {
    updateSessionPollAnswer(input: $input, condition: $condition) {
      id
      sessionId
      userId
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      answer
      createdAt
      updatedAt
    }
  }
`
export const createVideoChatInvite = /* GraphQL */ `
  mutation CreateVideoChatInvite($input: CreateVideoChatInviteInput!, $condition: ModelVideoChatInviteConditionInput) {
    createVideoChatInvite(input: $input, condition: $condition) {
      id
      conversationId
      userId
      invitingUserId
      invitingUser {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const updateVideoChatInvite = /* GraphQL */ `
  mutation UpdateVideoChatInvite($input: UpdateVideoChatInviteInput!, $condition: ModelVideoChatInviteConditionInput) {
    updateVideoChatInvite(input: $input, condition: $condition) {
      id
      conversationId
      userId
      invitingUserId
      invitingUser {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
export const deleteVideoChatInvite = /* GraphQL */ `
  mutation DeleteVideoChatInvite($input: DeleteVideoChatInviteInput!, $condition: ModelVideoChatInviteConditionInput) {
    deleteVideoChatInvite(input: $input, condition: $condition) {
      id
      conversationId
      userId
      invitingUserId
      invitingUser {
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
