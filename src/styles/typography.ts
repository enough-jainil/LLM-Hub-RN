const styles = {
  customScrollbar: {
    "::-webkit-scrollbar": {
      width: "6px",
      height: "6px",
    },
    "::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: colors.border.primary,
      opacity: "0.1",
      borderRadius: "3px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: colors.border.primaryHover,
      opacity: "0.2",
    },
  },
};
