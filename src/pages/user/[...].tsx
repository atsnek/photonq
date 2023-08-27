import {PageConfig, PageProps} from '@atsnek/jaen'

const Page: React.FC<PageProps> = ({location, pageContext}) => {
  // everything after /user/ is the handle
  const handle = location.pathname.split('/user/')[1]

  return (
    <>
      <h1>handle {handle}</h1>
      <pre>{JSON.stringify(pageContext, null, 2)}</pre>
    </>
  )
}

export default Page

export const pageConfig: PageConfig = {
  label: 'User [...]',
  breadcrumbs: [
    {
      label: 'schettn',
      path: '/user/schettn/'
    }
  ]
}
