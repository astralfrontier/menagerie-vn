import { map } from 'ramda'
import { SceneSpritePosition, SceneText } from './scene-engine'
import render from './markdown-engine'
import DialogueBubble from './DialogueBubble'
import NarrationBubble from './NarrationBubble'

import './TextView.sass'

interface TextViewProps {
  text: SceneText[]
}

export default function TextView(props: TextViewProps) {
  const { text } = props

  console.dir(text)

  return map((t) => {
    let tailAngle = 135
    if (
      t.speaker &&
      t.speaker.position == SceneSpritePosition.CHARACTER_RIGHT
    ) {
      tailAngle = 45
    }
    return (
      <div>
        {t.speaker ? (
          <DialogueBubble
            text={render(t.message)}
            width={400}
            height={300}
            tailAngle={tailAngle}
          />
        ) : (
          <NarrationBubble text={render(t.message)} width={400} height={300} />
        )}
      </div>
    )
  }, text)
}
