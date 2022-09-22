import { VFile } from 'vfile'
import { parse } from '$src/parse'

describe('parser', () => {
  it('should parse a generic file', () => {
    const input = new VFile('')
    const parsed = parse(input)
    expect(parsed).toBeTruthy()
    // basically it doesn't error
  })

  it('should parse a script', () => {
    const input = new VFile('<script context="module"></script>')
    const parsed = parse(input)
    expect(parsed.script).toBeTruthy()
  })

  it('should parse a template', () => {
    const input = new VFile('<template lang></template>')
    const parsed = parse(input)
    expect(parsed.template).toBeTruthy()
  })

  it('should parse slots', () => {
    const input = new VFile('<template><slot name="hello"></slot></template>')
    const parsed = parse(input)
    expect(parsed.slots?.length).toBeGreaterThan(0)
  })
})
