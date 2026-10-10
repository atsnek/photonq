const smtPageDirectoryComponent = {
    section: {
        title: {
            // The docs nav's section titles are 14px bold on the gray.800
            // body in dark mode, where theme.600 (#0580d2) read 3.9:1 against
            // the 4.5:1 that size needs. theme.300 (#67a7e2) is 6.4:1 and
            // keeps the lighter `theme` blue this nav was drawn in. On white
            // theme.500 (#348dd7) was 3.54:1. theme.700 (#046eb6) is 5.4:1
            // and still the same blue.
            color: {
                default: 'theme.700',
                _dark: 'theme.300'
            }
        }
    }
}

export default smtPageDirectoryComponent;