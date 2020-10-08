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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser($input: UpdateUserInput!, $condition: ModelUserConditionInput) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser($input: DeleteUserInput!, $condition: ModelUserConditionInput) {
    deleteUser(input: $input, condition: $condition) {
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
