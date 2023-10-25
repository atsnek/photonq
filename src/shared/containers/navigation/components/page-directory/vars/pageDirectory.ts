export const baseMenuItemProps = {
    transition: 'opacity 0.2s ease-in-out, background-color 0.2s ease-in-out'
};

export const inactiveMenuItemProps = {
    ...baseMenuItemProps,
    opacity: 0.8
};

export const activeMenuItemProps = {
    ...baseMenuItemProps,
    opacity: 1,
    bgColor: 'theme.100',
    color: 'leftNav.accordion.activeItem.button.text.color',
    fontWeight: 'bold'
};