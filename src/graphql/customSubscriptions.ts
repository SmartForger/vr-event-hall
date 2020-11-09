export const onCreateMessageWithAuthor = /* GraphQL */ `
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
      }
      conversationId
      deleted
      createdAt
      updatedAt
    }
  }
`

export const onUpdateMessageWithAuthor = /* GraphQL */ `
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
      }
      conversationId
      deleted
      createdAt
      updatedAt
    }
  }
`

export const onCreateGlobalMessageMin = /* GraphQL */ `
  subscription OnCreateGlobalMessageMin {
    onCreateGlobalMessage {
      id
      conversationId
      deleted
      createdAt
      updatedAt
    }
  }
`
