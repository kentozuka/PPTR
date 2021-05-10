import { initialize, log, terminate } from 'helpers'

async function main() {
  try {
    // LIST THE USER TO FOLLOW
    // choose a random user from s3
    // set cookies if exist
    // access instagram page
    // if not logged in, log in
    // if challenged, send slack
    // go to the username specified by the runner
    // open the following list
    // check if the list is really open
    // listen for the list response
    // hover on the user thats not locked
    // saves the data
    // repeat
    // saves the cookie
    const page = await initialize()
    if (!page) return log('Failed to initialize pptr')
  } catch (e) {
    log(e)
  } finally {
    await terminate()
  }
}

main()
