import { VFile } from 'vfile'
import { parse } from '$src/parse'
import { generate } from '$src/generate'

describe('parser', () => {
  it('should parse a script', () => {
    const input = new VFile(
      '<script context="module"></script><template></template>'
    )
    const parsed = parse(input)
    expect(parsed.script).toBeTruthy()
  })

  it('should parse a template', () => {
    const input = new VFile('<template lang></template>')
    const parsed = parse(input)
    expect(parsed.template).toBeTruthy()
  })

  it('should replace slot values', () => {
    const input = new VFile(
      '<template><slot name="name">world</slot></template>'
    )
    const parsed = parse(input)
    expect(generate(parsed.template, { name: 'vitest' })).toBe('vitest')
  })
})
