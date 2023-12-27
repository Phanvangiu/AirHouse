import React, { useState, useRef, useCallback } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style.scss";
import { useMemo, useEffect } from "react";
import { UploadImageMutation, BlogQueryId, UpdateBlogMutation } from "api/blogApi";


import { BlogCategoryQuery, CategoryValueQuery } from "../../api/blogCategoryApi";
import { useSearchParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";
import { cilCloudUpload } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import "react-loading-skeleton/dist/skeleton.css";
import DefaultImg from "assets/default-img.webp";
import styled from "styled-components";

const StyledImgField = styled.div`
  display: flex;
  flex-direction: column;

  & input {
    display: none;
  }

  & .upload-icon {
    width: 30px;
    margin-right: 5px;
  }

  & button {
    background-color: blue;
    color: white;
    padding: 10px 0px;
    border: 0;
  }

  & img {
    height: 8rem;
    width: max-content;
    margin-bottom: 10px;
    outline: 1px solid rgba(30, 144, 255);
    border: 1px solid rgba(30, 144, 255);
  }
`;

var Font = Quill.import("formats/font");

Font.whitelist = ["arial", "roboto", "raleway", "montserrat", "lato", "rubik"];
Quill.register(Font, true);

var Size = Quill.import("formats/size");
Size.whitelist = ["9px", "10px", "11px", "12px", "14px", "16px", "18px", "20px", "22px", "24px", "26px", "28px"];
Quill.register(Size, true);

const Parchment = Quill.import("parchment");
const boxAttributor = new Parchment.Attributor.Class("box", "line", {
  scope: Parchment.Scope.INLINE,
  whitelist: ["solid", "double", "dotted"],
});
Quill.register(boxAttributor);

const atValues = [
  { id: 0, value: "barcode" },
  { id: 1, value: "customername" },
  { id: 2, value: "licensenumber" },
  { id: 3, value: "netweight" },
  { id: 4, value: "packageid" },
  { id: 5, value: "price" },
  { id: 6, value: "productname" },
  { id: 7, value: "supplierid" },
];

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={(e) => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option value="3" />
      <option value="4" />
      <option value="5" />
      <option value="6" />
      <option defaultValue />
    </select>
    <button className="ql-bold" />
    <button className="ql-underline" />
    <button className="ql-italic" />
    <button className="ql-strike" />
    <select className="ql-font">
      {Font.whitelist.map((font, index) => (
        <option key={index} value={font} defaultValue={!index}>
          {font[0].toUpperCase() + font.substr(1)}
        </option>
      ))}
    </select>
    <select className="ql-size">
      {Size.whitelist.map((size, index) => (
        <option key={index} value={size} defaultValue={size.includes("12")}>
          {size}
        </option>
      ))}
    </select>
    <button className="ql-align" value="" />
    <button className="ql-align" value="center" />
    <button className="ql-align" value="right" />
    <button className="ql-indent" value="-1" />
    <button className="ql-indent" value="+1" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option defaultValue />
    </select>
    <button className="ql-link" />
    <button className="ql-image" />
    <button className="ql-video" />
    <button className="ql-blockquote" />
    <button className="ql-code-block" />
    <button className="ql-list" value="ordered" />
    <button className="ql-list" value="bullet" />
    <button className="ql-direction" value="rtl" />
  </div>
);

const formats = [
  "header",
  "bold",
  "underline",
  "italic",
  "strike",
  "font",
  "size",
  "align",
  "indent",
  "color",
  "list",
  "image",
  "video",
  "blockquote",
  "code-block",
  "bullet",
  "link",
  "direction",
];

export default function UpdateBlog() {
  const [searchParams, setSearchParams] = useSearchParams();
  const chosenId = Number(searchParams.get("id"));
  console.log(chosenId);

  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [error, setError] = useState(null);

  const imgUploadRef = useRef();
  const [imgSrc, setImgSrc] = useState(DefaultImg);

  const queryClient = useQueryClient();
  const blogQuery = BlogQueryId(chosenId);

  const checkChange = () => {
    if (imgUploadRef.current.files.length != 0) {
      setImgSrc(URL.createObjectURL(imgUploadRef.current.files[0]));
      console.log(imgSrc);
    }
  };
  const onUploadImg = (ev) => {
    ev.preventDefault();
    imgUploadRef.current.click();
  };

  useEffect(() => {
    if (blogQuery.isSuccess) {
      setBlogTitle(blogQuery.data.title);
      setBlogContent(blogQuery.data.content);
    }
  }, [blogQuery.status]);

  const updateBlogMutation = UpdateBlogMutation();

  const uploadMutation = UploadImageMutation();

  const { data: createdBlog } = updateBlogMutation;

  const qillRef = useRef();
  const [value, setValue] = useState("");

  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = () => {
      if (input !== null && input.files !== null) {
        const file = input.files[0];

        const formData = new FormData();
        formData.append("image", file);

        uploadMutation.mutate(formData, {
          onSuccess: (data) => {
            const quillEditor = qillRef.current.getEditor();
            const range = quillEditor.getSelection(true);
            quillEditor.insertEmbed(range.index, "image", data.url);
          },
        });
      }
    };
  }, []);

  //fetch date BlogCategory from database

  const { data, isLoading } = CategoryValueQuery();
  // console.log(data, isLoading);

  const modules = useMemo(
    () => ({
      toolbar: {
        handlers: { image: imageHandler },
        container: "#toolbar",
      },
    }),
    []
  );

  const handleChange = (content) => {
    setValue(content);
    setBlogContent(content);
  };
  const handleSubmit = () => {
    const file = imgUploadRef.current.files[0];

    const formData = new FormData();
    const arrCate = Array.from(document.querySelectorAll('input[name="category"]:checked')).map((checkbox) => checkbox.value);

    formData.append("id", document.getElementById("id").value);
    formData.append("title", document.getElementById("title").value);
    arrCate.forEach((cate) => {
      formData.append("category[]", cate);
    });
    formData.append("content", blogContent);
    formData.append("image", file);

    updateBlogMutation.mutate(formData, {
      onSuccess: () => {
        document.getElementById("title").value = "";
        document.querySelectorAll('input[name="category"]:checked').forEach((checkbox) => {
          checkbox.checked = false;
        });
        setValue("");
      },
    });
  };
  return (
    <div className="text-editor">
      <div className="title-block">
        <input type="text" id="id" value={chosenId} readOnly />
        <label htmlFor="">Input Blog Title</label>
        <input
          type="text"
          name="title"
          id="title"
          onChange={(ev) => {
            setBlogTitle(ev.target.value);
          }}
          value={blogTitle}
        />
      </div>

      <div className="blogCate-block">
        <div className="title-block">
          <label htmlFor="" style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            Check Blog Category
          </label>
        </div>
        {!isLoading && data && (
          <ul>
            {data.map((blogCategory) => (
              <li key={blogCategory.id}>
                <input
                  type="checkbox"
                  id={blogCategory.id}
                  name="category"
                  value={blogCategory.id}
                  style={{ transform: "scale(1.3)", margin: "0.5rem" }}
                />
                <label htmlFor={blogCategory.name}>{blogCategory.name}</label>
              </li>
            ))}
          </ul>
        )}
      </div>
      <StyledImgField>
        <label>
          <b>Blog Cover Image</b>
        </label>
        <input ref={imgUploadRef} accept="image/*" onChange={checkChange} type="file" id="image" />
        <img src={imgSrc} alt="img" />
        <button onClick={onUploadImg}>
          <CIcon icon={cilCloudUpload} customClassName="upload-icon" />
          Image Upload Here
        </button>
      </StyledImgField>

      <div className="title-block">
        <label htmlFor="" className="content">
          Input Blog Content
        </label>
      </div>

      <CustomToolbar />
      <ReactQuill
        ref={qillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        value={blogContent}
        onChange={handleChange}
        style={{ height: "350px" }}
      />
      <br />
      {createdBlog && <p style={{ color: "green" }}>Blog {createdBlog.title} updated successfully</p>}
      <button onClick={handleSubmit}>Submit</button>

      <div dangerouslySetInnerHTML={{ __html: value }}></div>
      {value}
    </div>
  );
  // });
}
