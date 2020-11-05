import React from 'react'
import { Avatar, makeStyles, Typography } from '@material-ui/core'

export const DetailsPanel = () => {
  const classes = useStyles()

  return (
    <>
      <div className={classes.details}>
        <Typography variant='subtitle1' className={classes.bold} gutterBottom>
          Info
        </Typography>
        <Typography variant='body2' gutterBottom>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate totam aspernatur reiciendis! Similique
          deleniti, amet, quidem asperiores tenetur explicabo minima maxime beatae, laborum ipsum quae inventore quis
          magnam cupiditate recusandae!
        </Typography>
      </div>
      <div>
        <Typography variant='subtitle1' className={classes.bold} gutterBottom>
          Presenters
        </Typography>
        <section>
          <div className={classes.presenter}>
            <Avatar
              alt={`Amber George`}
              src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
              className={classes.avatar}
            />
            <div className={classes.presenterInfo}>
              <Typography variant='h6' component='h3' align='center' className={classes.bold}>
                Amber George
              </Typography>
              <Typography variant='body2' component='p' align='center' className={classes.userTitle}>
                Verizon Representative
              </Typography>
            </div>
          </div>
          <div className={classes.presenter}>
            <Avatar
              alt={`Bryan Press`}
              src={`https://dx2ge6d9z64m9.cloudfront.net/public/1234`}
              className={classes.avatar}
            />
            <div className={classes.presenterInfo}>
              <Typography variant='h6' component='h3' align='center' className={classes.bold}>
                Bryan Press
              </Typography>
              <Typography variant='body2' component='p' align='center' className={classes.userTitle}>
                Verizon Representative
              </Typography>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

const useStyles = makeStyles(() => ({
  details: {
    color: 'black',
    padding: '8px 20px 16px',
    borderBottom: '1px solid lightgray'
  },
  bold: {
    fontWeight: 'bold'
  },
  avatar: {
    width: '48px',
    height: '48px',
    fontSize: '1.75rem',
    marginLeft: '16px',
    marginRight: '16px'
  },
  presenter: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'black',
    marginBottom: '20px'
  },
  presenterInfo: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'flex-start'
  },
  userTitle: {
    marginTop: '-4px'
  }
}))
