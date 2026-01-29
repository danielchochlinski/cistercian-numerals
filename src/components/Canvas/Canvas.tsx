import { useEffect, useRef, useState } from 'react'
import { Canvas as FabricCanvas, Polyline } from 'fabric'
import { getAllLines, VIEWBOX } from '../../utils/canvasCistercianPaths'

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [inputValue, setInputValue] = useState<number | null>(null)
  const fabricCanvasRef = useRef<FabricCanvas | null>(null)

  const downloadSVG = () => {
    const canvas = fabricCanvasRef.current
    if (!canvas) return
    let svgString = canvas.toSVG()

    // ai generated Replace the default viewBox with your coordinate system
    svgString = svgString.replace(
      /viewBox="[^"]*"/,
      `viewBox="${VIEWBOX.minX} ${VIEWBOX.minY} ${VIEWBOX.width} ${VIEWBOX.height}"`
    )
    

    const blob = new Blob([svgString], { type: 'image/svg+xml' })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `cistercian-svg-${inputValue}.svg`

    link.click()

    URL.revokeObjectURL(url)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = new FabricCanvas(canvasRef.current, {
      width: VIEWBOX.width,
      height: VIEWBOX.height,
    })
    //ai generated  Center the drawing: translate to canvas center (200, 300) and flip y-axis
    canvas.viewportTransform = [1, 0, 0, -1, VIEWBOX.width / 2, VIEWBOX.height / 2]
    //end of ai generated code
    fabricCanvasRef.current = canvas

    return () => {
      canvas.dispose()
    }
  }, [])

  useEffect(() => {
    const canvas = fabricCanvasRef.current
    if (!canvas || inputValue === null) return
    canvas.clear()

    const lines = getAllLines(inputValue)
    lines.forEach((coords) => {
      const [x1, y1, x2, y2] = coords
      const polyline = new Polyline([{ x: x1, y: y1 }, { x: x2, y: y2 }], {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
      })
      canvas.add(polyline)
    })
  }, [inputValue])

  return (
    <div className="home-container">
      <div className="canvas-container">
        <canvas ref={canvasRef}>Canvas</canvas>
      </div>
      <div className="input-controls">
        <input
          type="number"
          min="1"
          max="9999"
          value={inputValue === null ? '' : inputValue}
          onChange={(e) => {
              const val = e.target.value
              if (val === '') {
                  setInputValue(null)
                  return
                }
            //ai generated to solve the original input issue
            const numValue = Number(val)
            if (!isNaN(numValue) && numValue >= 1 && numValue <= 9999) {
              setInputValue(numValue)
            }
            //end of ai generated code
          }}
        />
        <button onClick={() => downloadSVG()}>Generate SVG</button>
      </div>
    </div>
  )
}

export default Canvas
