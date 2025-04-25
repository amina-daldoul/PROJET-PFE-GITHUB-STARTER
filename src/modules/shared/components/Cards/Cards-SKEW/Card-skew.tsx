import { ReactElement } from 'react'

interface ICardSkewProps {
  children?: ReactElement | ReactElement[]
  color?: 'red-yellow' | 'pink-blue' | 'green-blue'
  autoColors?: number
  onClick?: () => void // ✅ autorise l'utilisation d'onClick
  style?: React.CSSProperties
}

export default function CardSkew({ children, color, autoColors, onClick, style }: ICardSkewProps) {
  const generateColor = (index: number) => {
    const colors = ['red-yellow', 'pink-blue', 'green-blue']
    const colorsIndex = (index - 1) % colors.length
    return colors[colorsIndex]
  }

  const currentColor = color || (autoColors ? generateColor(autoColors) : 'red-yellow')

  return (
    <div className="wrapper" onClick={onClick} style={style}>
      <div className={`box box__${currentColor}`}>
        <span></span>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}
