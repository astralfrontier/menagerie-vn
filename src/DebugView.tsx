import { allSceneTrees } from './scene-tree'

interface DebugViewProps {}

export default function DebugView(props: DebugViewProps) {
  const trees = allSceneTrees()
  return (
    <div className="container">
      <pre>{JSON.stringify(trees, null, 2)}</pre>
    </div>
  )
}
