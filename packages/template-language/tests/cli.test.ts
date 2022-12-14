import * as fs from 'node:fs'
import { execSync } from 'node:child_process'
import * as os from 'node:os'
import * as path from 'node:path'
import * as url from 'node:url'

describe('cli', () => {
  const projectPath = path.join(os.tmpdir(), 'tln-test', String(Date.now()))
  const projectTemplatePath = path.join(projectPath, 'template.tln')

  // create project path
  fs.mkdirSync(projectPath, { recursive: true })

  beforeAll(() => {
    fs.copyFileSync(
      url.fileURLToPath(new URL('template.tln', import.meta.url)),
      projectTemplatePath
    )
  })

  afterAll(() => {
    fs.rmSync(projectPath, { recursive: true })
  })

  it('should build a template', async () => {
    const targetFilePath = path.join(projectPath, 'template.ts')
    execSync(`./build/cli.js ${projectTemplatePath} --hello-value=vitest`)
    const result = fs.readFileSync(targetFilePath, 'utf-8')
    expect(result).toEqual(
      `/* generated by template-language */${os.EOL}export const hello = 'vitest'`
    )
    fs.unlinkSync(targetFilePath)
  })
})
