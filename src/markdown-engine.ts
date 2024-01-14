import markdownit from 'markdown-it'
import markdownItAttrs from 'markdown-it-attrs'
// @ts-ignore
import markdownItBracketedSpans from 'markdown-it-bracketed-spans'

const md = markdownit({
  html: false,
  linkify: false,
  typographer: true,
})

md.use(markdownItBracketedSpans)

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: [], // empty array = all attributes are allowed
})

// Usage: <div dangerouslySetInnerHTML={{__html: '<p>First &middot; Second</p>'}}></div>

export default function render(input: string, env?: any): string {
  return md.render(input, env)
}
