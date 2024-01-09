import { useState } from 'react'
import { SceneMoment } from './scene-engine'
import SpriteView from './SpriteView'

interface MomentViewProps {
  moment: SceneMoment
}

// TODO: delegate to a subcomponent based on moment type
export default function MomentView(props: MomentViewProps) {
  const { moment } = props

  return (
    <div className="columns">
      <div className="column is-4">
        <SpriteView sprite={moment.left} />
      </div>
      <div className="column is-4">
        <article className="message is-primary">
          <div className="message-body">{moment.text}</div>
        </article>
      </div>
      <div className="column is-4">
        <SpriteView sprite={moment.right} />
      </div>
    </div>
  )
}
