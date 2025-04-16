import React from 'react'
import Select from 'react-select'

const Preferences = () => {

    const customStyles = {
        control: (provided) => ({
          ...provided,
          border: '1px solid #141414',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          padding: '5px',
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.6)' : '#141414', 
          color: '#FFF',
          cursor: 'pointer',
        }),
        singleValue: (provided) => ({
          ...provided,
          color: '#FFF',
        }),
      };

      const options = [
        { value: 'dark', label: 'Dark Mode' },
        { value: 'light', label: 'Light Mode' },
        { value: 'system', label: 'System Default' },
      ];

  return (
    <div className='h-[80vh]'>
        <div className='py-16 text-white'>
            <h1 className='text-4xl text-center font-bold'>Preferences</h1>

            <div className='text-secondary w-3/6 my-20 mx-10 p-3'>
                {/* <div className='spinner-loader'></div> */}
                <p className='text-white text-xl my-3'>Themes Selector</p>
                <p className='my-2 text-white/70'>Current Theme : <span className='text-md font-bold'>Light Theme</span></p>
                <Select
                    options={options}
                    styles={customStyles}
                    placeholder="Select Mode"
                />
            </div>

        </div>
    </div>
  )
}

export default Preferences
