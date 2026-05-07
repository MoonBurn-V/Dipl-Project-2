import './SearchInput.scss'
import Icon from '../Icon/Icon'

export const SearchInput = ({ value, onChange, placeholder }) => {
  return (
    <div className="search-wrapper">
        <input
        className="search-input"
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        />
        <div className="search-icon">
            <Icon name="search-md" />
        </div>
    </div>
  )
}
