import { map } from 'ramda'
import { SceneText } from './scene-engine'
import render from './markdown-engine'

interface TextViewProps {
  text: SceneText[]
}

export default function TextView(props: TextViewProps) {
  const { text } = props

  return map(
    (t) => (
      <div className="box">
        {t.speaker && <h1 className="title">{t.speaker}</h1>}
        <div className="content">
          <p
            className="komika"
            dangerouslySetInnerHTML={{ __html: render(t.message) }}
          ></p>
        </div>
      </div>
    ),
    text
  )
}
