const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '../app/(personal)/sticker-generator/components/templates')
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.includes('SupportCardTemplate'))

files.forEach(file => {
  const filePath = path.join(dir, file)
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  // Regex to match the element wrapping {supporterName...} and extracting fontSize
  const regex = /<([a-zA-Z0-9]+)([^>]*)style=\{\{\s*(?:[^}]*,\s*)?fontSize:\s*'([0-9.]+)cqw'(\s*,[^}]*)?\}\}([^>]*)>\s*\{(supporterName\s*\|\|\s*'[^']+')\}\s*<\/\1>/g

  content = content.replace(regex, (match, tag, beforeStyle, fontSize, afterStyle, afterStyleBrace, innerText) => {
    changed = true;
    
    // Check if there are other styles. If yes, keep style tag, if not, remove it.
    // beforeStyle: ` className="..." `
    // afterStyle: `, color: ...`
    // We want to reconstruct the element without fontSize.
    // The easiest way is to use the original match and just replace the inner text and remove fontSize from style.
    
    let newStyle = `{{ `;
    let hasOtherStyles = false;
    
    // We can just use a simple approach: put FitText inside and strip fontSize from style string.
    let newTag = match.replace(/fontSize:\s*'([0-9.]+)cqw',?\s*/, '');
    
    // Replace the inner text with FitText
    newTag = newTag.replace(/\{(supporterName\s*\|\|\s*'[^']+')\}/, `<FitText text={$1} maxFontSizeCqw={${fontSize}} />`);
    
    // If style became empty like `style={{ }}` or `style={{  }}`, remove it entirely
    newTag = newTag.replace(/style=\{\{\s*\}\}/, '');
    
    // Also remove truncate class if it exists since FitText handles size
    newTag = newTag.replace(/\btruncate\b/g, '');

    return newTag;
  });

  // Let's also enforce universal safe margins: p-[4cqw] on the main container.
  // We can look for the main outer div: <div className="... flex flex-col items-center select-none ..." style={{ containerType: 'inline-size' ...}}>
  // and ensure it has p-[4cqw]
  if (!content.includes('p-[4cqw]')) {
    content = content.replace(/className="([^"]*containerType[^"]*|[^"]*font-serif overflow-hidden[^"]*)"/, (m, p1) => {
      if (!p1.includes('p-[')) {
        return `className="${p1} p-[4cqw]"`;
      }
      return m;
    });
    // changed = true; (let's rely on FitText change for saving)
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Fitted Text in ${file}`)
  }
})
