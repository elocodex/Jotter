import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import Select from 'react-select'

const LanguageChanger = () => {
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
        { value: 'ar', label: 'Arabic' },
        { value: 'zh', label: 'Chinese' },
        { value: 'es', label: 'Spanish' },
        { value: 'fr', label: 'French' },
        { value: 'hi', label: 'Hindi' },
        { value: 'ig', label: 'Igbo' },
        { value: 'yo', label: 'Yoruba' },
        { value: 'en', label: 'System Default (en)' }
      ];

  const { t, i18n } = useTranslation();

  
  const changeLanguage = (lng) => {
    try {
      i18n.changeLanguage(lng);
      toast.success("Language Changed Successfully!")
    } catch (err) {
      toast.error("Language Change Failed!")
    }
  };

  return (
    <div className='h-[80vh]'>
      <Toaster position='bottom-center' />
        <div className='py-16 text-white'>
        <h1 className='text-4xl text-center font-bold text-white my-10'>{t('langsettings')}</h1>
        <div className='px-4 w-full flex flex-col items-start justify-start gap-4'>
            <h1 className='text-xl font-bold text-white'>{t('changeLang')}</h1>
            <p>Current Language : <span>{t('language')}</span></p>
            <Select
                options={options}
                onChange={(e)=>{
                  changeLanguage(e.value); 
                }}
                styles={customStyles}
                className='w-2/3'
                placeholder="Select Preferred Language"
            />
        </div>
        </div>
    </div>
  );
};

export default LanguageChanger;
