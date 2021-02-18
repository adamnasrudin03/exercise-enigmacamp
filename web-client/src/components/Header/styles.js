
// import { DRAWER_WIDTH } from './../constants'

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    background: " linear-gradient(to right, #00b8d4,#0091ea, #00e5ff, #00b0ff, #18ffff, #29b6f6)"
    // [theme.breakpoints.up('sm')]: {
    //   width: `calc(100% - ${DRAWER_WIDTH}px)`,
    //   marginLeft: DRAWER_WIDTH,
    // },
  },

  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  titleHeader: {
    fontFamily: 'Lucida Console, Courier, monospace',
    fontWeight: 'bold'
  }
});

export default styles;