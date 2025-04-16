import React from 'react'

const About = ({t}) => {
  return (
    <div className='w-full h-[60vh] mb-40 text-white flex flex-col justify-center items-center gap-3'>
        <h1 className='text-6xl md:text-9xl text-center font-bold'>Jotter</h1>
        <p className='text-[14px] md:text-base font-bold'>{t("tagLine")}</p>
        <div className='flex justify-between items-center w-full md:w-1/3 bg-darkPrimary p-4 my-3 px-4 rounded-full'>
            <p className='text-sm'>{t("builtBy")} <span className='md:text-lg font-bold'>ELO</span></p>
            <div className='flex justify-between items-center gap-2'>
                <p title='Message me on Instagram'><a href="https://www.instagram.com/elocodex/"><i className="fa-brands fa-instagram"></i></a></p>
                <p title='Message me on WhatsApp'><a href="https://wa.link/zxmse3"><i className="fa-brands fa-whatsapp"></i></a></p>
                <p title='Check Code on Github'><a href="https://github.com/elocodex"><i className="fa-brands fa-github"></i></a></p>
            </div>
        </div>
    </div>
  )
}

export default About
