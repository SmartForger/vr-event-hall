export const validateEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  // eslint-disable-next-line
  return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(phoneNumber)
}

export const validatePassword = (password: string): boolean => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_+~=])[A-Za-z\d!@#$%^&*()\-_+~=]{12,}$/.test(password)
}

export const validateZip = (zip: string): boolean => {
  return /^\d{5}([-]|\s*)?(\d{4})?$/.test(zip)
}

export const validateNonNumeric = (toValidate: string): boolean => {
  return /^\D+$/.test(toValidate)
}
