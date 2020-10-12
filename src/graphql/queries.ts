/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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
export const listUsers = /* GraphQL */ `
  query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getConversation = /* GraphQL */ `
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
export const listConversations = /* GraphQL */ `
  query ListConversations($filter: ModelConversationFilterInput, $limit: Int, $nextToken: String) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getSession = /* GraphQL */ `
  query GetSession($id: ID!) {
    getSession(id: $id) {
      id
      name
      presenter
      description
      createdAt
      updatedAt
    }
  }
`
export const listSessions = /* GraphQL */ `
  query ListSessions($filter: ModelSessionFilterInput, $limit: Int, $nextToken: String) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        presenter
        description
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const userByEmail = /* GraphQL */ `
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
      nextToken
    }
  }
`
export const messageByAuthor = /* GraphQL */ `
  query MessageByAuthor(
    $authorId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messageByAuthor(
      authorId: $authorId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`
export const messageByAuthorByDate = /* GraphQL */ `
  query MessageByAuthorByDate(
    $authorId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messageByAuthorByDate(
      authorId: $authorId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`
export const messageByConversation = /* GraphQL */ `
  query MessageByConversation(
    $conversationId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messageByConversation(
      conversationId: $conversationId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`
export const messageByConversationDate = /* GraphQL */ `
  query MessageByConversationDate(
    $conversationId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messageByConversationDate(
      conversationId: $conversationId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`
