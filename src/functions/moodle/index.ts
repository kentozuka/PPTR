import {
  initialize,
  log,
  readLocalTextFile,
  terminate,
  constants,
} from "helpers";
import { accessSite } from "helpers/pptr/navigation";

async function main() {
  // initialize puppeteer
  // set cookie if exists
  // access moodle page
  // go to specified class
  // access the class
  // open up the slide
  // listen for the slide pictures
  // saves the pictures in a single file
  // repeat
  // close puppeteer
  try {
    const page = await initialize();
    if (!page) {
      return null;
    }
    const opened = await accessSite(page, "moodle");
    if (!opened) {
      return null;
    }
  } catch (e) {
    log(e);
  } finally {
    await terminate();
  }
}

main();
