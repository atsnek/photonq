import {PageConfig, PageProps} from '@atsnek/jaen'

import {graphql} from 'gatsby'
import * as React from 'react'
import {DocContent} from '../../contents/DocContent'

const DocsPage: React.FC<PageProps> = () => {
  return <DocContent />
}

export default DocsPage

export const pageConfig: PageConfig = {
  label: 'Documentation',
  icon: 'FaBook',
  childTemplates: ['DocPage'],
  menu: {
    type: 'app',
    order: 100,
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
