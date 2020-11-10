import React, { useState } from 'react'
import { debounce, InputAdornment, makeStyles, TextField } from '@material-ui/core'
import { Search } from '@material-ui/icons'

export const UserSearch = ({ users, setUsers }) => {
  const classes = useStyles()

  let [userSearch, setUserSearch] = useState<string>('')

  const debouncedFilter = debounce((val: string) => {
    const filtered = users.filter(u =>
      `${u.firstName.toLowerCase()}${u.lastName.toLowerCase()}`.includes(val.toLowerCase())
    )
    setUsers(filtered)
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserSearch(event.target.value)
    debouncedFilter(event.target.value)
  }

  return (
    <div className={classes.userSearchContainer}>
      <TextField
        id='user-search'
        value={userSearch}
        onChange={handleChange}
        variant='outlined'
        autoFocus
        className={classes.userSearchInput}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search />
            </InputAdornment>
          )
        }}
        aria-describedby='user-search'
        inputProps={{
          'aria-label': 'search'
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(() => ({
  userSearchContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px'
  },
  userSearchInput: {
    borderRadius: 0,
    width: '80%',
    '& .MuiInputBase-input': {
      padding: '10px'
    }
  }
}))
