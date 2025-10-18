import '../assets/styles/components/Checkbox.scss'

const Checkbox = ({ ...props }) => {
  return (
    <div className="checkbox__container">
      <input className="checkbox__input" id='checkbox' type="checkbox" {...props} />
      <span className="checkbox__checkmark"></span>
    </div>
  )
}

export default Checkbox
