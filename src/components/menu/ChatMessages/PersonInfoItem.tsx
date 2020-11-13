import React, { FC } from 'react'
import { Avatar, Popover, Typography, makeStyles, Theme } from '@material-ui/core'
import { IUser } from 'types'

type Props = {
  user: IUser
  date: string
}

export const PersonInfoItem: FC<Props> = ({ user, date }) => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null)

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const id = `person-popover-${user.id}`

  return (
    <div>
      <div
        aria-owns={open ? id : undefined}
        aria-haspopup='true'
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        <span className={classes.userName}>
          {user.firstName} {user.lastName}
        </span>
        <span className={classes.msgDate}>{date}</span>
      </div>
      <Popover
        id={id}
        className={classes.popover}
        classes={{
          paper: classes.paper
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right'
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={classes.mainInfo}>
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={`https://dx2ge6d9z64m9.cloudfront.net/public/${user.avatar}`}
            className={classes.avatar}
          />
          <div>
            <div className={classes.nameLine}>
              <Typography variant='h5' className={classes.popUserName}>
                {user.firstName} {user.lastName}
              </Typography>
              <span className={classes.status}></span>
            </div>
            <Typography variant='body1' className={classes.popUserTitle}>
              {user.title}
            </Typography>
          </div>
        </div>
      </Popover>
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) => ({
  userName: {
    fontSize: '1rem',
    fontWeight: 700,
    marginRight: 10
  },
  msgDate: {
    fontSize: '1rem',
    fontWeight: 400
  },
  popover: {
    pointerEvents: 'none'
  },
  paper: {
    minWidth: 300
  },
  mainInfo: {
    padding: 20,
    borderBottom: '1px solid #D8DADA',
    whiteSpace: 'nowrap',
    display: 'flex'
  },
  avatar: {
    width: 48,
    height: 48,
    marginRight: 10,
    fontSize: '1.5rem'
  },
  nameLine: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 6
  },
  popUserName: {
    marginRight: 10
  },
  popUserTitle: {
    fontSize: '0.875rem',
    textTransform: 'capitalize'
  },
  status: {
    display: 'block',
    width: 12,
    height: 12,
    borderRadius: '50%',
    background: '#00AC3E'
  },
  contactInfo: {
    padding: '10px 20px'
  },
  contactLine: {
    display: 'flex',
    alignItems: 'center',

    '& a': {
      textDecoration: 'none',
      color: '#0088ce',
      marginLeft: 10,
      fontSize: '0.875rem'
    }
  },
  contactLineTitle: {
    fontSize: '0.875rem'
  }
}))
