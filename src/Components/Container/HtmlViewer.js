import React, { useEffect, useState } from "react";
import "./indi.css";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const HtmlViewer = ({ html,sopId,userId}) => {
  const role = Cookies.get("role");
  const [allChecked, setAllChecked] = useState(false);
  const employeeId = Cookies.get("employeeId");


  const completeSopApi = async () => {
   
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

  const renderedHtml = html?.replace(
    /<ul>(.*?)<\/ul>|<ol>(.*?)<\/ol>/gs,
    (match) => {
      if (match.startsWith("<ul>")) {
      
        const listItems = match
          .replace(/<li>(.*?)<\/li>/gs, "<li>$1</li>")
          .replace("<ul>", "<ol class='sd'>")
          .replace("</ul>", "</ol>");

        return `<div class="list-wrapper">${listItems}</div>`;
      } else {
 
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
