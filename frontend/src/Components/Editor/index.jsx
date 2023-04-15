import React from "react";
import Editor from "ckeditor5-custom-build/build/ckeditor";
// if above link not working use below one
// import { Editor as ClassicEditor } from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from "@ckeditor/ckeditor5-react";

const CkEditor = ({ setData }) => {
  return (
    <div>
      <CKEditor
        editor={Editor}
        onReady={(editor) => {
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(e, editor) => {
          const data = editor.getData();
          setData(data);
        }}
      />
    </div>
  );
};

export default CkEditor;
