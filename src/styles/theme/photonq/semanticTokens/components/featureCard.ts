const smtPqFeatureCard = {
  color: {
    // The home page's feature descriptions. #747781 was 4.47:1 on white and
    // 4.17:1 on the code card's #F6F7FA, under the 4.5:1 a 16px text needs.
    // #686b74 is the same grey a little darker, 5.3:1 and 5.0:1.
    default: '#686b74',
    _dark: 'gray.400'
  },
  title: {
    // Text, so the contrast-checked text token (see shared.text.brand). The
    // old dark half, brand.600, was 2.4:1 on the dark cards.
    color: {
      default: 'shared.text.brand'
    }
  }
};

export default smtPqFeatureCard;
