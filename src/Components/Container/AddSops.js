import React from 'react';
import { useRef, useEffect } from 'react';
import EditorJS from '@editorjs/editorjs';
import { createReactEditorJS } from 'react-editor-js'
import  {EDITOR_JS_TOOLS } from './tool'
import Embed from '@editorjs/embed'
import Table from '@editorjs/table'
import List from '@editorjs/list'
import Warning from '@editorjs/warning'
import Code from '@editorjs/code'
import LinkTool from '@editorjs/link'
import Image from '@editorjs/image'
import Raw from '@editorjs/raw'
import Header from '@editorjs/header'
import Quote from '@editorjs/quote'
import Marker from '@editorjs/marker'
import CheckList from '@editorjs/checklist'
import Delimiter from '@editorjs/delimiter'
import InlineCode from '@editorjs/inline-code'
import SimpleImage from '@editorjs/simple-image'
const ReactEditorJS = createReactEditorJS()

function AddSops() {
const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current) {
      const editor = new EditorJS({
        holder: editorRef.current,
        autofocus: true,
        initialBlock: 'toolbox',
        tools: {
          header: {
            class: Header,
            inlineToolbar: true,
          },
          list: {
            class: List,
            inlineToolbar: true,
            
          },
          checkList: {
            class: CheckList,
            inlineToolbar: true,
          },
        },
      });
    }else{
      return
    }
  }, []);

  return (
    <React.Fragment>
                 <div className='container-sop'>
            <h3>Add SOP</h3>
            <div className='sop-container-row'>
            <div className='moon' ref={editorRef}></div>
           </div>
            </div>
    </React.Fragment>
  )
}

export default AddSops