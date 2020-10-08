import React, { FC, useState, ChangeEvent, useEffect } from 'react'
import { I18n } from 'aws-amplify'
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
  FormHelperText
} from '@material-ui/core'
import { Autocomplete, createFilterOptions } from '@material-ui/lab'
import { v4 as uuid } from 'uuid'
import axios from 'axios'

import { PillButton } from 'components'
import { AuthFlowSteps, IUser, IOption } from 'types'
import { States, validatePhoneNumber, validateZip } from 'helpers'
import { graphQLMutation } from 'graphql/helpers'
import { createUser } from 'graphql/mutations'

interface RegistrationProps {
  userEmail: string
  setAuthState: (state: AuthFlowSteps) => void
  setUser: (user: IUser) => void
}
interface IRegErrors {
  firstName: string
  lastName: string
  phoneNumber: string
  title: string
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
    companyPostalCode: ''
  }
  const initialErrors: IRegErrors = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    title: '',
    company: '',
    companySize: '',
    companyAddress1: '',
    companyCity: '',
    companyState: '',
    companyPostalCode: ''
  }
  const [userInfo, setUserInfo] = useState<IUser>(initialUser)
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<IRegErrors>(initialErrors)

  useEffect(() => {
    if (userEmail) {
      setUserInfo({ ...userInfo, email: userEmail })
    }
    // eslint-disable-next-line
  }, [userEmail])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { target } = e
    setUserInfo({
      ...userInfo,
      [target.name]: target.value
    })
  }

  const createNewUser = async () => {
    try {
      const newUserRes = await graphQLMutation(createUser, userInfo)
      //@ts-ignore
      return newUserRes.data.user
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

  const validateForm = (): boolean => {
    const errorObj: IRegErrors = {
      firstName: !userInfo.firstName ? I18n.get('requiredField') : '',
      lastName: !userInfo.lastName ? I18n.get('requiredField') : '',
      phoneNumber: !userInfo.phoneNumber
        ? I18n.get('requiredField')
        : !validatePhoneNumber(userInfo.phoneNumber as string)
        ? I18n.get('invalidPhone')
        : '',
      title: !userInfo.title ? I18n.get('requiredField') : '',
      company: !userInfo.company ? I18n.get('requiredField') : '',
      companySize: !userInfo.companySize ? I18n.get('requiredField') : '',
      companyAddress1: !userInfo.companyAddress1 ? I18n.get('requiredField') : '',
      companyCity: !userInfo.companyCity ? I18n.get('requiredField') : '',
      companyState: !userInfo.companyState ? I18n.get('requiredField') : '',
      companyPostalCode: !userInfo.companyPostalCode
        ? I18n.get('requiredField')
        : !validateZip(userInfo.companyPostalCode as string)
        ? I18n.get('invalidZip')
        : ''
    }

    const hasErrors = Object.keys(errorObj).some(key => errorObj[key] !== '')

    if (hasErrors) {
      setErrors(errorObj)
      return true
    }

    return false
  }

  const submitUser = async () => {
    const hasErrors = validateForm()
    if (!hasErrors) {
      setLoading(true)
      try {
        await createNewUser()
        await sendIntegrateData()
        // TODO: Remove later
        setAuthState(AuthFlowSteps.ThankYou)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      submitUser()
    }
  }

  return (
    <Grid container direction='column' justify='center'>
      <Grid item>
        <Typography variant='h2' className={classes.heading} paragraph>
          <span dangerouslySetInnerHTML={{ __html: I18n.get('joinUs') }}></span>
        </Typography>
      </Grid>
      <Grid item container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('firstName')}
            error={!!errors.firstName}
            helperText={errors.firstName}
            onFocus={() => setErrors({ ...errors, firstName: '' })}
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
            error={!!errors.lastName}
            helperText={errors.lastName}
            onFocus={() => setErrors({ ...errors, lastName: '' })}
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
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            onFocus={() => setErrors({ ...errors, phoneNumber: '' })}
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

        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('titlePosition')}
            error={!!errors.title}
            helperText={errors.title}
            onFocus={() => setErrors({ ...errors, title: '' })}
            fullWidth
            className={classes.input}
            type='text'
            name='title'
            required
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            variant='outlined'
            label={I18n.get('companyName')}
            error={!!errors.company}
            helperText={errors.company}
            onFocus={() => setErrors({ ...errors, company: '' })}
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
          <FormControl fullWidth variant='outlined' className={classes.input} required error={!!errors.companySize}>
            <InputLabel id='company-size-input'>{I18n.get('companySize')}</InputLabel>
            <Select
              labelId='company-size-input'
              fullWidth
              value={userInfo.companySize}
              label={I18n.get('companySize')}
              onFocus={() => setErrors({ ...errors, companySize: '' })}
              onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                setUserInfo({ ...userInfo, companySize: e.target.value as string })
              }
            >
              <MenuItem value='0-49'>{I18n.get('employeeRange1')}</MenuItem>
              <MenuItem value='49-499'>{I18n.get('employeeRange2')}</MenuItem>
              <MenuItem value='500+'>{I18n.get('employeeRange3')}</MenuItem>
            </Select>
            {!!errors.companySize && <FormHelperText>{errors.companySize}</FormHelperText>}
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            variant='outlined'
            label={I18n.get('companyAddress')}
            error={!!errors.companyAddress1}
            helperText={errors.companyAddress1}
            onFocus={() => setErrors({ ...errors, companyAddress1: '' })}
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
            error={!!errors.companyCity}
            helperText={errors.companyCity}
            onFocus={() => setErrors({ ...errors, companyCity: '' })}
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
                error={!!errors.companyState}
                helperText={errors.companyState}
                onFocus={() => setErrors({ ...errors, companyState: '' })}
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
            error={!!errors.companyPostalCode}
            helperText={errors.companyPostalCode}
            onFocus={() => setErrors({ ...errors, companyPostalCode: '' })}
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
    </Grid>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: 165,
    marginTop: '1rem',
    [theme.breakpoints.down('md')]: {
      marginBottom: '1rem',
      backgroundColor: '#fff !important'
    }
  },
  dragDrop: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 80,
    backgroundColor: '#eee',
    marginBottom: '1rem',
    cursor: 'pointer',
    padding: '0 .5rem',
    '& span': {
      textDecoration: 'underline',
      cursor: 'pointer'
    }
  },
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
  }
}))
