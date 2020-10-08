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
        phoneNumber
        company
        companySize
        companyAddress1
        companyCity
        companyState
        companyPostalCode
        avatar
        title
        conversations {
          nextToken
        }
        messages {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($conversationId: ID!) {
    onCreateMessage(conversationId: $conversationId) {
      id
      content
      authorId
      conversationId
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
      conversationId
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
      phoneNumber
      company
      companySize
      companyAddress1
      companyCity
      companyState
      companyPostalCode
      avatar
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
      createdAt
      updatedAt
    }
  }
`
