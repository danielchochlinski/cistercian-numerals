import CistercianSVG from '../CistercianSVG/CistercianSVG'

interface ExampleCardProps {
  number: number
  category: 'units' | 'tens' | 'hundreds' | 'thousands'
}

const ExampleCard: React.FC<ExampleCardProps> = ({ number, category }) => {
  return (
    <div className={`example-card example-card--${category}`}>
      <div className="example-card__svg">
        <CistercianSVG number={number} width={50} height={70} />
      </div>
      <span className="example-card__number">{number}</span>
    </div>
  )
}

export default ExampleCard
