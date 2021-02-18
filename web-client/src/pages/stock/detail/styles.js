

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
    },
    formField: {
        padding: theme.spacing(2),
        width: 500
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
    },

});


export default styles;