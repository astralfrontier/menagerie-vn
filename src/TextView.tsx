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

  return text.map((t: SceneText, i: number) => {
    const linesInMessage = t.message.split('\n').length
    const height = 150 + 100 * Math.floor(linesInMessage / 2)
    let tailAngle: number = 0
    if (
      t.speaker &&
      t.speaker.position == SceneSpritePosition.CHARACTER_RIGHT
    ) {
      tailAngle = i > 0 ? 315 : 45
    } else {
      tailAngle = i > 0 ? 225 : 135
    }
    return (
      <>
        {t.speaker ? (
          <DialogueBubble
            text={render(t.message)}
            width={400}
            height={height}
            tailAngle={tailAngle}
          />
        ) : (
          <NarrationBubble
            text={render(t.message)}
            width={400}
            height={height}
          />
        )}
      </>
    )
  })
}
