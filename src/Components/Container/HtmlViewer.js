import React, { useEffect, useState } from "react";
import "./indi.css";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
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
const HtmlViewer = ({ html,sopId,userId}) => {
  // const [isChecked, setIsChecked] = useState(false);
  const role = Cookies.get("role");
  const [allChecked, setAllChecked] = useState(false);
  const employeeId = Cookies.get("employeeId");
  // const completeSopApi = async () => {
  //   // setButtonLoading(true);
  //   // setLoading(true);
  //   // var myHeaders = new Headers();
  //   // myHeaders.append('Content-Type', 'application/json');
  //   // myHeaders.append('Authorization', 'Bearer ' + accessToken);
  //   var raw = JSON.stringify({
  //     id: sopId,
  //     sop_assigned_to: userId,
  //     status: 1,
  //   });
  //   var requestOptions = {
  //     method: 'POST',
  //     headers: { 
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + Cookies.get("token") 
  //     },
  //     body: raw,
  //     redirect: 'follow',
  //   };
  //   await fetch(`https://phplaravel-391561-3408566.cloudwaysapps.com/api/employee/sopcheck`, requestOptions)
  //     .then(response => response.json())
  //     .then(result => {
  //       console.log(result);
  //       // setButtonLoading(false);
  //       // setLoading(false);
  //       // navigation.goBack();
  //       // Alert.alert('SOP Completed Successfully!', '', [
  //       //   {text: 'OK', onPress: () => console.log('OK Pressed')},
  //       // ]);
  //     })
  //     .catch(error => {
  //       console.log('', error);
  //       // setButtonLoading(false);
  //       // setLoading(false);
  //       // showMessage({
  //       //   message: 'Error',
  //       //   description: 'Something went wrong, try again later',
  //       //   type: 'danger',
  //       //   icon: 'danger',
  //       // });
  //     });error
  // };

  const completeSopApi = async () => {
    // setButtonLoading(true);
    // var myHeaders = new Headers();
    // myHeaders.append('Content-Type', 'application/json');
    // myHeaders.append('Access-Control-Allow-Origin: ', '*');
    // myHeaders.append('Authorization', 'Bearer ' + Cookies.get("token"));

    console.log("token", Cookies.get("token"))
    var raw = JSON.stringify({
      id: sopId,
      sop_assigned_to: employeeId,
      status: 1,
    });
        var requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get("token") 
      },
      body: raw,
      redirect: 'follow',
    };
    // var requestOptions = {
    //   method: 'POST',
    //   headers: myHeaders,
    //   body: raw,
    //   redirect: 'follow',
    // };
    await fetch('https://phplaravel-391561-3408566.cloudwaysapps.com/api/employee/sopcheck', requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
        // setButtonLoading(false);
    
      })
      .catch(error => {
        console.log('error', error);
        // setButtonLoading(false);
  })
  };
//  const employeeId = useSelector(state => state);
  // useEffect(() => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(html, 'text/html');
  //   const checkboxes = doc.querySelectorAll('input[type="checkbox"]');

  //   const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
  //   setIsChecked(allChecked);

  //   checkboxes.forEach((checkbox) => {
  //     checkbox.addEventListener('click', () => {
  //       const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
  //       setIsChecked(allChecked);
  //     });
  //   });
  // }, [html]);

  // const renderedHtml = html.replace(
  //   /<ul>(.*?)<\/ul>|<ol>(.*?)<\/ol>/gs,
  //   match => {
  //     if (match.startsWith("<ul>")) {
  //       // Handle unordered list
  //       const listItems = match
  //         .replace(/<li>(.*?)<\/li>/gs, "<li>$1</li>")
  //         .replace("<ul>", "<ol class='sd'>")
  //         .replace("</ul>", "</ol>");

  //       return `<div class="list-wrapper">${listItems}</div>`;
  //     } else {
  //       // Handle ordered list
  //       const listItems = match.replace(
  //         /<li>(.*?)<\/li>/gs,
  //         '<li><input type="checkbox" />$1</li>'
  //       );
  //       return `<div class="list-wrapper">${listItems}</div>`;
  //     }
  //   }
  // );
  const renderedHtml = html?.replace(
    /<ul>(.*?)<\/ul>|<ol>(.*?)<\/ol>/gs,
    (match) => {
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
          '<li><input type="checkbox" />$1</li>'
        );
        const classAttribute = match.match(/class\s*=\s*"(.+?)"/);
        const olClass = classAttribute
          ? `class="${classAttribute[1]} checkbox-list"`
          : 'class="checkbox-list"';

        return `<div class="list-wrapper">${listItems.replace(
          /<ol>/,
          `<ol ${olClass}>`
        )}</div>`;
      }
    }
  );
  useEffect(() => {
    console.log("moin",employeeId)
    const checkboxes = document.querySelectorAll(
      '.list-wrapper input[type="checkbox"]'
    );
    const handleChange = () => {
      const areAllChecked = Array.from(checkboxes).every(
        (checkbox) => checkbox.checked
      );
      setAllChecked(areAllChecked);
    };
    checkboxes.forEach((checkbox) =>
      checkbox.addEventListener("click", handleChange)
    );
    return () =>
      checkboxes.forEach((checkbox) =>
        checkbox.removeEventListener("click", handleChange)
      );
  }, [renderedHtml]);
  // useEffect(() => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(renderedHtml, 'text/html');
  //   const lists = doc.querySelectorAll('.checkbox-list');

  //   lists.forEach((list) => {
  //     const items = list.getElementsByTagName('li');

  //     for (let i = 0; i < items.length; i++) {
  //       const checkbox = document.createElement('input');
  //       checkbox.type = 'checkbox';
  //       checkbox.addEventListener('click', () => {
  //         const checkboxes = list.querySelectorAll('input[type="checkbox"]');
  //         const allChecked = Array.from(checkboxes).every((checkbox) => checkbox.checked);
  //         setIsChecked(allChecked);
  //         console.log("checkbox",checkbox.checked)
  //       });
  //       items[i].prepend(checkbox);
  //     }
  //   });
  // }, [renderedHtml]);
  return (
    <>
      {role == "company" ? (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: renderedHtml }}
        />
      ) : (
        <>
          {" "}
          <div
            className="content"
            dangerouslySetInnerHTML={{ __html: renderedHtml }}
          />{" "}
          <div
            style={{ display: "flex", width: "fit-content", margin: "auto" }}
          >
            {/* <button
              className="button"
              onClick={() => {
                console.log(isChecked);
              }}
            >
              Done
            </button> */}
    { allChecked  &&  <button onClick={()=>{completeSopApi()}} disabled={!allChecked}>Submit</button>}
          </div>
        </>
      )}
    </>
  );
};

export default HtmlViewer;
