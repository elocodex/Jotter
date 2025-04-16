import React, { useEffect, useState } from 'react'
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import toast, { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import { useParams } from 'react-router-dom';

const BottomBar = ({ onDelete, onEdit, canEdit, sendNotification, note }) => {

  const {noteId} = useParams()
  const [showOptions, setShowOptions] = useState(false); // State to toggle visibility
  const toggleOptions = () => {
    setShowOptions(!showOptions); // Toggle the visibility
  };

  const downloadTxtFile = () => {
    try {
      const fileContent = `**${note.title.toUpperCase()}**\n\n${note.content}`;
      const blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${note.title}.txt`);
      toast.success("Download as .txt file Successful!")
    } catch (err) {
      toast.error("Download as .txt file Failed!")
    }
  };

  const downloadPdfFile = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.text(note.title, 10, 10);
      doc.setFont("helvetica", "normal");
      doc.text(note.content, 10, 20);
      doc.save(`${note.title}.pdf`);
      toast.success("Download as Pdf Successful!")
    } catch (err) {
      toast.error("Download as Pdf failed!")
    }
  };

  const downloadDocxFile = async () => {
    try {
      const doc = new Document({
        sections: [
          {
            children: [
              new TextRun({
                text: note.title,
                bold: true,
              }),
              new Paragraph({
                children: [new TextRun(note.content)],
              }),
            ],
          },
        ],
      });
      const blob = await Packer.toBlob(doc);
      saveAs(blob, `${note.title}.docx`);
      toast.success("Download as Docx file Succesful!")
    } catch (err) {
      toast.error("Download as Docx file Failed!")
    }
  }

  return (
    <div className='w-full flex items-center justify-center'>
      <Toaster position='top-center' />
        <div className='text-white fixed bottom-3 w-[98%] h-16 bg-primary rounded-2xl px-4 flex items-center justify-center gap-5'>
          <div title='Edit Note' onClick={onEdit} className={`${canEdit == false ? 'pointer-events-none cursor-not-allowed hover:bg-bg-black/70' : 'cursor-pointer hover:bg-black'} w-20 h-10 rounded-lg bg-black/70 cursor-pointer transition-colors flex items-center justify-center`}><i className={`${canEdit == false ? '' : 'text-green-500'} ${canEdit == false ? 'fa-solid fa-pen' : 'fa-solid fa-check'}`}></i></div>
          <div onClick={toggleOptions} className='w-20 h-10 rounded-lg bg-black/70 hover:bg-black cursor-pointer transition-colors flex items-center justify-center'>
            <i className="fa-solid fa-cloud-arrow-down relative"></i>
            <AnimatePresence>
              {showOptions && (
                <motion.div 
                initial={{x:100,opacity:0}}
                animate={{x: 0,opacity:1}}
                exit={{ x: 100, opacity:0}}
                transition={{ type: 'tween', duration: .7 }}
                className='mt-2 absolute right-0 bottom-20 md:bottom-40 w-[100%] md:w-[20%] h-auto rounded-md p-2 flex flex-col bg-darkPrimary items-center gap-8'>
                  <button className='text-md w-full flex flex-col font-semibold bg-black hover:bg-white/70 transition-all hover:text-black items-center p-4 rounded-md lg:flex-row md:gap-2 ' onClick={() => {downloadTxtFile() ;setShowOptions(false)}}><i  title='.txt' className="fa-regular fa-file"></i>Download as Text file</button>
                  <button className='text-md w-full flex flex-col font-semibold bg-black hover:bg-white/70 transition-all hover:text-black items-center p-4 rounded-md lg:flex-row md:gap-2 ' onClick={() => {downloadPdfFile() ;setShowOptions(false)}}><i title='.pdf' className="fa-regular fa-file-pdf"></i>Download as PDF</button>
                  <button className='text-md w-full flex flex-col font-semibold bg-black hover:bg-white/70 transition-all hover:text-black items-center p-4 rounded-md lg:flex-row md:gap-2 ' onClick={() => {downloadDocxFile() ;setShowOptions(false)}}><i title='.docx' className="fa-regular fa-file-word"></i>Download as Docx File</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div onClick={onDelete} className='w-20 h-10 rounded-lg bg-black/70 hover:bg-black cursor-pointer transition-colors flex items-center justify-center'><i className=" transition-all fa-solid fa-trash hover:text-red-500"></i>
          </div>
        </div>
    </div>
  )
}

export default BottomBar
