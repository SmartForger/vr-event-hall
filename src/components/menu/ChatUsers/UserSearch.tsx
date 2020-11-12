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
    padding: '8px'
  },
  userSearchInput: {
    borderRadius: 0,
    borderBottom: '1px solid #000000',
    borderTop: '1px solid #D8DADA',
    borderLeft: '1px solid #D8DADA',
    borderRight: '1px solid #D8DADA',
    width: 270,
    '& .MuiInputBase-input': {
      padding: '10px',
      borderRight: 'none'
    }
  }
}))
