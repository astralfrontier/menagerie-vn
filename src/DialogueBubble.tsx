import classes from './speech-bubble.module.css'

interface DialogueBubbleProps {
  // The text (in HTML markup) to include
  text: string
  // Width of the container element in pixels
  width: number
  // Height of the container element in pixels
  height: number
  // Angle of the tail in degrees, clockwise from right - 45 is right tail, 135 is left tail
  tailAngle: number
}

const PADDING = 5

const FILL_STROKE = {
  fill: 'white',
  stroke: 'black',
  'stroke-width': '5',
}

function d2r(degrees: number): number {
  return (degrees * 2 * Math.PI) / 360
}

// Return X and Y coordinates for a point allong an ellipse's path
// T is in radians
function ellipseCoordinates(
  t: number,
  radiusa: number,
  radiusb: number
): [number, number] {
  const x = radiusa * Math.cos(t)
  const y = radiusb * Math.sin(t)
  return [x, y]
}

function DialogueBubble(props: DialogueBubbleProps) {
  const { text, width, height, tailAngle } = props
  const style = { width: `${width}px`, height: `${height}px` }

  // Ellipse perimeter calculations
  const startt = d2r(tailAngle - 5)
  const endt = d2r(tailAngle + 5)

  const radiusa = width / 2 - PADDING * 2
  const radiusb = height / 2 - PADDING * 2

  const [startx, starty] = ellipseCoordinates(startt, radiusa, radiusb)
  const [endx, endy] = ellipseCoordinates(endt, radiusa, radiusb)

  // Corner defaults to top left
  let corner = [PADDING, PADDING]
  if (tailAngle < 90 || tailAngle > 270) {
    corner[0] = width - PADDING
  }
  if (tailAngle <= 180) {
    corner[1] = height - PADDING
  }

  return (
    <div className={classes.bubble} style={style}>
      <svg
        id="svg1"
        width={style.width}
        height={style.height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points={`${startx + width / 2},${starty + height / 2} ${corner[0]},${
            corner[1]
          } ${endx + width / 2},${endy + height / 2}`}
          fill={FILL_STROKE.fill}
        />
        <path
          {...FILL_STROKE}
          d={`M ${startx + width / 2},${starty + height / 2}
           A ${radiusa} ${radiusb} 0 1 0 ${endx + width / 2},${
             endy + height / 2
           }`}
        />
        <line
          x1={startx + width / 2}
          y1={starty + height / 2}
          x2={corner[0]}
          y2={corner[1]}
          {...FILL_STROKE}
        />
        <line
          x1={endx + width / 2}
          y1={endy + height / 2}
          x2={corner[0]}
          y2={corner[1]}
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

export default DialogueBubble
