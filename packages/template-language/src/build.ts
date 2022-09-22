import { VFile } from 'vfile'
import { read } from 'to-vfile'
import { parse, extractModule, transform } from './parse'
import { generate } from './parser/generate'

/**
 * @TODO - add `build` function for programmatic usage
 * @param input - path to template file or string
 */
export async function build(
  input: string,
  inputs: Record<string, string>
): Promise<string> {
  const parsed = parse(await read(input))
  if (!parsed.template) throw new Error('template not found')
  const generated = generate(parsed.template, inputs)
  console.log('generated is', generated)
  // const transformed = transform(parsed)
  // console.log('transformed is', transformed)
  // return transformed.createContent(inputs)
  return generated
}
