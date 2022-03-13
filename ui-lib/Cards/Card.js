import style from './card.module.scss'
const Card = ({children}) => {
    return (
        <>
            <div className={`card ${style.cardbox}`} style={{width:"18rem"}}>
                   {children}
            </div>
        </>
    )
}

export default Card