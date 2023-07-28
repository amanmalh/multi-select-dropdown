import { useState } from 'react'
import MultiSelectDropdown from './multi-select-dropdown'

function App() {

  const [selectedOptions, setSelectedOptions] = useState('')

  const onMultiSelectChange = (selected) => {
    setSelectedOptions(selected)
  }

  const options = [
    { label: 'Cat', value: 'cat' },
    { label: 'Dog', value: 'dog' },
    { label: 'Rat', value: 'rat' },
    { label: 'Elephant', value: 'elephant' }
  ]
  return (
    <>
      <MultiSelectDropdown
        options={options}
        value={'rat, elephant'}
        onChange={onMultiSelectChange}
      />
      {/* 
      {selectedOptions.length > 0 && <div>
        <h2>Selected Values:</h2>
        <ul>
          {selectedOptions.split(',').filter(val => val).map((option, idx) => (
            <li key={idx}>{option}</li>
          ))}
        </ul>
      </div>
      } */}
    </>
  )
}

export default App
