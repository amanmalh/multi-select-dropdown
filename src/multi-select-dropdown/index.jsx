import { useEffect, useState } from "react"
import Option from "./option"
import './styles.css'

const MultiSelectDropdown = ({ value = '', options, onChange }) => {
    const [expanded, setExpanded] = useState(false)
    const [selected, setSelected] = useState(value)
    const [filteredDropownOptions, setFilteredDropdownOptions] = useState(options)

    // if options change from parent
    useEffect(() => {
        setFilteredDropdownOptions(options)
    }, [options])

    useEffect(() => {
        onChange(selected)
    }, [selected])


    const getLabel = (optionValue) => {
        const foundOption = options.find(option => option.value === optionValue)
        return foundOption ? foundOption.label : ''
    }
    const addToSelected = (selectedOptions, newValue) => {
        const selectedOptionsList = selectedOptions
            .split(',')
            .filter(val => val)
            .map(item => item.trim())

        if (!selectedOptionsList.includes(newValue)) {
            selectedOptionsList.push(newValue)
        }

        return selectedOptionsList.join(',')
    }

    const removeFromSelected = (selectedOptions, value) => {
        const selectedOptionsList = selectedOptions
            .split(',')
            .map(item => item.trim())

        return selectedOptionsList
            .filter(item => item !== value)
            .join(',')
    }

    const onOptionChange = (idx) => {
        return (isChecked) => {
            if (isChecked) {
                setSelected(prevSelected => addToSelected(prevSelected, filteredDropownOptions[idx].value))
            } else {
                setSelected(prevSelected => removeFromSelected(prevSelected, filteredDropownOptions[idx].value))
            }
        }
    }

    const onFilterChange = (e) => {
        let filterText = e.target.value

        if (filterText) {
            filterText = filterText.toLowerCase()
        }
        setFilteredDropdownOptions(options.filter(option => option.label.toLowerCase().includes(filterText)))
    }

    return <div className="dropdown-container">
        <div className="dropdown-trigger" onClick={() => setExpanded((expanded) => !expanded)}>
            {/* should contain selected options as tags  */}
            <i className="fa-solid fa-arrow-down"></i>
            {selected.split(',').map(option => option.trim()).filter(option => option).map(option => (
                <span key={`option_${option}`}>{getLabel(option)}, </span>
            ))}
        </div>

        {expanded &&
            <div className="dropdown-options-container">
                <div className="dropdown-filter">
                    <input
                        type="text"
                        placeholder="Filter options.."
                        onChange={onFilterChange} />
                </div>
                <div className="dropdown-options">
                    {filteredDropownOptions.map((option, idx) => (
                        <Option
                            key={idx}
                            option={option}
                            checked={selected.includes(option.value)}
                            onChange={onOptionChange(idx)}
                        />
                    ))}
                </div>
            </div>
        }
    </div>
}

export default MultiSelectDropdown