/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null
  firstName: string
  lastName: string
  email: string
  phoneNumber?: string | null
  city: string
  title?: string | null
  company?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelUserConditionInput = {
  firstName?: ModelStringInput | null
  lastName?: ModelStringInput | null
  email?: ModelStringInput | null
  phoneNumber?: ModelStringInput | null
  city?: ModelStringInput | null
  title?: ModelStringInput | null
  company?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelUserConditionInput | null> | null
  or?: Array<ModelUserConditionInput | null> | null
  not?: ModelUserConditionInput | null
}

export type ModelStringInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export enum ModelAttributeTypes {
  binary = 'binary',
  binarySet = 'binarySet',
  bool = 'bool',
  list = 'list',
  map = 'map',
  number = 'number',
  numberSet = 'numberSet',
  string = 'string',
  stringSet = 'stringSet',
  _null = '_null'
}

export type ModelSizeInput = {
  ne?: number | null
  eq?: number | null
  le?: number | null
  lt?: number | null
  ge?: number | null
  gt?: number | null
  between?: Array<number | null> | null
}

export type UpdateUserInput = {
  id: string
  firstName?: string | null
  lastName?: string | null
  email?: string | null
  phoneNumber?: string | null
  city?: string | null
  title?: string | null
  company?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type DeleteUserInput = {
  id?: string | null
}

export type CreateConversationInput = {
  id?: string | null
  name: string
  members: Array<string>
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelConversationConditionInput = {
  name?: ModelStringInput | null
  members?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelConversationConditionInput | null> | null
  or?: Array<ModelConversationConditionInput | null> | null
  not?: ModelConversationConditionInput | null
}

export type UpdateConversationInput = {
  id: string
  name?: string | null
  members?: Array<string> | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type DeleteConversationInput = {
  id?: string | null
}

export type CreateMessageInput = {
  id?: string | null
  authorId?: string | null
  content: string
  messageConversationId: string
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelMessageConditionInput = {
  authorId?: ModelStringInput | null
  content?: ModelStringInput | null
  messageConversationId?: ModelIDInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelMessageConditionInput | null> | null
  or?: Array<ModelMessageConditionInput | null> | null
  not?: ModelMessageConditionInput | null
}

export type ModelIDInput = {
  ne?: string | null
  eq?: string | null
  le?: string | null
  lt?: string | null
  ge?: string | null
  gt?: string | null
  contains?: string | null
  notContains?: string | null
  between?: Array<string | null> | null
  beginsWith?: string | null
  attributeExists?: boolean | null
  attributeType?: ModelAttributeTypes | null
  size?: ModelSizeInput | null
}

export type UpdateMessageInput = {
  id: string
  authorId?: string | null
  content?: string | null
  messageConversationId?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type DeleteMessageInput = {
  id?: string | null
}

export type CreateConvoLinkInput = {
  id?: string | null
  convoLinkUserId?: string | null
  convoLinkConversationId: string
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelConvoLinkConditionInput = {
  convoLinkUserId?: ModelIDInput | null
  convoLinkConversationId?: ModelIDInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelConvoLinkConditionInput | null> | null
  or?: Array<ModelConvoLinkConditionInput | null> | null
  not?: ModelConvoLinkConditionInput | null
}

export type UpdateConvoLinkInput = {
  id: string
  convoLinkUserId?: string | null
  convoLinkConversationId?: string | null
  createdAt?: string | null
  updatedAt?: string | null
}

export type ModelUserFilterInput = {
  id?: ModelIDInput | null
  firstName?: ModelStringInput | null
  lastName?: ModelStringInput | null
  email?: ModelStringInput | null
  phoneNumber?: ModelStringInput | null
  city?: ModelStringInput | null
  title?: ModelStringInput | null
  company?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelUserFilterInput | null> | null
  or?: Array<ModelUserFilterInput | null> | null
  not?: ModelUserFilterInput | null
}

export type ModelConversationFilterInput = {
  id?: ModelIDInput | null
  name?: ModelStringInput | null
  members?: ModelStringInput | null
  createdAt?: ModelStringInput | null
  updatedAt?: ModelStringInput | null
  and?: Array<ModelConversationFilterInput | null> | null
  or?: Array<ModelConversationFilterInput | null> | null
  not?: ModelConversationFilterInput | null
}

export enum ModelSortDirection {
  ASC = 'ASC',
  DESC = 'DESC'
}

export type CreateUserMutationVariables = {
  input: CreateUserInput
  condition?: ModelUserConditionInput | null
}

export type CreateUserMutation = {
  createUser: {
    __typename: 'User'
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | null
    city: string
    title: string | null
    company: string | null
    conversations: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type UpdateUserMutationVariables = {
  input: UpdateUserInput
  condition?: ModelUserConditionInput | null
}

export type UpdateUserMutation = {
  updateUser: {
    __typename: 'User'
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | null
    city: string
    title: string | null
    company: string | null
    conversations: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type DeleteUserMutationVariables = {
  input: DeleteUserInput
  condition?: ModelUserConditionInput | null
}

export type DeleteUserMutation = {
  deleteUser: {
    __typename: 'User'
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | null
    city: string
    title: string | null
    company: string | null
    conversations: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type CreateConversationMutationVariables = {
  input: CreateConversationInput
  condition?: ModelConversationConditionInput | null
}

export type CreateConversationMutation = {
  createConversation: {
    __typename: 'Conversation'
    id: string
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    associated: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    name: string
    members: Array<string>
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type UpdateConversationMutationVariables = {
  input: UpdateConversationInput
  condition?: ModelConversationConditionInput | null
}

export type UpdateConversationMutation = {
  updateConversation: {
    __typename: 'Conversation'
    id: string
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    associated: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    name: string
    members: Array<string>
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type DeleteConversationMutationVariables = {
  input: DeleteConversationInput
  condition?: ModelConversationConditionInput | null
}

export type DeleteConversationMutation = {
  deleteConversation: {
    __typename: 'Conversation'
    id: string
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    associated: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    name: string
    members: Array<string>
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type CreateMessageMutationVariables = {
  input: CreateMessageInput
  condition?: ModelMessageConditionInput | null
}

export type CreateMessageMutation = {
  createMessage: {
    __typename: 'Message'
    id: string
    author: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null
    authorId: string | null
    content: string
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    messageConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type UpdateMessageMutationVariables = {
  input: UpdateMessageInput
  condition?: ModelMessageConditionInput | null
}

export type UpdateMessageMutation = {
  updateMessage: {
    __typename: 'Message'
    id: string
    author: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null
    authorId: string | null
    content: string
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    messageConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type DeleteMessageMutationVariables = {
  input: DeleteMessageInput
  condition?: ModelMessageConditionInput | null
}

export type DeleteMessageMutation = {
  deleteMessage: {
    __typename: 'Message'
    id: string
    author: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null
    authorId: string | null
    content: string
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    messageConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type CreateConvoLinkMutationVariables = {
  input: CreateConvoLinkInput
  condition?: ModelConvoLinkConditionInput | null
}

export type CreateConvoLinkMutation = {
  createConvoLink: {
    __typename: 'ConvoLink'
    id: string
    user: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    }
    convoLinkUserId: string | null
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    convoLinkConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type UpdateConvoLinkMutationVariables = {
  input: UpdateConvoLinkInput
  condition?: ModelConvoLinkConditionInput | null
}

export type UpdateConvoLinkMutation = {
  updateConvoLink: {
    __typename: 'ConvoLink'
    id: string
    user: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    }
    convoLinkUserId: string | null
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    convoLinkConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type GetUserQueryVariables = {
  id: string
}

export type GetUserQuery = {
  getUser: {
    __typename: 'User'
    id: string
    firstName: string
    lastName: string
    email: string
    phoneNumber: string | null
    city: string
    title: string | null
    company: string | null
    conversations: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListUsersQuery = {
  listUsers: {
    __typename: 'ModelUserConnection'
    items: Array<{
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type GetConversationQueryVariables = {
  id: string
}

export type GetConversationQuery = {
  getConversation: {
    __typename: 'Conversation'
    id: string
    messages: {
      __typename: 'ModelMessageConnection'
      nextToken: string | null
    } | null
    associated: {
      __typename: 'ModelConvoLinkConnection'
      nextToken: string | null
    } | null
    name: string
    members: Array<string>
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type ListConversationsQueryVariables = {
  filter?: ModelConversationFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type ListConversationsQuery = {
  listConversations: {
    __typename: 'ModelConversationConnection'
    items: Array<{
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type UserByEmailQueryVariables = {
  email?: string | null
  sortDirection?: ModelSortDirection | null
  filter?: ModelUserFilterInput | null
  limit?: number | null
  nextToken?: string | null
}

export type UserByEmailQuery = {
  userByEmail: {
    __typename: 'ModelUserConnection'
    items: Array<{
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null> | null
    nextToken: string | null
  } | null
}

export type OnCreateConvoLinkSubscriptionVariables = {
  convoLinkUserId: string
}

export type OnCreateConvoLinkSubscription = {
  onCreateConvoLink: {
    __typename: 'ConvoLink'
    id: string
    user: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    }
    convoLinkUserId: string | null
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    convoLinkConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}

export type OnCreateMessageSubscriptionVariables = {
  messageConversationId: string
}

export type OnCreateMessageSubscription = {
  onCreateMessage: {
    __typename: 'Message'
    id: string
    author: {
      __typename: 'User'
      id: string
      firstName: string
      lastName: string
      email: string
      phoneNumber: string | null
      city: string
      title: string | null
      company: string | null
      createdAt: string | null
      updatedAt: string | null
    } | null
    authorId: string | null
    content: string
    conversation: {
      __typename: 'Conversation'
      id: string
      name: string
      members: Array<string>
      createdAt: string | null
      updatedAt: string | null
    }
    messageConversationId: string
    createdAt: string | null
    updatedAt: string | null
  } | null
}
