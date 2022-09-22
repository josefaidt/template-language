import { type VFile } from 'vfile'
import { type Element, select } from 'hast-util-select'
import { rehype } from 'rehype'
import rehypeParse from 'rehype-parse'

type ParseResult = {
  script: Element | null
  template: Element
  // slots: Array<Element | undefined>
}

/**
 * Parses input string and returns script and template nodes
 */
export function parse(input: VFile): ParseResult {
  /**
   * @TODO strongly type return
   */
  const processor = createTemplateProcessor()
  const tree = processor.parse(input)

  const script = select('script[context=module]', tree)
  const template = select('template', tree)
  if (!template) {
    throw new Error('template not found')
  }
  return { script, template }
}

// export function parseTemplate(template: Element) {}

export function createTemplateProcessor() {
  return rehype().use(rehypeParse, { fragment: true })
}
