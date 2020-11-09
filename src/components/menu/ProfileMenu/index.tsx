import React, { FC, useState } from 'react'

// Plugins
import classnames from 'classnames'
import { makeStyles, createStyles, Theme, Backdrop, Drawer, IconButton } from '@material-ui/core'

import { ChatProvider } from 'providers'

// Components
import { Chat } from '../Chat'
import { MenuList } from '../MenuList'

// Types
import { IUser, GameFlowSteps } from 'types'

// Images
import verizonLogo from 'assets/verizon-logo.svg'
import verizonLogoV from 'assets/verizonLogoV.svg'
import arrowLeftIcon from 'assets/arrowLeftIcon.svg'
import arrowRightIcon from 'assets/arrowRightIcon.svg'
import { Close } from '@material-ui/icons'
import { TabPanel } from 'components/shared'
import { ChatUsers } from '../ChatUsers'

interface ProfileMenuProps {
  user?: IUser
  users?: IUser[]
  drawerOpen: boolean
  mapLocation?: object
  conversationId: string
  toggleDrawer: () => void
  toggleTutorial: () => void
  setGameState: (state: GameFlowSteps) => void
  setConversationId: (conversationId: string) => void
}

export const ProfileMenu: FC<ProfileMenuProps> = ({
  user,
  users,
  drawerOpen,
  toggleDrawer,
  toggleTutorial,
  setGameState,
  conversationId,
  setConversationId
}) => {
  const classes = useStyles()
  const [showUserList, setShowUserList] = useState<boolean>(false)

  const closeChat = () => {
    toggleDrawer()
    setConversationId('')
  }

  const toggleUserList = () => {
    setShowUserList(prev => !prev)
  }

  return (
    <ChatProvider>
      <div className={classes.root}>
        <Backdrop className={classes.backdrop} open={drawerOpen} onClick={toggleDrawer} />
        <Drawer
          anchor='right'
          variant='permanent'
          className={classnames(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen
          })}
          classes={{
            paper: classnames({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen
            })
          }}
        >
          <>
            <header className={classes.header}>
              {drawerOpen ? (
                <img src={verizonLogo} alt='Verizon' width='150' />
              ) : (
                <img className={classes.smallLogo} src={verizonLogoV} alt='Verizon' width='20' height='24' />
              )}
            </header>
            <MenuList
              user={user}
              anchor='right'
              drawerOpen={drawerOpen}
              toggleTutorial={toggleTutorial}
              setGameState={setGameState}
            />
            <Chat
              toggleDrawer={toggleDrawer}
              drawerOpen={drawerOpen}
              user={user}
              users={users}
              conversationId={conversationId}
              showUserList={() => setShowUserList(true)}
            />
            <footer className={classes.footer}>
              <IconButton onClick={closeChat}>
                {drawerOpen ? (
                  <img className={classes.arrowIcon} src={arrowRightIcon} alt='Arrow right' />
                ) : (
                  <img className={classes.arrowIcon} src={arrowLeftIcon} alt='Arrow left' />
                )}
              </IconButton>
            </footer>
          </>
        </Drawer>
        <Drawer
          anchor={'right'}
          open={showUserList}
          onClose={() => setShowUserList(false)}
          ModalProps={{ hideBackdrop: true }}
          classes={{
            paper: classes.messagePaper
          }}
        >
          <div className={classes.displayMenu}>
            <div className={classes.userCloseContainer}>
              <IconButton onClick={() => setShowUserList(false)} disableRipple>
                <Close />
              </IconButton>
            </div>
            <TabPanel value={0} index={0} className={classes.tabPanel}>
              <ChatUsers toggleDrawer={toggleUserList} />
            </TabPanel>
          </div>
        </Drawer>
      </div>
    </ChatProvider>
  )
}

const drawerWidth = 334

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',

      '& .MuiPaper-root': {
        background: '#000000'
      },
      '& .MuiDrawer-paperAnchorDockedRight': {
        borderLeft: 0
      },
      opacity: 1,
      animationName: '$fadeInOpacity',
      animationIterationCount: 1,
      animationTimingFunction: 'ease-in',
      animationDuration: '0.75s'
    },
    '@keyframes fadeInOpacity': {
      '0%': {
        opacity: 0
      },
      '100%': {
        opacity: 1
      }
    },
    smallLogo: {
      [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
        display: 'none'
      }
    },
    backdrop: {
      display: 'none',
      zIndex: theme.zIndex.drawer - 1,

      [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
        display: 'block'
      }
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
      'z-index': '12000'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),

      [`${theme.breakpoints.up('md')}, screen and (min-height: 741px)`]: {
        overflowX: 'hidden'
      },
      [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
        width: '256px',
        overflowX: 'unset'
      }
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
      }),
      overflow: 'hidden',
      width: '64px',

      [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
        width: '0'
      }
    },
    header: {
      display: 'flex',
      position: 'fixed',
      width: 'inherit',
      minHeight: '60px',
      maxHeight: '60px',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
      '& img': {
        transition: `width 0.2s ${theme.transitions.easing.sharp}`
      },

      [`${theme.breakpoints.down('sm')}, screen and (max-height: 540px)`]: {
        minHeight: '40px',
        maxHeight: '40px',
        '& img': {
          height: '28px'
        }
      }
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
    messagePaper: {
      '&.MuiPaper-root': {
        backgroundColor: 'white !important',
        marginTop: '60px'
      }
    },
    displayMenu: {
      width: '334px',
      color: 'white',
      height: 'calc(100% - 60px)',
      display: 'flex',
      flexDirection: 'column'
    },
    tabPanel: { flex: 1 },
    userCloseContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      '& .MuiIconButton-root': {
        padding: '4px 12px',
        '&:hover': {
          backgroundColor: 'transparent'
        }
      }
    }
  })
)
