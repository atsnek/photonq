const themeSwitchComponent = {
    variants: {
        privacy: {
            track: {
                bgColor: 'yellow.200',
                _checked: {
                    bgColor: 'green.600'
                }
            }
        },
        brand: {
            track: {
                bgColor: 'gray.500',
                _checked: {
                    bgColor: 'brand.600'
                }
            }
        },
    }
}

export default themeSwitchComponent;