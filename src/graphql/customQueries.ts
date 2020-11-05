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
            firstName
            lastName
            company
            title
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
        email
        avatar
        title
        company
        activeState
        onVideoCall
        conversations {
          items {
            conversation {
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
