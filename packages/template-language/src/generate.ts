import { type Element, select } from 'hast-util-select'
import { h } from 'hastscript'
import { toText } from 'hast-util-to-text'

export function generate(
  template: Element,
  inputs?: Record<string, string>
): string {
  for (const [inputName, inputValue] of Object.entries(inputs || {})) {
    const input = select(`slot[name="${inputName}"]`, template.content)
    if (!input) {
      throw new Error(`Input "${inputName}" not found in template`)
    }
    input.children = [h('text', inputValue)]
  }
  return toText(h('div', template.content))
}
