import CistercianSVG from '../CistercianSVG/CistercianSVG'
import { paseNumers } from '../../utils/canvasCistercianPaths'

interface CombinationCardProps {
  number: number
}

const CombinationCard: React.FC<CombinationCardProps> = ({ number }) => {
  const { units, tens, hundreds, thousands } = paseNumers(number)
  
  const parts: string[] = []
  if (thousands > 0) parts.push(`${thousands}k`)
  if (hundreds > 0) parts.push(`${hundreds}c`)
  if (tens > 0) parts.push(`${tens * 10}`)
  if (units > 0) parts.push(`${units}`)
  
  const breakdown = parts.join(' + ')

  return (
    <div className="combination-card">
      <div className="combination-card__svg">
        <CistercianSVG number={number} width={70} height={98} />
      </div>
      <div className="combination-card__number">{number}</div>
      <div className="combination-card__breakdown">{breakdown}</div>
    </div>
  )
}

export default CombinationCard
