import 'katex/dist/katex.min.css'
import katex from 'katex'

export default function MathExpression({
  children,
  className = '',
  inline = false,
  displayMode = false,
}) {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: !inline && displayMode, // displayMode только если не inline
  })

  const Tag = inline ? 'span' : 'div'

  return (
    <Tag
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
