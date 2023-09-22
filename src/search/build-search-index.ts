import slugify from '@sindresorhus/slugify'
// import type {IJaenPage} from '@snek-at/jaen/dist/types.js'
import {Root as MdastRoot} from 'mdast'
import {SearchIndex} from './types.js'

interface Node {
  id: string
  path: string
  jaenPageMetadata?: {
    title?: string
    description?: string
  }
  jaenFields?: {
    'IMA:MdxField'?: Record<
      string,
      {
        value: MdastRoot
      }
    >
    'IMA:TextField'?: Record<
      string,
      {
        value: string
        props?: {
          as?: string
          id?: string
          relatedName?: string
        }
      }
    >
  }
  type: string
}

export const buildSearchIndex = async (nodes: Node[]) => {
  const searchIndex: SearchIndex = {}

  for (const node of nodes) {
    const pagePath = node.path

    if (!pagePath) {
      continue
    }

    const title = node.jaenPageMetadata?.title || pagePath
    const description = node.jaenPageMetadata?.description || ''

    const data: SearchIndex[string]['data'] = {
      '': description
    }

    if (node.jaenFields) {
      const mdxField = node.jaenFields['IMA:MdxField']
      const textField = node.jaenFields['IMA:TextField']

      if (mdxField) {
        let currentHeading: string | null = null

        const duplicationRecord: Record<string, number> = {}

        const buildHeading = (value: string) => {
          let slug = slugify(value)

          if (duplicationRecord[slug]) {
            slug += `-${duplicationRecord[slug]}`
            duplicationRecord[slug] += 1
          } else {
            duplicationRecord[slug] = 1
          }

          return `${slug}#${value}`
        }

        for (const value of Object.values(mdxField)) {
          const mdast = value.value

          // const headings: string[] = []
          for (const node of mdast.children) {
            if (node.type === 'heading') {
              // Set current heading key e.g. (some-anchor#Some Anchor)

              const element = node.children[0]

              if (element) {
                if (element.type === 'text') {
                  currentHeading = buildHeading(element.value)

                  data[currentHeading] = ''
                }
              }
            } else if (node.type === 'paragraph') {
              // Add paragraph to current heading
              const element = node.children[0]

              if (element) {
                if (element.type === 'text') {
                  if (currentHeading) {
                    data[currentHeading] += `${element.value}\n`
                  } else {
                    // Append to path: ""
                    data[''] += `${element.value}\n`
                  }
                }
              }
            }
          }
        }
      }

      if (textField) {
        for (const value of Object.values(textField)) {
          const isHeading =
            value.props?.as &&
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(value.props.as)

          const id = value.props?.id

          const relatedName = value.props?.relatedName

          const textValue = value.value || ''

          if (isHeading && id) {
            data[`${id}#${value.value || ''}`] = ''
          } else if (relatedName) {
            const realtedField = textField[relatedName]

            if (realtedField) {
              const relatedId = realtedField.props?.id
              const relatedValue = realtedField.value

              if (relatedId) {
                data[`${relatedId}#${relatedValue}`] += `${textValue}\n`
              }
            }
          } else {
            data[''] += `${textValue}\n`
          }
        }
      }
    }

    searchIndex[pagePath] = {
      id: node.id,
      type: node.type,
      title,
      data
    }
  }

  return searchIndex
}
