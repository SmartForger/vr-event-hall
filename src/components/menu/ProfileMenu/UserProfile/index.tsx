import React, { FC, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

// Plugins
import classNames from 'classnames'
import { I18n, Auth } from 'aws-amplify'
import { VariableSizeProps } from 'react-window'

// Components
import { PillButton } from 'components'

// Helpers
import { useAppState } from 'providers'
import { getUser } from 'graphql/queries'
import { updateUser } from 'graphql/mutations'
import { graphQLQuery, graphQLMutation } from 'graphql/helpers'

// Styles
import { Grid, Avatar, Typography, makeStyles, TextField, Button } from '@material-ui/core'

// Types
import { IUser } from 'types'

// Images
import profileBg from 'assets/userProfileBg.jpg'
import iconEditProfile from 'assets/icon-edit-profile.svg'

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
  toggleDrawer: () => void
  user?: IUser
}

export const UserProfile: FC<IUserProfileProps> = ({ user }) => {
  const classes = useStyles()
  const history = useHistory()

  const [loading, setLoading] = useState<boolean>(false)
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [profileInfo, setProfileInfo] = useState<IUser | undefined>(user)
  const [profileErrors, setProfileErrors] = useState<IProfileErrors>(initialProfileErrors)

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

      await graphQLMutation(updateUser, {
        id: profileInfo?.id,
        firstName: profileInfo?.firstName,
        lastName: profileInfo?.lastName,
        title: profileInfo?.title
      })
      setEditModeState(false)
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
    Auth.signOut()
    history.push('/')
  }

  const profileDisplay = (
    <>
      <img src={profileBg} alt='profile background' />
      <Avatar
        alt={`${profileInfo?.firstName} ${profileInfo?.lastName}`}
        src={`https://dx2ge6d9z64m9.cloudfront.net/public/${profileInfo?.avatar}`}
        className={classes.avatar}
      />
      <section className={classes.profileMain}>
        <div className={classes.name}>
          {profileInfo?.firstName} {profileInfo?.lastName}
        </div>

        <div className={classes.title}>
          <span>{profileInfo?.company}</span>
          <span className={classes.dotSeperator} />
          <span>{profileInfo?.title}</span>
        </div>
        <Button
          startIcon={<img src={iconEditProfile} alt='Edit profile' width='18px' />}
          onClick={() => setEditModeState(true)}
        >
          <Typography component='span' variant='subtitle2'>
            Edit Profile
          </Typography>
        </Button>

        <PillButton
          className={classes.logoutButton}
          loading={loading}
          type='submit'
          backgroundColor='transparent'
          onClick={() => logout()}
        >
          Log out
        </PillButton>
      </section>
    </>
  )

  const editModeDispaly = (
    <section className={classes.profileMain}>
      <Grid container alignItems='center' spacing={4}>
        <Grid item xs={4}>
          <Avatar
            alt={`${profileInfo?.firstName} ${profileInfo?.lastName}`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/${profileInfo?.avatar}`}
            className={classNames(classes.avatar, classes.avatarEdit)}
          />
        </Grid>
        {/* TODO: Implement upload image feature */}
        <Grid item xs={8} style={{ display: 'none' }}>
          <PillButton onClick={() => console.debug('Upload avatar')}>Upload image</PillButton>
        </Grid>
      </Grid>

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
        Close
      </PillButton>

      <PillButton
        className={classes.inlineButton}
        loading={loading}
        type='submit'
        onClick={() => updateUserData()}
        solid
      >
        Save
      </PillButton>
    </section>
  )

  return (
    <div className={classes.root}>
      {!editModeState && profileDisplay}
      {editModeState && editModeDispaly}
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: '-38px',
    width: '100%',
    height: '100%',
    maxWidth: 350,
    backgroundColor: theme.palette.background.paper,
    position: 'relative'
  },
  avatar: {
    marginLeft: 'calc(50% - 40px)',
    marginTop: '-50px',
    width: '76px',
    height: '76px',
    fontSize: '38px',
    position: 'absolute',
    backgroundColor: '#0088CE'
  },
  avatarEdit: {
    width: '100px',
    height: '100px',
    margin: '0',
    position: 'relative'
  },
  name: {
    margin: '4px',
    fontSize: '24px',
    fontFamily: '"Verizon-Bold"',
    textAlign: 'center'
  },
  title: {
    margin: '6px 0 36px',
    fontSize: '14px',
    textAlign: 'center'
  },
  logoutButton: {
    minWidth: '165px',
    position: 'absolute',
    bottom: '0',
    left: '0',
    right: '0',
    margin: '0 auto'
  },
  closeDrawer: {
    position: 'absolute',
    bottom: '30px',
    marginBottom: '50px'
  },
  dotSeperator: {
    position: 'relative',
    display: 'inline-block',
    top: '-4px',
    height: '4px',
    width: '4px',
    margin: '0px 12px',
    borderRadius: '50% 50%',
    backgroundColor: 'black'
  },
  profileMain: {
    color: 'black',
    height: 'calc(100% - 150px - 60px)',
    padding: '30px 16px'
  },
  input: {
    color: '#000',
    margin: '20px 0px',
    borderRadius: 0,
    '& .MuiInputBase-root': {
      backgroundColor: '#fff'
    },
    '& fieldset': {
      borderRadius: 0,
      borderColor: '#dadada',
      borderBottomColor: '#000'
    }
  },
  inlineButton: {
    height: '26px',
    fontSize: '12px',
    padding: '6px 14px',
    margin: '20px 10px 0 0'
  },
  footer: {
    bottom: 0,
    padding: '8px',
    width: '100%',
    display: 'flex',
    position: 'fixed',
    backgroundColor: '#000000',
    justifyContent: 'flex-start'
  },
  arrowIcon: {
    [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
      width: '10px'
    }
  }
}))
