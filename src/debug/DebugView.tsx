import { useState } from 'react'
import { allSceneTrees } from '../scene-tree'
import DialogueTreeView from './DialogueTreeView'
import { addIndex, map } from 'ramda'

export default function DebugView() {
  const [activeTab, setActiveTab] = useState<number>(0)
  const trees = allSceneTrees()

  const tabs = [
    {
      label: 'Dialogue Tree',
      component: <DialogueTreeView trees={trees} />,
    },
  ]

  return (
    <div className="container">
      <div className="tabs">
        <ul>
          {addIndex(map)(
            (item: any, idx: number) => (
              <li>
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
