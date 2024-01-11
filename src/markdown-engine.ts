import markdownit from 'markdown-it'

const md = markdownit({
  html: false,
  linkify: false,
  typographer: true,
})

// Usage: <div dangerouslySetInnerHTML={{__html: '<p>First &middot; Second</p>'}}></div>

export default function render(input: string, env?: any): string {
  return md.render(input, env)
}
