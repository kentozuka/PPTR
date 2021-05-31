import prompts from 'prompts'

import {
  log,
  saveCookie,
  initialize,
  terminate,
  accessSite,
  sleep,
  typeIn
} from 'helpers'
import { checkFile } from 'lib/io'

!(async () => {
  try {
    const { provider } = await prompts({
      type: 'select',
      name: 'provider',
      message: 'Choose the provider',
      choices: [
        {
          title: 'local storage',
          value: 'local'
        },
        {
          title: 'aws s3',
          value: 's3'
        }
      ]
    })

    const { username } = await prompts({
      type: 'text',
      name: 'username',
      message: 'Type in your username'
    })
    if (!username) return log('Please specify the username')
    const check = await checkFile(`cookies/${username}.txt`, provider)
    if (check) {
      const { resume } = await prompts({
        type: 'confirm',
        message: `Cookie found for the user ${username}. Do you want to continue?`,
        name: 'resume'
      })
      if (!resume) process.exit()
    }

    const { password } = await prompts({
      type: 'password',
      name: 'password',
      message: 'Type in your password'
    })
    if (!password) return log('Please specify the username')

    const { confirmation } = await prompts({
      type: 'confirm',
      name: 'confirmation',
      message: 'Did you make any mistake?'
    })
    if (confirmation) return log('Please try again!')

    log(`Thank you! I\'ll be logging into instagram with ${username}`)
    const page = await initialize()
    if (!page) return log('Failed to initialize pptr')
    await accessSite(page, 'instagram')

    await typeIn(page, '[name="username"]', username)
    await typeIn(page, '[name="password"]', password)
    await page.click('[type="submit"]')
    await sleep(5000)

    const error = await page.$('#slfErrorAlert')
    if (error) {
      return log(
        `Failed to login with username: ${username}, password: ${password}`
      )
    }

    await saveCookie(page, username)
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
})()
