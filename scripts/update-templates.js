const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '../app/(personal)/sticker-generator/components/templates')
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx') && !f.includes('SupportCardTemplate'))

files.forEach(file => {
  const filePath = path.join(dir, file)
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  // 1. Add import for FitText
  if (!content.includes('FitText')) {
    content = content.replace(
      "import { TemplateProps } from '../../types'",
      "import { TemplateProps } from '../../types'\nimport { FitText } from '../shared/FitText'"
    )
    changed = true
  }

  // 2. Rename Verified/Status
  const replacements = [
    { from: /Verified Supporter/gi, to: 'Proud Supporter' },
    { from: /VERIFIED SUPPORTER/gi, to: 'PROUD SUPPORTER' },
    { from: /Verified Voter/gi, to: 'Proud Supporter' },
    { from: /VERIFIED VOTER/gi, to: 'PROUD SUPPORTER' },
    { from: /STATUS:<br\/>VERIFIED/g, to: 'STATUS:<br/>ACTIVE' },
    { from: /Official Endorsement/gi, to: 'Campaign Endorsement' }
  ]

  replacements.forEach(r => {
    if (r.from.test(content)) {
      content = content.replace(r.from, r.to)
      changed = true
    }
  })

  // 3. We will do FitText manually for accuracy, or try a regex for the most common pattern:
  // e.g. <h3 ... style={{ fontSize: '4.5cqw' }}>{supporterName || 'YOUR FULL NAME'}</h3>
  // This is too fragile for a simple regex script because fontSize could be in a different order.
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`Updated ${file}`)
  }
})
