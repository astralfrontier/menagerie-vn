import { useState } from 'react'
import { allSceneTrees } from '../scene-tree'
import DialogueTreeView from './DialogueTreeView'
import { addIndex, map } from 'ramda'
import GameStateView from './GameStateView'

export default function DebugView() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const trees = allSceneTrees()

  const tabs = [
    {
      label: 'Dialogue Tree',
      component: <DialogueTreeView trees={trees} />,
    },
    {
      label: 'Game State',
      component: <GameStateView />,
    },
  ]

  return (
    <div className="container">
      <div className="tabs">
        <ul>
          {addIndex(map)(
            (item: any, idx: number) => (
              <li className={idx == activeTab ? 'is-active' : ''}>
                <a onClick={() => setActiveTab(idx)}>{item.label}</a>
              </li>
            ),
            tabs
          )}
        </ul>
      </div>
      {tabs[activeTab].component}
    </div>
  )
}
