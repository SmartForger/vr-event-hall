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
        className={classes.userSearchField}
        value={userSearch}
        onChange={handleChange}
        variant='outlined'
        placeholder='Name search'
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <Search />
            </InputAdornment>
          ),
          className: classes.userSearchInput
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
    padding: '0 20px 20px',
    borderBottom: '1px solid #D8DADA'
  },
  userSearchField: {
    width: '100%'
  },
  userSearchInput: {
    borderRadius: 0,
    border: 'none',
    borderBottom: '1px solid black',

    '& .MuiInputBase-input': {
      height: 42,
      padding: '0 10px',
      border: 'none'
    },

    '& .MuiOutlinedInput-notchedOutline': {
      top: 0
    }
  }
}))
