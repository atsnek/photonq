const smtSinglePostPage = {
    topNav: {
        bgColor: {
            default: 'gray.100',
            _dark: 'gray.700'
        },
    },
    leftNav: {
        summary: {
            color: {
                default: 'gray.600',
                _dark: 'gray.400'
            },
        },
        tags: {
            privacy: {
                public: {
                    hover: {
                        bgColor: {
                            default: 'green.200',
                            _dark: 'green.700'
                        },
                        color: {
                            default: 'green.800',
                            _dark: 'green.100'
                        }
                    }
                },
                private: {
                    hover: {
                        bgColor: {
                            default: 'yellow.200',
                            _dark: 'yellow.600'
                        }
                    }
                },
            },
            language: {
                hover: {
                    bgColor: {
                        default: 'gray.200',
                        _dark: 'gray.600'
                    },
                },
            },
        },
    },
};

export default smtSinglePostPage;