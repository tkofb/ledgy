import './FeatureCard.css'

interface props{
  icon: React.ReactElement,
  message: string
}

export const FeatureCard = (props: props) => {
  return (
    <div className='featureCard'>
        {props.icon}
        <h5>{props.message}</h5>
    </div>
  )
}
