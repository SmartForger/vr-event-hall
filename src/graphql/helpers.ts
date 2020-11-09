/* tslint:disable */
/* eslint-disable */
import { API, graphqlOperation } from 'aws-amplify'
import { createConversation, createConvoLink } from './mutations'
import { IUser } from 'types'

export const graphQLQuery = async (query: string, queryName: string, options: any = {}) => {
  if (options.email) {
    options.email = options.email.toLowerCase()
  }
  const { data }: any = await API.graphql(graphqlOperation(query, options))
  // checks for list queries vs individual item queries
  if (data[queryName].items) {
    if (queryName === 'userByEmail') {
      return data[queryName].items[0]
    }
    return data[queryName].items
  }
  return data[queryName]
}

export const graphQLMutation = async (mutation: string, input: any) => {
  return await API.graphql(graphqlOperation(mutation, { input }))
}

export const graphQLSubscription = (subscription: string, options: any, callback: (d: any) => void) => {
  // ignoring for type issue with `.subscribe`
  // @ts-ignore
  return API.graphql(graphqlOperation(subscription, options)).subscribe({
    next: ({ value: { data, errors } }) => {
      console.log(errors)
      callback(data)
    }
  })
}

/**
 * Create Conversation
 *
 * We need to create a naming convention for conversation name
 *
 * On Create for Direct Messages we need to grab the current users id from redux, right now just doing it on request,
 * and the users id they select to message. Add those as the 'members'. That creates a conversation object. We then use
 * id of the conversation to relate the 2 users by creating a convoLink object. This is the "relational" piece of Dynamo.
 * Then we can use the conversation id to post messages too and to subscribe.
 */
export const createNewConversation = async (primaryUser: IUser, secondaryUser: IUser, name: string) => {
  try {
    // Typescript types issue here that is a known issue on amplify
    // @ts-ignore
    const {
      // Typescript types issue here that is a known issue on amplify
      // @ts-ignore
      data: {
        createConversation: { id: conversationId }
      }
    } = await graphQLMutation(createConversation, {
      name,
      members: [primaryUser.id, secondaryUser.id]
    })

    await Promise.all([
      graphQLMutation(createConvoLink, {
        userId: primaryUser.id,
        conversationId
      }),
      graphQLMutation(createConvoLink, {
        userId: secondaryUser.id,
        conversationId
      })
    ])

    return conversationId
  } catch (err) {
    return err
  }
}
