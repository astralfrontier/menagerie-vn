import classes from './speech-bubble.module.css'

interface NarrationBubbleProps {
  // The text (in HTML markup) to include
  text: string
  // Width of the container element in pixels
  width: number
  // Height of the container element in pixels
  height: number
}

const PADDING = 5

const FILL_STROKE = {
  fill: 'white',
  stroke: 'black',
  strokeWidth: '5',
}

/*
 * For an ellipse-type narration box:
         <ellipse
          cx={width / 2}
          cy={height / 2}
          rx={radiusa}
          ry={radiusb}
          {...FILL_STROKE}
        /> 
 */

function NarrationBubble(props: NarrationBubbleProps) {
  const { text, width, height } = props
  const style = { width: `${width}px`, height: `${height}px` }

  return (
    <div className={classes.bubble}>
      <svg
        id="svg1"
        width="100%"
        height="auto"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMin meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={PADDING}
          y={PADDING}
          width={width - 2 * PADDING}
          height={height - 2 * PADDING}
          rx={15}
          {...FILL_STROKE}
        />
        <foreignObject x="0" y="0" width={style.width} height={style.height}>
          <div className={`content ${classes.centered}`}>
            <p
              className="komika"
              dangerouslySetInnerHTML={{ __html: text }}
            ></p>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

export default NarrationBubble
