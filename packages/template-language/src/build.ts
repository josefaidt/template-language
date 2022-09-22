import { read } from 'to-vfile'
import { parse } from './parse'
import { generate } from './generate'
import { getFileExtension } from './get-file-extension'

/**
 * @TODO - add `build` function for programmatic usage
 * @param input - path to template file or string
 */
export async function build(
  input: string,
  inputs: Record<string, string>
): Promise<{
  content: string
  extension: string
}> {
  const parsed = parse(await read(input))
  const generated = generate(parsed.template, inputs)
  return {
    content: generated,
    extension: getFileExtension(parsed.template),
  }
}
