import React, { useState, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './myy-snow.css';

function Editor() {
  const [content, setContent] = useState('');
  const inputRef = useRef(null);
  const quillRef = useRef(null);

  const handleBold = () => {
    quillRef.current.format('bold', true);
  };

  const handleItalic = () => {
    quillRef.current.format('italic', true);
  };

  const handleUnderline = () => {
    quillRef.current.format('underline', true);
  };

  const handleUnorderedList = () => {
    quillRef.current.format('list', 'bullet', true);
  };

  const handleOrderedList = () => {
    quillRef.current.format('list', 'ordered', true);
  };

  const handleImageUpload = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const range = quillRef.current.getEditor().getSelection(true);
      const index = range.index + range.length;

      quillRef.current.getEditor().insertEmbed(index, 'image', event.target.result);
    };

    reader.readAsDataURL(file);
  };

  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ list: 'bullet' }, { list: 'ordered' }],
    
      ['image'],
    ],
  };

  return (
    <div style={{width: "90%",margin: "0 auto"}}> 
      <div>
        {/* <button onClick={handleBold}>Bold</button>
        <button onClick={handleItalic}>Italic</button>
        <button onClick={handleUnderline}>Underline</button>
        <button onClick={handleUnorderedList}>Unordered List</button>
        <button onClick={handleOrderedList}>Ordered List</button>
        <button onClick={handleImageUpload}>Upload Image</button> */}
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={handleFileChange} />
      </div>
      <ReactQuill ref={quillRef} value={content} onChange={setContent} modules={modules} />
    </div>
  );
}

export default Editor;
