import { execSync } from 'child_process'
import fs from 'fs'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerDef from './swaggerDef.js'

const options = {
  definition: swaggerDef,
  apis: ['../app.js'],
}

// 1. OpenAPI JSON 생성
const swaggerSpec = swaggerJSDoc(options)
fs.writeFileSync('./openapi.json', JSON.stringify(swaggerSpec, null, 2))

// 2. Markdown으로 변환 (widdershins)
execSync(
  'npx widdershins openapi.json -o ./_api.md --summary --language_tabs javascript',
)

// 3. 템플릿 읽기
const template = fs.readFileSync('./README.template.md', 'utf8')
const apiDoc = fs.readFileSync('./_api.md', 'utf8')

// 4. 마커 사이 영역만 교체
const startTag = '<!-- API-DOCS:START -->'
const endTag = '<!-- API-DOCS:END -->'

const startIndex = template.indexOf(startTag)
const endIndex = template.indexOf(endTag)

if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
  console.error(
    '❌ README.template.md에 API-DOCS 마커가 없거나 순서가 잘못되었습니다.',
  )
  process.exit(1)
}

// 마크다운 스타일 조정 (간단한 커스터마이징 예시)
const styledDoc = apiDoc
  .replace(/^# /gm, '## ') // 제목을 한 단계 내림
  .replace(/^\*\*(.*?)\*\*/gm, '_$1_') // 진하게 → 기울임

const newReadme = [
  template.slice(0, startIndex + startTag.length),
  '\n\n',
  styledDoc.trim(),
  '\n\n',
  template.slice(endIndex),
].join('')

fs.writeFileSync('./ReferenceAPI.md', newReadme)
console.log('✅ README.md 생성 완료!')
