import { useEffect, useState } from "react"

const Option = ({ option, checked = false, onChange }) => {
    const [isChecked, setIsChecked] = useState(checked)

    // parent changes check value
    useEffect(() => {
        setIsChecked(checked)
    }, [checked])

    useEffect(() => {
        onChange(isChecked)
    }, [isChecked])

    // user clicks on checkbox
    const onCheckChange = (e) => {
        setIsChecked(e.target.checked)
    }

    // user clicks anywhere on option
    const toggleCheck = () => {
        setIsChecked(prev => !prev)
    }

    return <>
        <div className="dropdown-option" onClick={toggleCheck}>
            <input type="checkbox" checked={isChecked} onChange={onCheckChange} />
            {option.label}
        </div>
    </>
}

export default Option