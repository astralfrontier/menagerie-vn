import { map } from 'ramda'
import { SceneText } from './scene-engine'

interface TextViewProps {
  text: SceneText[]
}

export default function TextView(props: TextViewProps) {
  const { text } = props

  return map(
    (t) => (
      <article className={`message ${t.position}`} key={t.message}>
        {t.speaker && (
          <div className="message-header">
            <p>{t.speaker}</p>
          </div>
        )}
        <div className="message-body">{t.message}</div>
      </article>
    ),
    text
  )
}
