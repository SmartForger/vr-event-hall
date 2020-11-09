import React, { FC, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react'
import { I18n, Storage } from 'aws-amplify'
import { VariableSizeProps } from 'react-window'
import { Avatar, Theme, Typography, makeStyles, TextField, Button } from '@material-ui/core'
import CreateIcon from '@material-ui/icons/Create'

import { PillButton } from 'components'

import { graphQLQuery, graphQLSubscription, graphQLMutation } from 'graphql/helpers'
import { getUser } from 'graphql/queries'
import { updateUser } from 'graphql/mutations'
import { useAppState } from 'providers'
import { AnchorType, ISubscriptionObject, IUser, ToggleDrawer } from 'types'

import profileBg from 'assets/userProfileBg.png'

interface IProfileErrors {
  firstName: string
  lastName: string
  title: string
}

const initialProfileErrors: IProfileErrors = {
  firstName: '',
  lastName: '',
  title: ''
}

interface IUserProfileProps {
  internal?: boolean
  toggleDrawer?: ToggleDrawer
  user?: IUser
}

export const UserProfile: FC<IUserProfileProps> = ({ toggleDrawer, user }) => {
  const classes = useStyles()
  const [loading, setLoading] = useState<boolean>(false)
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [profileInfo, setProfileInfo] = useState<IUser | undefined>(user)
  const [profileErrors, setProfileErrors] = useState<IProfileErrors>(initialProfileErrors)

  const { appState } = useAppState()
  const authedUser = appState.user

  let [users, setUsers] = useState<IUser[]>([])
  const listRef = useRef<VariableSizeProps>()

  const getProfileInfo = async (userId: string) => {
    const foundUser = await graphQLQuery(getUser, 'getUser', { id: userId })
    setProfileInfo(foundUser)
  }

  useEffect(() => {
    if (user?.id) {
      getProfileInfo(user!.id)
    }
  }, [editModeState])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setProfileInfo({
      ...profileInfo,
      [target.name]: target.value
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateUserData()
    }
  }

  const handleSubmit = (e: FormEvent<Element>) => {
    e.preventDefault()
  }

  const updateUserData = async () => {
    try {
      // if (acceptedFiles && acceptedFiles[0]) {
      //   const file = acceptedFiles[0]
      //   const avatar = `${userInfo.id}.${file.type.split('/')[1]}`

      //   // eslint-disable-next-line
      //   await Promise.all([
      //     Storage.put(avatar, file, { level: 'public', contentType: file.type }),
      //     graphQLMutation(createUser, {
      //       ...userInfo,
      //       email: lowerCaseEmail,
      //       avatar
      //     })
      //   ])
      // } else {
      //   await graphQLMutation(createUser, { ...userInfo, email: lowerCaseEmail })
      // }

      await graphQLMutation(updateUser, { ...profileInfo })
    } catch (e) {
      console.log(e)
      return
    }
  }

  const profileFormHasErrors = (): boolean => {
    const errorObj: IProfileErrors = {
      firstName: profileInfo?.firstName ? I18n.get('requiredField') : '',
      lastName: profileInfo?.lastName ? I18n.get('requiredField') : '',
      title: ''
    }
    const hasErrors = Object.keys(errorObj).some(key => errorObj[key] !== '')

    if (hasErrors) {
      setProfileErrors(errorObj)
      return true
    }

    return false
  }

  const saveUser = async () => {
    const hasErrors = profileFormHasErrors()
    if (!hasErrors) {
      setLoading(true)
      try {
        await updateUserData()
        setEditModeState(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const logout = () => {
    // TODO: add logout
    console.log('logging out')
  }

  const profileDisplay = (
    <>
      <div className={classes.name}>
        {profileInfo?.firstName} {profileInfo?.lastName}
      </div>

      <div className={classes.title}>
        <span>{profileInfo?.company}</span>
        <span className={classes.dotSeperator} />
        <span>{profileInfo?.title}</span>
      </div>

      <Button startIcon={<CreateIcon />} onClick={() => setEditModeState(true)}>
        Edit Profile
      </Button>

      <PillButton className={classes.logoutButton} loading={loading} type='submit' onClick={() => logout()} solid>
        {I18n.get('logout')}
      </PillButton>
    </>
  )

  const editModeDispaly = (
    <>
      <TextField
        variant='outlined'
        label={I18n.get('firstName')}
        error={!!profileErrors.firstName}
        helperText={profileErrors.firstName}
        onFocus={() => setProfileErrors({ ...profileErrors, firstName: '' })}
        fullWidth
        defaultValue={profileInfo?.firstName}
        className={classes.input}
        type='text'
        name='firstName'
        required
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <TextField
        variant='outlined'
        label={I18n.get('lastName')}
        error={!!profileErrors.lastName}
        helperText={profileErrors.lastName}
        onFocus={() => setProfileErrors({ ...profileErrors, lastName: '' })}
        fullWidth
        defaultValue={profileInfo?.lastName}
        className={classes.input}
        type='text'
        name='lastName'
        required
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <TextField
        variant='outlined'
        label={I18n.get('title')}
        error={!!profileErrors.title}
        helperText={profileErrors.title}
        onFocus={() => setProfileErrors({ ...profileErrors, title: '' })}
        fullWidth
        defaultValue={profileInfo?.title}
        className={classes.input}
        type='text'
        name='title'
        required
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />

      <PillButton
        className={classes.inlineButton}
        loading={loading}
        type='submit'
        onClick={() => setEditModeState(false)}
      >
        {I18n.get('close')}
      </PillButton>

      <PillButton
        className={classes.inlineButton}
        loading={loading}
        type='submit'
        onClick={() => updateUserData()}
        solid
      >
        {I18n.get('save')}
      </PillButton>
    </>
  )
  return (
    <>
      <img src={profileBg} alt='profile background' />
      <Avatar
        alt={`${profileInfo?.firstName} ${profileInfo?.lastName}`}
        src={`https://dx2ge6d9z64m9.cloudfront.net/public/${profileInfo?.avatar}`}
        className={classes.avatar}
      />
      <section className={classes.profileMain}>
        {!editModeState && profileDisplay}
        {editModeState && editModeDispaly}
      </section>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100%',
    maxWidth: 350,
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  },
  avatar: {
    marginLeft: 'calc(50% - 40px)',
    marginTop: '-40px',
    width: '80px',
    height: '80px'
  },
  name: {
    fontSize: '26px',
    textAlign: 'center'
  },
  logoutButton: {
    position: 'relative',
    bottom: '30px'
  },
  title: {
    fontSize: '16px',
    textAlign: 'center'
  },
  dotSeperator: {
    position: 'relative',
    display: 'inline-block',
    height: '4px',
    width: '4px',
    borderRadius: '50% 50%',
    backgroundColor: 'black',
    margin: '10px 12px 0px 12px'
  },
  profileMain: {
    color: 'black'
  },
  input: {
    color: '#000',
    borderRadius: 0,
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& label': {
      color: theme.palette.grey[500]
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  },
  inlineButton: {
    color: '#000',
    margin: '0 .5rem',
    fontFamily: 'Verizon-Regular',
    textDecoration: 'underline'
  }
}))
