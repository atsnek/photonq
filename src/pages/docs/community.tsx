import {Field, PageConfig, PageProps} from '@atsnek/jaen'

import {Box} from '@chakra-ui/react'
import {graphql} from 'gatsby'
import * as React from 'react'

const IndexPage: React.FC<PageProps> = () => {
  return <Box as="main"></Box>
}

export default IndexPage

export const pageConfig: PageConfig = {
  label: 'Community',
  icon: 'FaUsers',
  menu: {
    type: 'app',
    order: 200,
    group: 'photonq'
  }
}

export const query = graphql`
  query ($jaenPageId: String!) {
    ...JaenPageQuery
    allJaenPage {
      nodes {
        ...JaenPageData
        children {
          ...JaenPageData
        }
      }
    }
  }
`

export {Head} from '@atsnek/jaen'
