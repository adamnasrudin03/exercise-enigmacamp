
import { DRAWER_WIDTH } from './../constants'

const styles = theme => ({
  toolbar: theme.mixins.toolbar,

  link: {
    textDecoration: 'none',
    color: '#212121'
  },

  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    width: DRAWER_WIDTH,
    background: '#f5f5f5'
  },

});


export default styles;