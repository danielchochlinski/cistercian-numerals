import { useEffect, useRef, useState } from 'react'
import { Canvas as FabricCanvas, Polyline } from 'fabric'
import { getAllLines, VIEWBOX } from '../../utils/canvasCistercianPaths'
const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [inputValue, setInputValue] = useState<number | null>(null)
const fabricCanvasRef = useRef<FabricCanvas | null>(null); 

useEffect(() => {
  if (!canvasRef.current) return;

  const canvas = new FabricCanvas(canvasRef.current, {
    width: VIEWBOX.width,
    height: VIEWBOX.height,
  });
//ai generated to solve the original canvas issue of being backwards
  canvas.viewportTransform = [
    1, 0, 0,    
    -1,         
    20,        
    30          
  ];

  fabricCanvasRef.current = canvas;
  
  return () => {
    canvas.dispose();
  };
}, []);

useEffect(() => {
  const canvas = fabricCanvasRef.current
  if (!canvas || inputValue === null) return
  canvas.clear()

  const lines = getAllLines(inputValue)
lines.forEach((coords) => {
    const [x1, y1, x2, y2] = coords;
    const polyline = new Polyline([{ x: x1, y: y1 }, { x: x2, y: y2 }], {
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
    });
    canvas.add(polyline);
})
  
}, [inputValue]);

  return (
    <div>

        <canvas ref={canvasRef}>Canvas</canvas>
        <input
          type="number"
          min="1"
          max="9999"
          value={inputValue ?? ''}
          onChange={(e) => {
            const value = e.target.value
            if (!value) {
              setInputValue(null)
            } else {
              const numValue = Number(value)
              if (numValue >= 1 && numValue <= 9999) {
                setInputValue(numValue)
              }
            }
          }}
        />
    </div>
  )
}

export default Canvas