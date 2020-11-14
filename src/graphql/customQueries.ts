import { graphQLQuery } from './helpers'

export const getConversationFiltered = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      name
      members
      messages {
        items {
          id
          content
          authorId
          author {
            id
            firstName
            lastName
            company
            title
            email
            avatar
          }
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
          user {
            firstName
            lastName
          }
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

export const listSessionsForReservation = /* GraphQL */ `
  query ListSessionsForReservation($filter: ModelSessionFilterInput, $limit: Int, $nextToken: String) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
      }
      nextToken
    }
  }
`

export const getSessionRaisedHands = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      pinnedMessageId
      raisedHands {
        items {
          id
          userId
          sessionId
          user {
            firstName
            lastName
            avatar
            email
          }
          dismissed
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

export const getSessionPolls = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      pinnedMessageId
      polls {
        items {
          id
          sessionId
          active
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
      createdAt
      updatedAt
    }
  }
`

export const getSessionQuestions = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      pinnedMessageId
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
      createdAt
      updatedAt
    }
  }
`

export const getSessionQuestionsAndPolls = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      pinnedMessageId
      questions {
        items {
          id
          userId
          sessionId
          user {
            firstName
            lastName
            avatar
          }
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
      createdAt
      updatedAt
    }
  }
`
export const userByEmailBase = /* GraphQL */ `
  query UserByEmail(
    $email: String
    $sortDirection: ModelSortDirection
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(email: $email, sortDirection: $sortDirection, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        firstName
        lastName
        phoneNumber
        email
        avatar
        title
        company
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
        conversations {
          items {
            userId
            conversationId
            conversation {
              associated {
                items {
                  userId
                  user {
                    firstName
                    lastName
                    online
                  }
                }
              }
              members
            }
          }
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getAttendeeInfo = /* GraphQL */ `
  query GetAttendeeInfo($id: ID!) {
    getUser(id: $id) {
      id
      firstName
      lastName
      email
      avatar
      title
      company
    }
  }
`
export const getRaisedHandsByDismissed = /* GraphQL */ `
  query RaisedHandByDismissed(
    $sessionId: ID
    $dismissed: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRaisedHandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    raisedHandByDismissed(
      sessionId: $sessionId
      dismissed: $dismissed
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userId
        sessionId
        user {
          id
          firstName
          lastName
          email
          title
          createdAt
          updatedAt
        }
        dismissed
        createdAt
        updatedAt
      }
    }
  }
`
export const getConversationWithAssociated = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
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
          user {
            firstName
            lastName
          }
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`

export const getSessionOverviewById = /* GraphQL */ `
  query GetSessionOverviewById($id: ID!) {
    getSession(id: $id) {
      id
      name
      description
      active
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
      participants {
        items {
          id
          userId
          sessionId
          userType
          createdAt
          updatedAt
        }
        nextItem
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
    }
  }
`
export const getConversationBase = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      members
      associated {
        items {
          id
          userId
          user {
            firstName
            lastName
          }
        }
        nextToken
      }
    }
  }
`
export const getSessionWithParticipants = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
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
      participants {
        items {
          id
          userId
          sessionId
          createdAt
          updatedAt
          user {
            firstName
            lastName
            email
            avatar
          }
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
