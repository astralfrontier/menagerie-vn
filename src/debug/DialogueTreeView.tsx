import { concat, flatten, map, uniq, without } from 'ramda'
import { Scene, SceneMomentType } from '../scene-engine'

interface DialogueTreeViewProps {
  trees: Record<string, Scene>
}

// Return a Mermaid node for a scene, along with any connections
function sceneToMermaid(name: string, scene: Scene): string[] {
  let lines: string[] = []

  // Find all speakers
  const speakers = uniq(
    without(
      [''],
      flatten(
        map((moment) => {
          return map(
            (textRecord) =>
              textRecord.speaker ? (textRecord.speaker.name as string) : '',
            moment.text
          )
        }, scene)
      )
    )
  )

  lines.push(`    ${name}[${name}: ${speakers.join(',')}]\n`)

  // Find branches
  for (let moment of scene) {
    for (let choice of moment.choices) {
      lines.push(`    ${name}-->|${choice.label}|${choice.destination}\n`)
    }
    if (moment.momentType == SceneMomentType.JUMP) {
      lines.push(`    ${name}-->${moment.destination}\n`)
    }
  }

  return lines
}

export default function DialogueTreeView(props: DialogueTreeViewProps) {
  const { trees } = props

  let lines: string[] = ['flowchart TD\n']
  for (let name of Object.keys(trees)) {
    lines = concat(lines, sceneToMermaid(name, trees[name]))
  }

  return (
    <div className="container">
      <p>
        Copy and paste this graph into{' '}
        <a href="https://mermaid.live" target="_blank">
          mermaid.live
        </a>
      </p>
      <pre>{lines}</pre>
    </div>
  )
}
