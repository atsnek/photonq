import {PageConfig} from '@atsnek/jaen'
import {PageProps} from 'gatsby'
import * as React from 'react'

const DocPage: React.FC<PageProps> = props => {
  return <main>to be implemented by jan</main>
}

export default DocPage

export {Head} from '@atsnek/jaen'

export const pageConfig: PageConfig = {
  label: 'DocPage',
  childTemplates: ['DocPage']
}
