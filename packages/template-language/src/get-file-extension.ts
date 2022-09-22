import { type Element } from 'hast-util-select'

export function getFileExtension(template: Element): string {
  const lang = template?.properties?.lang
  if (typeof lang !== 'string') {
    throw new Error('template lang not found')
  }
  return lang
}
