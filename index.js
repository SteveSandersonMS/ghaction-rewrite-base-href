const core = require('@actions/core');
const fs = require('fs');

try {
  const htmlPath = core.getInput('html_path');
  const baseHref = core.getInput('base_href');
  console.log(`Attempting to rewrite base href in '${htmlPath}' to value '${baseHref}'...`);

  const originalText = fs.readFileSync(htmlPath, 'utf8');
  const updatedText = originalText
    .replace(/<base ([^>]*href=["'])([^'"]*)(["'][^>]*)>/, `<base $1${baseHref}$3>`);

  if (originalText !== updatedText) {
    fs.writeFileSync(htmlPath, updatedText);
    console.log('Done');  
  } else {
    console.warn(`WARNING: no <base> tag with 'href' attribute was found in '${htmlPath}'.`);
  }
} catch (error) {
  core.setFailed(error.message);
}
