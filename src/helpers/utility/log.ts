import { second } from "./time";

export const log = (body: string | Error) => {
  const t = second()
  const l = typeof body === 'string' ? 'INFO' : 'ERROR'
  const m = typeof body === 'string' ? body : body.message
  const txt = `${l.padEnd(6)}| ${(t + 's').padEnd(5)}| ${m ? m : 'NO MESSAGE GIVEN'}`
  console.log(txt)
  
  if (body instanceof Error) {
    console.log(body.stack)
  }
}
