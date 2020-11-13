/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateConvoLink = /* GraphQL */ `
  subscription OnCreateConvoLink($convoLinkUserId: ID!) {
    onCreateConvoLink(convoLinkUserId: $convoLinkUserId) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($conversationId: ID!) {
    onCreateMessage(conversationId: $conversationId) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($conversationId: ID!) {
    onUpdateMessage(conversationId: $conversationId) {
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
export const onCreateGlobalMessage = /* GraphQL */ `
  subscription OnCreateGlobalMessage {
    onCreateGlobalMessage {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification {
    onCreateNotification {
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
export const onUpdateSession = /* GraphQL */ `
  subscription OnUpdateSession($id: ID!) {
    onUpdateSession(id: $id) {
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
          createdAt
          updatedAt
        }
        nextToken
      }
      participants {
        items {
          id
          userId
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
export const onCreateSessionPoll = /* GraphQL */ `
  subscription OnCreateSessionPoll($sessionId: ID!) {
    onCreateSessionPoll(sessionId: $sessionId) {
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
export const onUpdateSessionPoll = /* GraphQL */ `
  subscription OnUpdateSessionPoll($sessionId: ID!) {
    onUpdateSessionPoll(sessionId: $sessionId) {
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
export const onCreateSessionQuestion = /* GraphQL */ `
  subscription OnCreateSessionQuestion($sessionId: ID!) {
    onCreateSessionQuestion(sessionId: $sessionId) {
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
export const onUpdateSessionQuestion = /* GraphQL */ `
  subscription OnUpdateSessionQuestion($sessionId: ID!) {
    onUpdateSessionQuestion(sessionId: $sessionId) {
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
export const onCreateRaisedHand = /* GraphQL */ `
  subscription OnCreateRaisedHand($sessionId: ID!) {
    onCreateRaisedHand(sessionId: $sessionId) {
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
export const onUpdateRaisedHand = /* GraphQL */ `
  subscription OnUpdateRaisedHand($sessionId: ID!) {
    onUpdateRaisedHand(sessionId: $sessionId) {
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
export const onCreateGlobalRaisedHand = /* GraphQL */ `
  subscription OnCreateGlobalRaisedHand {
    onCreateGlobalRaisedHand {
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
export const onCreateVideoChatInvite = /* GraphQL */ `
  subscription OnCreateVideoChatInvite($userId: ID!) {
    onCreateVideoChatInvite(userId: $userId) {
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
      declined
      createdAt
      updatedAt
    }
  }
`
export const onUpdateVideoChatInvite = /* GraphQL */ `
  subscription OnUpdateVideoChatInvite($id: ID!) {
    onUpdateVideoChatInvite(id: $id) {
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
      declined
      createdAt
      updatedAt
    }
  }
`
export const onCreateSessionParticipant = /* GraphQL */ `
  subscription OnCreateSessionParticipant($userId: ID!) {
    onCreateSessionParticipant(userId: $userId) {
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
        participants {
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
export const onUpdateSessionParticipant = /* GraphQL */ `
  subscription OnUpdateSessionParticipant($id: ID!) {
    onUpdateSessionParticipant(id: $id) {
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
        participants {
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
export const onCreateEventConfig = /* GraphQL */ `
  subscription OnCreateEventConfig {
    onCreateEventConfig {
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
export const onUpdateEventConfig = /* GraphQL */ `
  subscription OnUpdateEventConfig {
    onUpdateEventConfig {
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
export const onDeleteEventConfig = /* GraphQL */ `
  subscription OnDeleteEventConfig {
    onDeleteEventConfig {
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
export const onCreateSessionPollAnswer = /* GraphQL */ `
  subscription OnCreateSessionPollAnswer {
    onCreateSessionPollAnswer {
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
export const onUpdateSessionPollAnswer = /* GraphQL */ `
  subscription OnUpdateSessionPollAnswer {
    onUpdateSessionPollAnswer {
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
