import prompts, { Choice } from 'prompts'

export const ask = async (message: string) => {
  const { response } = await prompts({
    type: 'text',
    message,
    name: 'response'
  })
  return response
}

export const choose = async (message: string, choices: Choice[]) => {
  const { response } = await prompts({
    type: 'select',
    choices,
    name: 'response',
    message
  })
  return response
}

export const count = async (message: string, initial: number = 100) => {
  const { response } = await prompts({
    type: 'number',
    message,
    initial,
    name: 'response'
  })
  return response
}
