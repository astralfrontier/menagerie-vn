import { map } from 'ramda'

import classes from './splash-view.module.css'
import DialogueBubble from './DialogueBubble'

export interface SplashScreenAction {
  label: string
  callback: () => void
}

interface SplashViewProps {
  actions: SplashScreenAction[]
}

export default function SplashView(props: SplashViewProps) {
  return (
    <div className={classes.splash}>
      <div className="box has-text-centered">
        <h1 className="title">Menagerie VN Demo</h1>
        {map(
          (action) => (
            <div className="m-2" key={action.label}>
              <a
                className={`button is-link ${classes.choice}`}
                onClick={action.callback}
              >
                {action.label}
              </a>
            </div>
          ),
          props.actions
        )}
      </div>
    </div>
  )
}
