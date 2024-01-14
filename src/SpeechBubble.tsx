import classes from './speech-bubble.module.css'

interface SpeechBubbleProps {
  // The text (in HTML markup) to include
  text: string
  // Width of the container element in pixels
  width: number
  // Height of the container element in pixels
  height: number
  // Angle of the tail in degrees, clockwise from right - 45 is right tail, 135 is left tail
  tailAngle: number
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

function SpeechBubble(props: SpeechBubbleProps) {
  const { text, width, height, tailAngle } = props
  const style = { width: `${width}px`, height: `${height}px` }

  // Ellipse perimeter calculations
  const startt = d2r(tailAngle - 5)
  const endt = d2r(tailAngle + 5)

  const [startx, starty] = ellipseCoordinates(startt, width / 2, height / 2)
  const [endx, endy] = ellipseCoordinates(endt, width / 2, height / 2)

  return (
    <div className={classes.bubble} style={style}>
      <svg
        id="svg1"
        width={style.width}
        height={style.height}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="none"
          stroke="black"
          d={`M ${startx + width / 2},${starty + height / 2}
           A ${width / 2} ${height / 2} 0 1 0 ${endx + width / 2},${
             endy + height / 2
           }`}
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

export default SpeechBubble
