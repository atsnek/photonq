const themeAvatarComponent = {
  variants: {
    //* This doesnt let us manipulate the actual image (which is what we want to do)
    //* We'll just leave it as is for now and manipulate it via emotion
    square: {
      container: {}
    }
  }
};

export default themeAvatarComponent;
