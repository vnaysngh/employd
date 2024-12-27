import { useState } from "react";
import Editor from "react-simple-wysiwyg";

function JobDescription() {
  const [html, setHtml] = useState("my <b>HTML</b>");

  function onChange(e: any) {
    setHtml(e.target.value);
  }

  console.log(html);

  return (
    <Editor
      containerProps={{ style: { height: "300px" } }}
      value={html}
      onChange={onChange}
    />
  );
}

export default JobDescription;
