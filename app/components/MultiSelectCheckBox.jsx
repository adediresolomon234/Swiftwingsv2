"use client"

const MultiSelectCheckbox = ({ label, options, selectedValues, onChange }) => {
  const handleToggle = (value) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    onChange(newValues)
  }

  return (
    <div className="space-y-2">
      <label className="text-sm text-swGray800">{label}</label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {options.map((option) => (
          <label key={option} className="text-swGray800 text-sm flex gap-2 items-center cursor-pointer">
            <input
              type="checkbox"
              checked={selectedValues.includes(option)}
              className="h-4 w-4 text-swPrimary500 border-gray-300 rounded focus:ring-swPrimary500 accent-swPrimary500"
              onChange={() => handleToggle(option)}
            />
            <p>{option}</p>
          </label>
        ))}
      </div>
    </div>
  )
}

export default MultiSelectCheckbox