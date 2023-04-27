import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './myy-snow.css';

function Editor({setSop , contents,onChange}) {
  const [content, setContent] = useState(contents);

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
  // useEffect(() => {
  //   setContent(contents)
  // }, [])
  // const quillInstance = quillRef.current.getEditor();
useEffect(() => {
  //  console.log("safer",quillRef.current.getEditor().root.innerHTML)

  // if(contents==""){
    // console.log("safer1",content)

    // setContent(''); // or 
    // quillInstance.setText('');
    // setSop('')
    //  quillInstance = quillRef.current.getEditor();
    //  quillInstance.setContents([]);
    // setContent('');
  // }else{
   setSop(content)
  // }
  //  if(contents==""){
  //   console.log("safer1",content)

  //   setContent(''); // or 
  //   quillInstance.setText('');
  //   setSop('')
  //   quillInstance.setContent('');
  //  }
}, [content])
// useEffect(() => {if(contents == ""){setContent(contents)}}, [contents])

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
  const handleClick = () => {
    setSop(content)
    const quillInstance = quillRef.current.getEditor();
    const editorContent = quillInstance.root.innerHTML;

    // Do something with the content (e.g., display in an alert or console.log)
    console.log(editorContent);

    // Clear the editor content
    quillInstance.setContents([]);
  };
  return (
    <div style={{width: "98%",margin: "0px auto"}}> 
      <div>
        {/* <button onClick={handleBold}>Bold</button>
        <button onClick={handleItalic}>Italic</button>
        <button onClick={handleUnderline}>Underline</button>
        <button onClick={handleUnorderedList}>Unordered List</button>
        <button onClick={handleOrderedList}>Ordered List</button>
        <button onClick={handleImageUpload}>Upload Image</button> */}
        <input type="file" accept="image/*" style={{ display: 'none' }} ref={inputRef} onChange={handleFileChange} />
      </div>
      <ReactQuill ref={quillRef} value={contents} onChange={onChange} modules={modules} />
      {/* <button onClick={handleClick}>Get HTML and Clear Editor</button> */}

    </div>
  );
}

export default Editor;
