import {PageConfig, PageProps} from '@atsnek/jaen'
import {graphql} from 'gatsby'

const NewPostPage: React.FC<PageProps> = () => {
  return <>WIP</>
}

export default NewPostPage

export const pageConfig: PageConfig = {
  label: 'New post',
  icon: 'FaBook',
  breadcrumbs: [
    {
      label: 'schettn',
      path: '/user/schettn/'
    },
    {
      label: 'New post',
      path: '/docs/new-post/'
    }
  ],
  menu: {
    type: 'user',
    label: 'New post'
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
