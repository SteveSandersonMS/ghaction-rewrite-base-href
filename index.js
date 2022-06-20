const core = require('@actions/core');
const glob = require('@actions/glob');
const fs = require('fs');

async function run() {
  try {
    const baseHref = core.getInput('base_href');
    const htmlPath = core.getInput('html_path', { required: false });
    const htmlGlob = core.getInput('html_glob', { required: false });
    if (!(htmlPath || htmlGlob)) {
      throw new Error('At least one of html_path or html_glob must be set');
    }

    if (htmlPath) {
      rewriteSingleFile(htmlPath, baseHref);
    }

    if (htmlGlob) {
      const globber = await glob.create(htmlGlob);
      const globberFiles = await globber.glob();
      console.log(`Glob matched ${globberFiles.length} files`);
      globberFiles.forEach(filePath => rewriteSingleFile(filePath, baseHref));
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

function rewriteSingleFile(htmlPath, baseHref) {
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
}

run();
