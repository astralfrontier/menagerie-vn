import { map } from 'ramda'

import classes from './splash-view.module.css'
import SpeechBubble from './SpeechBubble'

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
        <aside className="menu">
          <ul className="menu-list">
            {map(
              (action) => (
                <li key={action.label}>
                  <a className="is-active" onClick={action.callback}>
                    {action.label}
                  </a>
                </li>
              ),
              props.actions
            )}
          </ul>
        </aside>
      </div>
    </div>
  )
}
