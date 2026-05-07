import './Checkbox.scss'

const Checkbox = (props) => {

    const { text } = props

    return (
        <label className="checkbox">
            <input className='checkbox__input' type="checkbox" />
            <span className='checkbox__label' >{text}</span>
        </label>
    )
}

export default Checkbox