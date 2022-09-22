import { type VFile } from 'vfile'
import { type Element, select, selectAll } from 'hast-util-select'
import { type Text } from 'hast'
import { rehype } from 'rehype'
import rehypeParse from 'rehype-parse'
import { z } from 'zod'

type ParseResult = {
  script: Element | null
  template: Element | null
  slots: Array<Element | undefined>
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
  const template = select('template[lang]', tree)
  const slots = selectAll('slot[name]', template?.content)
  return { script, template, slots }
}

// export function parseTemplate(template: Element) {}

export function createTemplateProcessor() {
  return rehype().use(rehypeParse, { fragment: true })
}

export function extractModule(value: string) {
  return import('data:text/javascript,' + encodeURIComponent(value))
}

type GenerateResult = {
  content: string
  extension: string
}

export function replaceSlotContent(element: Element, content: string) {
  element.children = [
    {
      type: 'text',
      value: content,
    },
  ]
  return element
}

const slotSchema = z.object({
  name: z.string().optional(),
  default: z.string(),
})

export type TlnSlot = z.infer<typeof slotSchema>

const tlnResultSchema = z.object({
  content: z.string(),
  extension: z.string(),
  slots: z.array(slotSchema),
})

export type TlnResult = z.infer<typeof tlnResultSchema>

export function transform(parsed: ParseResult): Record<string, any> {
  const { script, template, slots: parsedSlots } = parsed
  const extension = template?.properties?.lang

  if (!extension || typeof extension !== 'string') {
    throw new Error('template lang not found')
  }
  /**
   * @TODO - resolve language name from file extension (e.g. 'ts' -> 'typescript)
   * @TODO - resolve file extension from language name (e.g. 'typescript' -> '.ts')
   */

  console.log('tepmlate is', template)
  console.log(
    'template children',
    JSON.stringify(template.content?.children, null, 2)
  )
  console.log('parsed slots', JSON.stringify(parsedSlots, null, 2))

  const slots: TlnSlot[] = parsedSlots.map((slot) => {
    const name = slot?.properties?.name
    /** @TODO handle bad name string value? */
    const defaultValue = (slot?.children?.[0] as Text)?.value
    return {
      name: name as string | undefined,
      default: defaultValue,
    }
  })
  console.log('[transform] slots are', slots)

  const createContent = (inputs: Record<string, string>) => {
    const completeSlots = slots.map((s) => {
      if (s.name && inputs[s.name]) {
        const input = inputs[s.name]
        return {
          ...s,
          value: input || s.default,
        }
      }
      return s
    })
    console.log('[transform] completeSlots is', completeSlots)
  }

  return {
    createContent,
    extension,
  }
}

export function generate(
  parsed: ParseResult,
  slots: Record<string, string>
): void {
  // ): GenerateResult {
  const { script, template, slots: parsedSlots } = parsed
  const content = parsedSlots.reduce((acc, slot) => {
    const name = slot?.properties?.name
    if (!name || typeof name !== 'string') {
      return acc
    }
    const content = slots[name]
    if (!content) {
      return acc
    }
    return replaceSlotContent(slot, content)
  }, template)

  console.log('content is', content)
  // return {
  // content: toText(content),
  // extension: template?.properties?.lang,
  // }
}
