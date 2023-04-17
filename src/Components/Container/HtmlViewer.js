import React from "react";
import './indi.css'
// const HtmlViewer = ({ html }) => {
//     const modifiedHtml = html.replace(/<ol>/g, "<ul>").replace(/<\/ol>/g, "</ul>");
//     const checkboxHtml = modifiedHtml.replace(
//       /<li>([^<]+)<\/li>/g,
//       '<li><input type="checkbox" checked />$1</li>'
//     );
  
//     return <div dangerouslySetInnerHTML={{ __html: checkboxHtml }} />;
//   };

// export default HtmlViewer;
// const HtmlViewer = ({ html }) => {
//     const modifiedHtml = html.replace(/<ol>/g, '<ul class="no-bullet">').replace(/<\/ol>/g, "</ul>");
//     const checkboxHtml = modifiedHtml.replace(
//       /<ul[^>]*>|<\/ul>|<li>([^<]+)<\/li>/g,
//       match => {
//         if (match === "<ul>" || match === "</ul>") {
//           return match;
//         } else {
//           return '<li><input type="checkbox" checked/>' + match.slice(4, -5) + '</li>';
//         }
//       }
//     );
  
//     return <div dangerouslySetInnerHTML={{ __html: checkboxHtml }} />;
//   };
  
//   export default HtmlViewer;

// const HtmlViewer = ({ html }) => {
//     const checkboxHtml = html.replace(
//       /<ol>(.*?)<\/ol>/gs,
//       '<ul class="no-bullet">$1</ul>'
//     ).replace(
//       /<li>(.*?)<\/li>/gs,
//       '<li><input type="checkbox" />$1</li>'
//     );
//     const numberedHtml = html.replace(
//       /<ul>(.*?)<\/ul>/gs,
//       '<ol class="no-bullet">$1</ol>'
//     );
  
//     return (
//       <div>
//         <div dangerouslySetInnerHTML={{ __html: checkboxHtml }} />
//         {/* <div dangerouslySetInnerHTML={{ __html: numberedHtml }} /> */}
//       </div>
//     );
//   };
  
//   export default HtmlViewer;
const HtmlViewer = ({ html }) => {
    const renderedHtml = html.replace(
      /<ul>(.*?)<\/ul>|<ol>(.*?)<\/ol>/gs,
      match => {
        if (match.startsWith("<ul>")) {
          // Handle unordered list
          const listItems = match
            .replace(/<li>(.*?)<\/li>/gs, "<li>$1</li>")
            .replace("<ul>", "<ol class='sd'>")
            .replace("</ul>", "</ol>");
            
          return `<div class="list-wrapper">${listItems}</div>`;
        } else {
          // Handle ordered list
          const listItems = match.replace(
            /<li>(.*?)<\/li>/gs,
            '<li><input type="checkbox" onclick="return false;"/>$1</li>'
          );
          return `<div class="list-wrapper">${listItems}</div>`;
        }
      }
    );
  
    return <div dangerouslySetInnerHTML={{ __html: renderedHtml }} />;
  };
  
  export default HtmlViewer;