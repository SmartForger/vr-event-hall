import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { I18n, Storage } from 'aws-amplify'
import {
  TextField,
  makeStyles,
  Grid,
  Theme,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Icon
} from '@material-ui/core'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { useDropzone } from 'react-dropzone'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

import { PillButton } from 'components'
import { AuthFlowSteps, IUser, IOption } from 'types'
import { States, validatePhoneNumber, validateZip, validateNonNumeric } from 'helpers'
import { graphQLMutation } from 'graphql/helpers'
import { createUser } from 'graphql/mutations'

interface RegistrationProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
  setUser: (user: IUser) => void
}
interface IPersonalRegErrors {
  firstName: string
  lastName: string
  phoneNumber: string
  title: string
  address1: string
  city: string
  state: string
  postalCode: string
}

interface ICompanyRegErrors {
  company: string
  companySize: string
  companyAddress1: string
  companyCity: string
  companyState: string
  companyPostalCode: string
}

export const Registration: FC<RegistrationProps> = ({ userEmail, setAuthState, setUser }) => {
  const classes = useStyles()
  const initialUser: IUser = {
    id: uuid(),
    firstName: '',
    lastName: '',
    email: userEmail,
    phoneNumber: '',
    title: '',
    company: '',
    companySize: '',
    companyAddress1: '',
    companyCity: '',
    companyState: '',
    companyPostalCode: '',
    address1: '',
    city: '',
    state: '',
    postalCode: ''
  }
  const initialPersonalErrors: IPersonalRegErrors = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    title: '',
    address1: '',
    city: '',
    state: '',
    postalCode: ''
  }
  const initialCompanyErrors: ICompanyRegErrors = {
    company: '',
    companySize: '',
    companyAddress1: '',
    companyCity: '',
    companyState: '',
    companyPostalCode: ''
  }

  enum RegSection {
    personal,
    company
  }

  const [userInfo, setUserInfo] = useState<IUser>(initialUser)
  const [activeRegSection, setActiveRegSection] = useState<RegSection>(RegSection.personal)
  const [loading, setLoading] = useState<boolean>(false)
  const [personalErrors, setPersonalErrors] = useState<IPersonalRegErrors>(initialPersonalErrors)
  const [companyErrors, setCompanyErrors] = useState<ICompanyRegErrors>(initialCompanyErrors)

  useEffect(() => {
    if (userEmail) {
      setUserInfo({ ...userInfo, email: userEmail })
    }
    // eslint-disable-next-line
  }, [userEmail])

  useEffect(() => {
    return () => {
      setUserInfo(initialUser)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    accept: 'image/jpeg, image/png'
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setUserInfo({
      ...userInfo,
      [target.name]: target.value
    })
  }

  const createNewUser = async () => {
    const lowerCaseEmail: string = userInfo.email?.toLowerCase() || ''
    try {
      if (acceptedFiles && acceptedFiles[0]) {
        const file = acceptedFiles[0]
        const avatar = `${userInfo.id}.${file.type.split('/')[1]}`

        // eslint-disable-next-line
        await Promise.all([
          Storage.put(avatar, file, { level: 'public', contentType: file.type }),
          graphQLMutation(createUser, {
            ...userInfo,
            email: lowerCaseEmail,
            avatar
          })
        ])
      } else {
        await graphQLMutation(createUser, { ...userInfo, email: lowerCaseEmail })
      }
    } catch (e) {
      console.log(e)
      return
    }
  }

  const sendIntegrateData = async () => {
    try {
      const response = await axios({
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        url: 'https://f1chjtarbg.execute-api.us-east-1.amazonaws.com/prod/integrate',
        data: {
          user: { ...userInfo }
        }
      })
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

  const personalFormHasErrors = (): boolean => {
    const errorObj: IPersonalRegErrors = {
      firstName: !userInfo.firstName ? I18n.get('requiredField') : '',
      lastName: !userInfo.lastName ? I18n.get('requiredField') : '',
      phoneNumber: !userInfo.phoneNumber
        ? I18n.get('requiredField')
        : !validatePhoneNumber(userInfo.phoneNumber as string)
        ? I18n.get('invalidPhone')
        : '',
      // temporarily not required
      title: '',
      // no longer required
      address1: '',
      // no longer required
      city: /\S+/g.test(userInfo.city || '')
        ? !validateNonNumeric(userInfo.city as string)
          ? I18n.get('invalidCity')
          : ''
        : '',
      // no longer required
      state: '',
      // no longer required
      postalCode: /\S+/g.test(userInfo.postalCode || '')
        ? !validateZip(userInfo.postalCode as string)
          ? I18n.get('invalidZip')
          : ''
        : ''
    }
    const hasErrors = Object.keys(errorObj).some(key => errorObj[key] !== '')

    if (hasErrors) {
      setPersonalErrors(errorObj)
      return true
    }

    return false
  }

  const companyFormHasErrors = (): boolean => {
    const errorObj: ICompanyRegErrors = {
      company: !userInfo.company ? I18n.get('requiredField') : '',
      companySize: !userInfo.companySize ? I18n.get('requiredField') : '',
      companyAddress1: !userInfo.companyAddress1 ? I18n.get('requiredField') : '',
      companyCity: !userInfo.companyCity
        ? I18n.get('requiredField')
        : !validateNonNumeric(userInfo.companyCity as string)
        ? I18n.get('invalidCity')
        : '',
      companyState: !userInfo.companyState ? I18n.get('requiredField') : '',
      companyPostalCode: !userInfo.companyPostalCode
        ? I18n.get('requiredField')
        : !validateZip(userInfo.companyPostalCode as string)
        ? I18n.get('invalidZip')
        : ''
    }

    const hasErrors = Object.keys(errorObj).some(key => errorObj[key] !== '')

    if (hasErrors) {
      setCompanyErrors(errorObj)
      return true
    }

    return false
  }

  const submitUser = async () => {
    const hasErrors = companyFormHasErrors() || personalFormHasErrors()
    if (!hasErrors) {
      setLoading(true)
      try {
        await createNewUser()
        await sendIntegrateData()
        // TODO: Remove later
        setAuthState(AuthFlowSteps.BreakoutSessions)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const advanceToCompanyForm = async () => {
    const hasErrors = personalFormHasErrors()
    if (!hasErrors) {
      setActiveRegSection(RegSection.company)
      setUserInfo({
        ...initialUser,
        ...userInfo
      })
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      activeRegSection === RegSection.company ? submitUser() : advanceToCompanyForm()
    }
  }

  // registration - part 1 - personal info
  const personalRegForm = (
    <>
      <Grid item>
        <Typography variant='h2' className={classes.heading} paragraph>
          <span dangerouslySetInnerHTML={{ __html: I18n.get('joinUs') }}></span>
        </Typography>
      </Grid>

      <Grid item container spacing={2}>
        <Grid item xs={12}>
          {acceptedFiles[0] ? (
            <Typography variant='body2'>
              {I18n.get('selectedImage')} {acceptedFiles[0].name}
            </Typography>
          ) : (
            <AccountCircleIcon fontSize='large' classes={{ root: classes.inlineAvatarIcon }} />
          )}
          <div {...getRootProps()} className={classes.inlineAvatarUpload}>
            <input {...getInputProps()} />
            <PillButton
              loading={loading}
              onClick={() => {}}
              backgroundColor='transparent'
              className={classes.inlinePillButton}
            >
              {I18n.get('avatarInstructions')}
            </PillButton>
          </div>
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('firstName')}
            error={!!personalErrors.firstName}
            helperText={personalErrors.firstName}
            onFocus={() => setPersonalErrors({ ...personalErrors, firstName: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='firstName'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('lastName')}
            error={!!personalErrors.lastName}
            helperText={personalErrors.lastName}
            onFocus={() => setPersonalErrors({ ...personalErrors, lastName: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='lastName'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            error={!!personalErrors.phoneNumber}
            helperText={personalErrors.phoneNumber}
            onFocus={() => setPersonalErrors({ ...personalErrors, phoneNumber: '' })}
            label={I18n.get('phoneNumber')}
            fullWidth
            className={classes.input}
            type='text'
            name='phoneNumber'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        {/* Temporarily Removing */}
        {/* <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('titlePosition')}
            error={!!personalErrors.title}
            helperText={personalErrors.title}
            onFocus={() => setPersonalErrors({ ...personalErrors, title: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='title'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid> */}

        <Grid item xs={12}>
          <Typography variant='h5' classes={{ root: classes.spaceAbove }}>
            {I18n.get('mailingAddress')}
          </Typography>
          <Typography variant='body1' paragraph>
            {I18n.get('mailingAddressReason')}
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant='outlined'
            label={I18n.get('mailingAddress')}
            error={!!personalErrors.address1}
            helperText={personalErrors.address1}
            onFocus={() => setPersonalErrors({ ...personalErrors, address1: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='address1'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            variant='outlined'
            label={I18n.get('city')}
            error={!!personalErrors.city}
            helperText={personalErrors.city}
            onFocus={() => setPersonalErrors({ ...personalErrors, city: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='city'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Autocomplete
            id='state-select'
            autoHighlight
            autoSelect
            options={States}
            filterOptions={createFilterOptions({ matchFrom: 'start', stringify: option => option.label })}
            getOptionLabel={option => option.value}
            onChange={(_: any, newValue: IOption | null) =>
              setUserInfo({ ...userInfo, state: newValue ? newValue.value : '' })
            }
            renderOption={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                className={classes.input}
                error={!!personalErrors.state}
                helperText={personalErrors.state}
                onFocus={() => setPersonalErrors({ ...personalErrors, state: '' })}
                fullWidth
                label={I18n.get('state')}
                variant='outlined'
              ></TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            variant='outlined'
            label={I18n.get('zip')}
            error={!!personalErrors.postalCode}
            helperText={personalErrors.postalCode}
            onFocus={() => setPersonalErrors({ ...personalErrors, postalCode: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='postalCode'
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      {/* advance to the next section */}
      <Grid item>
        <PillButton
          type='submit'
          onClick={() => advanceToCompanyForm()}
          loading={loading}
          className={classes.button}
          backgroundColor='transparent'
        >
          {I18n.get('continue')}
        </PillButton>
      </Grid>
    </>
  )

  // registration - part 2 - company info
  const companyRegForm = (
    <>
      <Grid item>
        <Typography variant='h2' className={classes.heading} paragraph>
          <span dangerouslySetInnerHTML={{ __html: I18n.get('joinUs') }}></span>
        </Typography>
        <Typography variant='h5' paragraph>
          {I18n.get('aboutYourCompany')}
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('companyName')}
            error={!!companyErrors.company}
            helperText={companyErrors.company}
            onFocus={() => setCompanyErrors({ ...companyErrors, company: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='company'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant='outlined'
            className={classes.input}
            required
            error={!!companyErrors.companySize}
          >
            <InputLabel id='company-size-input'>{I18n.get('companySize')}</InputLabel>
            <Select
              labelId='company-size-input'
              fullWidth
              value={userInfo.companySize}
              label={I18n.get('companySize')}
              onFocus={() => setCompanyErrors({ ...companyErrors, companySize: '' })}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                setUserInfo({ ...userInfo, companySize: e.target.value as string })
              }
            >
              <MenuItem value='0-49'>{I18n.get('employeeRange1')}</MenuItem>
              <MenuItem value='49-499'>{I18n.get('employeeRange2')}</MenuItem>
              <MenuItem value='500+'>{I18n.get('employeeRange3')}</MenuItem>
            </Select>
            {!!companyErrors.companySize && <FormHelperText>{companyErrors.companySize}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant='outlined'
            label={I18n.get('companyAddress')}
            error={!!companyErrors.companyAddress1}
            helperText={companyErrors.companyAddress1}
            onFocus={() => setCompanyErrors({ ...companyErrors, companyAddress1: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='companyAddress1'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            variant='outlined'
            label={I18n.get('city')}
            error={!!companyErrors.companyCity}
            helperText={companyErrors.companyCity}
            onFocus={() => setCompanyErrors({ ...companyErrors, companyCity: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='companyCity'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <Autocomplete
            id='state-select'
            autoHighlight
            autoSelect
            options={States}
            filterOptions={createFilterOptions({ matchFrom: 'start', stringify: option => option.label })}
            getOptionLabel={option => option.value}
            onChange={(_: any, newValue: IOption | null) =>
              setUserInfo({ ...userInfo, companyState: newValue ? newValue.value : '' })
            }
            renderOption={option => option.label}
            renderInput={params => (
              <TextField
                {...params}
                className={classes.input}
                error={!!companyErrors.companyState}
                helperText={companyErrors.companyState}
                onFocus={() => setCompanyErrors({ ...companyErrors, companyState: '' })}
                required
                fullWidth
                label={I18n.get('state')}
                variant='outlined'
              ></TextField>
            )}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            variant='outlined'
            label={I18n.get('zip')}
            error={!!companyErrors.companyPostalCode}
            helperText={companyErrors.companyPostalCode}
            onFocus={() => setCompanyErrors({ ...companyErrors, companyPostalCode: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='companyPostalCode'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>
      </Grid>
      {/* advance to the next section */}
      <Grid item>
        <PillButton
          type='submit'
          onClick={() => submitUser()}
          loading={loading}
          className={classes.button}
          backgroundColor='transparent'
        >
          {I18n.get('continue')}
        </PillButton>
      </Grid>
    </>
  )

  // this reg form is split into two sections, personal and company
  return (
    <Grid container direction='column' justify='center'>
      {activeRegSection === RegSection.personal ? personalRegForm : companyRegForm}
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    minWidth: 165,
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1rem',
      backgroundColor: '#fff !important'
    }
  },
  // dragDrop: {
  //   display: 'flex',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   minHeight: 80,
  //   backgroundColor: 'transparent',
  //   marginBottom: '1rem',
  //   cursor: 'pointer',
  //   padding: '0 .5rem',
  //   '& span': {
  //     textDecoration: 'underline',
  //     cursor: 'pointer'
  //   }
  // },
  heading: {
    fontWeight: 700,
    fontSize: '3.125rem',
    lineHeight: '3.125rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '3rem',
      lineHeight: '3rem'
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '2rem'
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: '2rem',
      lineHeight: '2rem'
    }
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
  },
  spaceAbove: {
    marginTop: '2rem'
  },
  inlineAvatarIcon: {
    position: 'relative',
    top: '12px',
    display: 'inline-block',
    marginTop: '20px',
    marginRight: '20px'
  },
  inlineAvatarUpload: {
    display: 'inline-block'
  },
  inlinePillButton: {
    minWidth: 165,
    marginTop: 0,
    [theme.breakpoints.down('md')]: {
      marginBottom: '1rem',
      backgroundColor: '#fff !important'
    }
  }
}))
