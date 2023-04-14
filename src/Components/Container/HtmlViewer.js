import React from "react";

const HtmlViewer = ({ html }) => {
  return <div style={{width:"fit-content",margin:"0 auto"}}  dangerouslySetInnerHTML={{ __html: html }} />;
};

export default HtmlViewer;