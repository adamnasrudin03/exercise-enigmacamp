

const styles = theme => ({

    formField: {
        padding: theme.spacing(2),

    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },


    formButton: {
        float: 'right',
        padding: theme.spacing(2),
        display: 'flex',
        justifyContent: 'flex-end'
    },

    formBack: {
        float: 'left',
        padding: theme.spacing(2),
        display: 'default',
        justifyContent: 'flex-start'
    }

});


export default styles;