import c from 'picocolors'

export function ts() {
  const date = new Date()
  // return format [HH:MM:SS]
  const time = date.toTimeString().slice(0, 8)
  return c.gray(`[${time}]`)
}

type LogType = 'info' | 'warn' | 'error' | 'debug' | 'dir'

export class Printer {
  private log(type: LogType, message) {
    console[type](`${ts()} ${message}`)
  }
  public info(message) {
    this.log('info', message)
  }
}

export function createPrinter() {
  const format = (message: any[]) =>
    message
      .map((m) => (typeof m === 'string' ? m : JSON.stringify(m, null, 2)))
      .join(' ')
  return {
    er: (...message: any[]) => {
      const msg = message.map((m) => (m ? m : '(blank)'))
      if (process.env.DEBUG) {
        msg.splice(0, 0, ts())
        console.log(c.blue(format(msg)))
      }
    },
    info: (...message: any[]) => {
      const msg = message.map((m) => (m ? m : '(blank)'))
      if (process.env.DEBUG) {
        msg.splice(0, 0, ts())
        console.log(c.blue(format(msg)))
      }
    },
    success: (...message: any[]) => console.log(c.green(format(message))),
    error: (...message: any[]) => console.error(c.red(format(message))),
    warn: (...message: any[]) => console.warn(c.yellow(format(message))),
  }
}

export const print = createPrinter()
