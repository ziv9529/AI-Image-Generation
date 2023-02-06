import React from 'react'
import { formFieldModel } from '../models/formFieldModel'

const FormField = (props: formFieldModel) => {
  const { LableName, type, handleChange, name, placeholder, value, handleSurpriseMe, isSurpriseMe } = props
  return (
    <div>
      <div className='flex items-center gap-2 mb-2 '>
        <label htmlFor={name} className="block text-sm font-medium text-grey-900">{LableName}</label>
        {isSurpriseMe && handleSurpriseMe && (
          <button type='button' onClick={handleSurpriseMe} className="font-semibold text-xs bg-[#ECECF1] py-1 px-2 rounded-[5px] text-black">
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#6469ff] focus:border-[#6469ff] outline-none block w-full p-3 '
      />
    </div>
  )
}

export default FormField