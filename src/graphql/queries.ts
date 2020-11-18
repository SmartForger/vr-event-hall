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
          deleted
          recipientId
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
        onVideoCall
        online
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
          deleted
          recipientId
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
        recipientId
        createdAt
        updatedAt
      }
      icPinnedMessageId
      icPinnedMessage {
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
        recipientId
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
export const listSessions = /* GraphQL */ `
  query ListSessions($filter: ModelSessionFilterInput, $limit: Int, $nextToken: String) {
    listSessions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          recipientId
          createdAt
          updatedAt
        }
        icPinnedMessageId
        icPinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          recipientId
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
      nextToken
    }
  }
`
export const getSurveyQuestion = /* GraphQL */ `
  query GetSurveyQuestion($id: ID!) {
    getSurveyQuestion(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`
export const listSurveyQuestions = /* GraphQL */ `
  query ListSurveyQuestions($filter: ModelSurveyQuestionFilterInput, $limit: Int, $nextToken: String) {
    listSurveyQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getAdminUser = /* GraphQL */ `
  query GetAdminUser($id: ID!) {
    getAdminUser(id: $id) {
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
          recipientId
          createdAt
          updatedAt
        }
        icPinnedMessageId
        icPinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          recipientId
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
export const listAdminUsers = /* GraphQL */ `
  query ListAdminUsers($filter: ModelAdminUserFilterInput, $limit: Int, $nextToken: String) {
    listAdminUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          icId
          pinnedMessageId
          icPinnedMessageId
          qaActive
          presenterPins
          muted
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getPollAnswers = /* GraphQL */ `
  query GetPollAnswers($id: ID!) {
    getPollAnswers(id: $id) {
      id
      pollId
      userId
      answer
      createdAt
      updatedAt
    }
  }
`
export const listPollAnswerss = /* GraphQL */ `
  query ListPollAnswerss($filter: ModelPollAnswersFilterInput, $limit: Int, $nextToken: String) {
    listPollAnswerss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pollId
        userId
        answer
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getEventConfig = /* GraphQL */ `
  query GetEventConfig($id: ID!) {
    getEventConfig(id: $id) {
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
export const getRaisedHand = /* GraphQL */ `
  query GetRaisedHand($id: ID!) {
    getRaisedHand(id: $id) {
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
export const getSessionQuestion = /* GraphQL */ `
  query GetSessionQuestion($id: ID!) {
    getSessionQuestion(id: $id) {
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
export const listSessionQuestions = /* GraphQL */ `
  query ListSessionQuestions($filter: ModelSessionQuestionFilterInput, $limit: Int, $nextToken: String) {
    listSessionQuestions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`
export const getSessionPoll = /* GraphQL */ `
  query GetSessionPoll($id: ID!) {
    getSessionPoll(id: $id) {
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
export const listSessionPolls = /* GraphQL */ `
  query ListSessionPolls($filter: ModelSessionPollFilterInput, $limit: Int, $nextToken: String) {
    listSessionPolls(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`
export const getSessionPollAnswer = /* GraphQL */ `
  query GetSessionPollAnswer($id: ID!) {
    getSessionPollAnswer(id: $id) {
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
export const listSessionPollAnswers = /* GraphQL */ `
  query ListSessionPollAnswers($filter: ModelSessionPollAnswerFilterInput, $limit: Int, $nextToken: String) {
    listSessionPollAnswers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          onVideoCall
          online
          createdAt
          updatedAt
        }
        answer
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const getVideoChatInvite = /* GraphQL */ `
  query GetVideoChatInvite($id: ID!) {
    getVideoChatInvite(id: $id) {
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
export const listVideoChatInvites = /* GraphQL */ `
  query ListVideoChatInvites($filter: ModelVideoChatInviteFilterInput, $limit: Int, $nextToken: String) {
    listVideoChatInvites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
          onVideoCall
          online
          createdAt
          updatedAt
        }
        declined
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
        onVideoCall
        online
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const sessionByConversationId = /* GraphQL */ `
  query SessionByConversationId(
    $conversationId: ID
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSessionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    sessionByConversationId(
      conversationId: $conversationId
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
          recipientId
          createdAt
          updatedAt
        }
        icPinnedMessageId
        icPinnedMessage {
          id
          content
          authorId
          conversationId
          deleted
          recipientId
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
        recipientId
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
        recipientId
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
        recipientId
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
        recipientId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const answersByPoll = /* GraphQL */ `
  query AnswersByPoll(
    $pollId: String
    $sortDirection: ModelSortDirection
    $filter: ModelPollAnswersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    answersByPoll(
      pollId: $pollId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        pollId
        userId
        answer
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const raisedHandByDate = /* GraphQL */ `
  query RaisedHandByDate(
    $sessionId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRaisedHandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    raisedHandByDate(
      sessionId: $sessionId
      createdAt: $createdAt
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
        dismissed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const raisedHandByDismissed = /* GraphQL */ `
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
        dismissed
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
export const questionByDate = /* GraphQL */ `
  query QuestionByDate(
    $sessionId: ID
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSessionQuestionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    questionByDate(
      sessionId: $sessionId
      createdAt: $createdAt
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
        answered
        content
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`
