export default function Card({ 
  children, 
  className = '',
  hover = false,
  ...props 
}) {
  return (
    <div
      className={`glass-effect rounded-xl p-6 ${
        hover ? 'hover:bg-dark-elevated transition-colors duration-200' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
