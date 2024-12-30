import { useState } from "react";
import Editor from "react-simple-wysiwyg";

function JobDescription({
  jobDescription,
  setJobDescription
}: {
  jobDescription: string;
  setJobDescription: (item: string) => void;
}) {
  function onChange(e: any) {
    setJobDescription(e.target.value);
  }

  return (
    <Editor
      containerProps={{ style: { height: "300px" } }}
      value={jobDescription}
      onChange={onChange}
    />
  );
}

export default JobDescription;
