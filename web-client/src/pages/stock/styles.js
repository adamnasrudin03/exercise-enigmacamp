const styles = (theme) => ({
    formField: {
      padding: theme.spacing(2),
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
    forBack: {
      float: "left",
      padding: theme.spacing(2),
      display: "default",
      justifyContent: "flex-start",
    },
    buttonGroup: {
      padding: theme.spacing(2),
      display: "flex",
      justifyContent: "flex-end",
    },
  });
  
  export default styles;
  