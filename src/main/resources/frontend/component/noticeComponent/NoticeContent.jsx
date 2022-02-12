import React, {useRef} from 'react';
import JoditEditor from "jodit-react";

const NoticeContent = ({contentValue, contentOnChange }) => {
  const editor = useRef(null);

  const handleOnChange = (content) => {
    contentOnChange(content);
  }

  const fileUpload = (data) => {
    console.log(data)
  }

  const config = { // http://rmamuzic.rs/node_modules/jodit/examples/index.html
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: 500,
    // theme: 'dark'
    language : 'ko',
    uploader: {
      url: 'connector/upload.php',
      format: 'json',
      pathVariableName: 'path',
      filesVariableName: function (r) {
        return 'images'
      },
      prepareData: function (data) {
        return data;
      },
      isSuccess: function (resp) {
        return !resp.error;
      },
      getMsg: function (resp) {
        return resp.msg.join !== undefined ? resp.msg.join(' ') : resp.msg;
      },
      process: function (resp) {
        return {
          files: resp[this.options.uploader.filesVariableName] || [],
          path: resp.path,
          baseurl: resp.baseurl,
          error: resp.error,
          msg: resp.msg
        };
      },
    }
  };

    return (
        <div className="board-content-wrapper">
          <JoditEditor
              ref={editor}
              value={contentValue}
              heigth={400}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => handleOnChange(newContent)}
              onChange={() => handleOnChange}
          />
        </div>
    );
}

export default NoticeContent;