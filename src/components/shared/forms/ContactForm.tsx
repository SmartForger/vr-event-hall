import React, { FC, useState, FormEvent } from 'react'

// Plugins
import { I18n } from 'aws-amplify'

// Helpers
import { validatePhoneNumber, validateEmail } from 'helpers'

// Styles
import { Box, Grid, FormControl, FormHelperText, TextField, Button } from '@material-ui/core'
import { IUser } from 'types'
import { graphQLMutation } from '../../../graphql/helpers'
import { createContactRequest, createUserInteraction } from '../../../graphql/mutations'
import { formatPhoneNumber } from '../../../helpers/format'

interface IContactFormFields {
  firstName: string
  lastName: string
  phoneNumber: string
  email: string
  message?: string
}

interface ContactFormProps {
  messageHelper?: string
  demo?: string
  user?: IUser
  isHelpRequest: boolean
  setErrorMessage: (message: string | null) => void
  setSuccessMessage: (message: string | null) => void
  setShowModal?: (boolean) => void
}

export const ContactForm: FC<ContactFormProps> = ({
  messageHelper,
  user,
  isHelpRequest,
  demo,
  setSuccessMessage,
  setErrorMessage,
  setShowModal
}) => {
  const initialContactFormInfo: IContactFormFields = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    message: ''
  }

  const initialErrors: IContactFormFields = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: ''
  }

  const [contactFormInfo, setContactFormInfo] = useState<IContactFormFields>({ ...initialContactFormInfo })
  const [errors, setErrors] = useState<IContactFormFields>(initialErrors)

  const handleInputChange = ({ target }) => {
    setContactFormInfo({ ...contactFormInfo, [target.name]: target.value })
  }

  const validateForm = (): boolean => {
    const errorObj: IContactFormFields = {
      firstName: !contactFormInfo.firstName ? I18n.get('requiredField') : '',
      lastName: !contactFormInfo.lastName ? I18n.get('requiredField') : '',
      phoneNumber: !contactFormInfo.phoneNumber
        ? I18n.get('requiredField')
        : !validatePhoneNumber(contactFormInfo.phoneNumber as string)
        ? I18n.get('invalidPhone')
        : '',
      email: !contactFormInfo.email
        ? I18n.get('requiredField')
        : !validateEmail(contactFormInfo.email as string)
        ? I18n.get('invalidEmail')
        : ''
    }

    const hasErrors = Object.keys(errorObj).some(key => errorObj[key] !== '')

    if (hasErrors) {
      setErrors(errorObj)
      return true
    }

    return false
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    const hasErrors = validateForm()

    if (!hasErrors) {
      try {
        if (isHelpRequest) {
          graphQLMutation(createUserInteraction, {
            name: 'help',
            trigger: 'submit',
            type: 'contact',
            userId: user?.id
          })

          await fetch('https://azjxmdb4qb.execute-api.us-east-1.amazonaws.com/prod/help', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json;charset=utf-8'
            },
            mode: 'no-cors',
            body: JSON.stringify({ ...contactFormInfo, phoneNumber: formatPhoneNumber(contactFormInfo.phoneNumber) })
          })
        } else {
          graphQLMutation(createUserInteraction, {
            name: demo || 'connect',
            trigger: 'submit',
            type: 'contact',
            userId: user?.id
          })

          await graphQLMutation(createContactRequest, { ...contactFormInfo, demo: demo, userId: user?.id })
        }
        if (setShowModal) {
          setShowModal(false)
        }
        setSuccessMessage('Thank you for submitting your request!')
      } catch (error) {
        console.error(error)
        setErrorMessage('There was an issue submitting your request. Please try again later.')
      }
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <TextField
            required
            fullWidth
            name='firstName'
            variant='outlined'
            error={!!errors.firstName}
            helperText={errors.firstName}
            label={I18n.get('firstName')}
            defaultValue={contactFormInfo.firstName}
            onChange={handleInputChange}
            onFocus={() => setErrors({ ...errors, firstName: '' })}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            required
            fullWidth
            name='lastName'
            variant='outlined'
            error={!!errors.lastName}
            helperText={errors.lastName}
            label={I18n.get('lastName')}
            defaultValue={contactFormInfo.lastName}
            onChange={handleInputChange}
            onFocus={() => setErrors({ ...errors, lastName: '' })}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            required
            fullWidth
            name='phoneNumber'
            variant='outlined'
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber}
            label={I18n.get('phoneNumber')}
            defaultValue={contactFormInfo.phoneNumber}
            onChange={handleInputChange}
            onFocus={() => setErrors({ ...errors, phoneNumber: '' })}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextField
            required
            fullWidth
            name='email'
            variant='outlined'
            error={!!errors.email}
            helperText={errors.email}
            label={I18n.get('email')}
            defaultValue={contactFormInfo.email}
            onChange={handleInputChange}
            onFocus={() => setErrors({ ...errors, email: '' })}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <FormHelperText>{messageHelper}</FormHelperText>
            <TextField
              required
              name='message'
              error={!!errors.email}
              helperText={errors.email}
              onChange={handleInputChange}
              multiline
              rows={6}
              variant='filled'
              onFocus={() => setErrors({ ...errors, email: '' })}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box mt={'26px'}>
        <Button type='submit' variant='contained' disableElevation>
          {I18n.get('submit')}
        </Button>
      </Box>
    </form>
  )
}
