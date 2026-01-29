import { getAllLines } from '../../utils/canvasCistercianPaths'

interface CistercianSVGProps {
  number: number
  width?: number
  height?: number
  strokeColor?: string
  strokeWidth?: number
}

const CistercianSVG: React.FC<CistercianSVGProps> = ({
  number,
  width = 50,
  height = 70,
  strokeColor = 'currentColor',
  strokeWidth = 2.5
}) => {
  const lines = getAllLines(number)
  
  // Transform coordinates to match SVG viewBox
  // Original coords use center at (0,0) with y going up
  // SVG needs to map to viewBox with y going down
  const transformedPath = lines.map(([x1, y1, x2, y2]) => {
    // Map to viewBox: center at (50, 70), y inverted
    const svgX1 = 50 + x1
    const svgY1 = 70 - y1
    const svgX2 = 50 + x2
    const svgY2 = 70 - y2
    return `M ${svgX1} ${svgY1} L ${svgX2} ${svgY2}`
  }).join(' ')

  return (
    <svg
      viewBox="0 0 100 140"
      width={width}
      height={height}
      role="img"
      aria-label={`Cistercian numeral for ${number}`}
    >
      <path
        d={transformedPath}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

export default CistercianSVG
