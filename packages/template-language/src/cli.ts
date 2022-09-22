#!/usr/bin/env node
import * as path from 'node:path'
import { print } from './printer'
import { z } from 'zod'
import { build } from './build'

const [, , ...args] = process.argv
const [templatePathInput, ...slotsInput] = args

/**
 * @TODO outdir?
 * @TODO just emit to stdout? (no need for outdir)
 */

const templatePath = path.resolve(templatePathInput)
print.info('template path is', templatePath)
const slots = slotsInput.reduce((acc, slot) => {
  const [name, value] = slot.split('=')
  return {
    ...acc,
    [name.replace(/^--/, '')]: value,
  }
}, {})
print.info('slots are', slots)
print.info('build start')
const output = await build(templatePath, slots)
print.info('build end')
print.info('output is', output)
