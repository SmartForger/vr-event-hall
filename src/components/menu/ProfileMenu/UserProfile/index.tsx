/* eslint-disable react-hooks/exhaustive-deps */
import React, { FC, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'

import Promise from 'bluebird'
import { Grid, Avatar, Theme, Typography, makeStyles, TextField, Button, IconButton, Switch } from '@material-ui/core'
import classnames from 'classnames'

// Plugins
import classNames from 'classnames'
import { I18n, Auth, Storage } from 'aws-amplify'
import { VariableSizeProps } from 'react-window'

// Components
import { PillButton } from 'components'
import { ResetConfirm } from './ResetConfirm'

// Helpers
import { graphQLQuery, graphQLSubscription, graphQLMutation } from 'graphql/helpers'
import { getUser, listSessions, listAdminUsers } from 'graphql/queries'
import { updateUser, createAdminLink, deleteAdminLink } from 'graphql/mutations'
import { updateUserBase } from 'graphql/customMutations'
import { useAppState } from 'providers'

// Types
import { IUser, ISession } from 'types'

// Images
import profileBg from 'assets/userProfileBg.jpg'
import iconEditProfile from 'assets/icon-edit-profile.svg'
import { UploadButton } from 'components/shared/controls/UploadButton'
import { TemporaryAlert } from 'components/shared/alerts'
import { AlertProps } from '@material-ui/lab'

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

interface TemporaryMessage {
  message: string
  severity: AlertProps['severity']
}

export const UserProfile: FC<IUserProfileProps> = ({ user }) => {
  const classes = useStyles()
  const history = useHistory()
  const {
    appState: { user: authedUser },
    setUser
  } = useAppState()

  const [showSecretManageTools, setSecretManagementToolsVisible] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(false)
  const [editModeState, setEditModeState] = useState<boolean>(false)
  const [profileInfo, setProfileInfo] = useState<IUser | undefined>(user)
  const [profileErrors, setProfileErrors] = useState<IProfileErrors>(initialProfileErrors)
  const [file, setFile] = useState<File>()
  const [avatarUrl, setAvatarUrl] = useState<string>()
  const [isUploadingAvatar, setIsUploadingAvatar] = useState<boolean>(false)
  const [readyForProfileUpdate, setReadyForProfileUpdate] = useState<boolean>(true)
  const [temporaryMessage, setTemporaryMessage] = useState<TemporaryMessage>({ message: '', severity: 'success' })
  const [showModal, setShowModal] = useState<boolean>(false)

  const listRef = useRef<VariableSizeProps>()

  /**
   * Avatar Upload
   */
  useEffect(() => {
    let cancelled = false

    if (file && profileInfo) {
      const avatar = `${profileInfo.id}.${file.type.split('/')[1]}`
      setIsUploadingAvatar(true)

      Promise.all([
        Storage.put(avatar, file, { level: 'public', contentType: file.type }),
        graphQLMutation(updateUser, {
          id: profileInfo.id,
          avatar
        })
      ])
        .then(() => {
          if (!cancelled) {
            // Force avatar url refresh
            setReadyForProfileUpdate(true)
            setTemporaryMessage({
              message: 'Image updated successfully!',
              severity: 'success'
            })
          }
        })
        .catch(() => {
          if (!cancelled) {
            setTemporaryMessage({
              message: 'We ran into an error uploading your image. Please try again.',
              severity: 'error'
            })
          }
        })
        .finally(() => {
          if (!cancelled) {
            setIsUploadingAvatar(false)
            setFile(undefined)
          }
        })
    }

    return () => {
      // Prevent state updates if user closes drawer while uploading file
      cancelled = true
    }
  }, [file])

  useEffect(() => {
    let cancelled = false

    if (readyForProfileUpdate && profileInfo?.avatar) {
      Storage.get(profileInfo.avatar)
        .then(updatedAvatarUrl => {
          if (!cancelled && typeof updatedAvatarUrl === 'string') {
            setAvatarUrl(updatedAvatarUrl)
            setReadyForProfileUpdate(false)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setReadyForProfileUpdate(false)
          }
        })
    }

    return () => {
      cancelled = true
    }
  }, [readyForProfileUpdate])

  const getProfileInfo = async (userId: string) => {
    const foundUser = await graphQLQuery(getUser, 'getUser', { id: userId })
    setProfileInfo(foundUser)
  }

  useEffect(() => {
    if (user?.id) {
      getProfileInfo(user!.id)
    }
  }, [editModeState])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      updateUserData()
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setProfileInfo({
      ...profileInfo,
      [target.name]: target.value
    })
  }

  const updateUserData = async () => {
    try {
      setLoading(true)
      const updatedUser = await graphQLMutation(
        updateUserBase,
        {
          id: profileInfo?.id,
          firstName: profileInfo?.firstName,
          lastName: profileInfo?.lastName,
          title: profileInfo?.title,
          online: profileInfo?.online
        },
        'updateUser'
      )
      setUser(updatedUser)
      await getProfileInfo(profileInfo!.id as string)
      setEditModeState(false)
      setLoading(false)
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

  // allows MVRK users to change their own permissions
  // HIDDEN -- must click the "company | title" line,
  // then hit edit to see options
  const changePermissions = async (desiredAdminType: string) => {
    setLoading(true)
    try {
      const sessions = await graphQLQuery(listSessions, 'listSessions', {})
      let permissions = await graphQLQuery(listAdminUsers, 'listAdminUsers', {
        userId: authedUser?.id
      })

      // delete the previous permisions
      await Promise.mapSeries(permissions, p => {
        if (p.userId === authedUser?.id) {
          return graphQLMutation(deleteAdminLink, {
            id: p.id
          })
        }
        return Promise.resolve()
      })
      // add the new permissions
      if (desiredAdminType === 'sme' || desiredAdminType === 'moderator') {
        await Promise.mapSeries(sessions, async (sess: ISession) => {
          await graphQLMutation(createAdminLink, {
            sessionId: sess?.id,
            userId: authedUser?.id,
            userType: desiredAdminType
          })
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // online is now used for private mode instead of online/offline
    // graphQLMutation(updateUser, {
    //   id: profileInfo?.id,
    //   online: false
    // })

    Auth.signOut()
    history.push('/')
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (files && files[0]) {
      const file = files[0]

      if (['image/jpeg', 'image/png'].includes(file.type)) {
        setFile(file)
      } else {
        setTemporaryMessage({
          message: 'Invalid file type.',
          severity: 'error'
        })
      }
    }
  }

  const handleResetImage = () => {
    let cancelled = false

    if (avatarUrl && profileInfo) {
      setIsUploadingAvatar(true)

      Promise.all([
        graphQLMutation(updateUser, {
          id: profileInfo.id,
          avatar: ''
        })
      ])
        .then(() => {
          if (!cancelled) {
            setTemporaryMessage({
              message: 'Image reset successfully!',
              severity: 'success'
            })
          }
        })
        .catch(() => {
          if (!cancelled) {
            setTemporaryMessage({
              message: 'We ran into an error resetting your image. Please try again.',
              severity: 'error'
            })
          }
        })
        .finally(() => {
          if (!cancelled) {
            setIsUploadingAvatar(false)
            setProfileInfo({ ...profileInfo, avatar: '' })
            setAvatarUrl('')
            setShowModal(false)
          }
        })
    }

    return () => {
      // Prevent state updates if user closes drawer while uploading file
      cancelled = true
    }
  }

  useEffect(() => {
    if (profileInfo?.online !== authedUser?.online) {
      updateUserData()
    }
  }, [profileInfo?.online])

  const toggleOnlineStatus = (event, checked) => {
    setProfileInfo({ ...profileInfo, online: checked })
  }

  const profileDisplay = (
    <>
      <img src={profileBg} alt='profile background' />
      <Avatar alt={`${profileInfo?.firstName} ${profileInfo?.lastName}`} src={avatarUrl} className={classes.avatar} />
      <section className={classes.profileMain}>
        <div className={classes.name}>
          {profileInfo?.firstName} {profileInfo?.lastName}
        </div>

        <div className={classes.title} onClick={() => setSecretManagementToolsVisible(true)}>
          <span>{profileInfo?.company}</span>
          <span className={classes.dotSeperator} />
          <span>{profileInfo?.title}</span>
        </div>

        <div className={classes.liveChatContainer}>
          <div className={classes.liveChat}>
            <Typography>Live Chat</Typography>
          </div>
          <div>
            {profileInfo?.id === authedUser?.id && (
              <Switch color='primary' checked={profileInfo?.online || false} onChange={toggleOnlineStatus} />
            )}
          </div>
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
            src={avatarUrl}
            className={classNames(classes.avatar, classes.avatarEdit)}
          />
        </Grid>
        <Grid item xs={8}>
          <div className={classes.uploadContainer}>
            <UploadButton accept='image/jpeg, image/png' loading={isUploadingAvatar} onChange={handleFileChange}>
              {isUploadingAvatar ? 'Uploading...' : 'Upload image'}
            </UploadButton>
            {avatarUrl && (
              <Button className={classes.resetButton} size='small' onClick={() => setShowModal(true)}>
                Reset image
              </Button>
            )}
          </div>
        </Grid>
      </Grid>

      <TemporaryAlert
        message={temporaryMessage.message}
        onClose={() => setTemporaryMessage({ message: '', severity: undefined })}
        severity={temporaryMessage.severity}
      />

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
      {showSecretManageTools && authedUser?.email?.match(/@mvrk.co$/i) && (
        <>
          <h5>Permissions (Visible to MVRK Users Only)</h5>
          <Button className={classes.permissionButton} onClick={() => changePermissions('moderator')}>
            Make Me Moderator (all sessions)
          </Button>
          <Button className={classes.permissionButton} onClick={() => changePermissions('sme')}>
            Make Me Presenter (all sessions)
          </Button>
          <Button className={classes.permissionButton} onClick={() => changePermissions('user')}>
            Make Me Normal (all sessions)
          </Button>
        </>
      )}
      <Grid item xs={12}>
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
          disabled={!profileInfo?.lastName || !profileInfo.firstName}
          onClick={() => updateUserData()}
          solid
        >
          Save
        </PillButton>
      </Grid>
    </section>
  )

  return (
    <div className={classes.root}>
      {!editModeState && profileDisplay}
      {editModeState && editModeDispaly}
      {showModal && <ResetConfirm showModal={showModal} setShowModal={setShowModal} onSubmit={handleResetImage} />}
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
  permissionButton: {
    margin: '8px 0px'
  },
  inlineButton: {
    fontFamily: 'Verizon-Regular',
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
  },
  liveChatContainer: {
    height: 42,
    backgroundColor: '#F6F6F6',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16
  },
  liveChat: {
    flex: 1
  },
  switchColor: {
    color: 'red'
  },
  onlineIndicator: {
    position: 'absolute'
  },
  uploadContainer: {
    position: 'relative'
  },
  resetButton: {
    fontFamily: 'Verizon-Regular',
    fontSize: '12px',
    position: 'absolute',
    padding: '2px 10px',
    margin: 0,
    bottom: 6,
    right: 55
  }
}))
