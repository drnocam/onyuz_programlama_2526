import { useState, useRef, useEffect } from "react";

const BI = {
  folder: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M.54 3.87.5 3a2 2 0 0 1 2-2h3.19a2 2 0 0 1 1.345.51l.33.33A1 1 0 0 0 8.5 2h3.98a2 2 0 0 1 1.994 1.807L14.5 4h-13z"/>
      <path d="M.5 4v8a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V4z"/>
    </svg>
  ),
  folderOpen: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M1 3.5A1.5 1.5 0 0 1 2.5 2h2.764c.958 0 1.76.56 2.311 1.184C7.985 3.648 8.48 4 9 4h4.5A1.5 1.5 0 0 1 15 5.5v.64c.57.265.94.876.856 1.546l-.64 5.124A2.5 2.5 0 0 1 12.733 15H3.266a2.5 2.5 0 0 1-2.481-2.19l-.64-5.124A1.5 1.5 0 0 1 1 6.14V3.5zm2-1a.5.5 0 0 0-.5.5v2.5H13v-.5a.5.5 0 0 0-.5-.5H9c-.964 0-1.76-.56-2.311-1.184C6.015 3.352 5.52 3 5 3H3a.5.5 0 0 0-.5.5v.5h-1V3z"/>
    </svg>
  ),
  fileEarmark: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
    </svg>
  ),
  fileCode: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      <path d="M8.646 6.646a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L10.293 9 8.646 7.354a.5.5 0 0 1 0-.708zm-1.292 0a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0 0 .708l2 2a.5.5 0 0 0 .708-.708L5.707 9l1.647-1.646a.5.5 0 0 0 0-.708z"/>
    </svg>
  ),
  image: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M6.502 7a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
      <path d="M14 14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5V14zM9.5 3A1.5 1.5 0 0 1 11 4.5h2l-4-3v1.5zm.5 10v-3l-2.5-3-4 5h9.5z"/>
    </svg>
  ),
  chevronRight: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  ),
  chevronDown: (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  ),
  arrowUp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 0 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
    </svg>
  ),
  search: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
  ),
  house: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
    </svg>
  ),
  grid: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
    </svg>
  ),
  list: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
    </svg>
  ),
  bell: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z"/>
    </svg>
  ),
  person: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.029 10 8 10c-2.029 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
    </svg>
  ),
  gear: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
      <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.892 3.433-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.892-1.64-.901-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
    </svg>
  ),
  database: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4.318 2.687C5.234 2.271 6.536 2 8 2s2.766.27 3.682.687C12.644 3.125 13 3.627 13 4c0 .374-.356.875-1.318 1.313C10.766 5.729 9.464 6 8 6s-2.766-.27-3.682-.687C3.356 4.875 3 4.373 3 4c0-.374.356-.875 1.318-1.313ZM13 5.698V7c0 .374-.356.875-1.318 1.313C10.766 8.729 9.464 9 8 9s-2.766-.27-3.682-.687C3.356 7.875 3 7.373 3 7V5.698c.271.202.58.378.904.525C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 5.698ZM14 4c0-1.007-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1s-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4v9c0 1.007.875 1.755 1.904 2.223C4.978 15.71 6.427 16 8 16s3.022-.289 4.096-.777C13.125 14.755 14 14.007 14 13V4Zm-1 4.698V10c0 .374-.356.875-1.318 1.313C10.766 11.729 9.464 12 8 12s-2.766-.27-3.682-.687C3.356 10.875 3 10.373 3 10V8.698c.271.202.58.378.904.525C4.978 9.71 6.427 10 8 10s3.022-.289 4.096-.777A4.92 4.92 0 0 0 13 8.698Zm0 3V13c0 .374-.356.875-1.318 1.313C10.766 14.729 9.464 15 8 15s-2.766-.27-3.682-.687C3.356 13.875 3 13.373 3 13v-1.302c.271.202.58.378.904.525C4.978 12.71 6.427 13 8 13s3.022-.289 4.096-.777c.324-.147.633-.323.904-.525Z"/>
    </svg>
  ),
  barChart: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
    </svg>
  ),
  x: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  ),
  arrowLeft: (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
      <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
  ),
  clockHistory: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z"/>
      <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z"/>
      <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z"/>
    </svg>
  ),
};

const FILE_ICON_COLORS = {
  folder: "text-warning",
  jsx: "text-info",
  js: "text-warning",
  ts: "text-info",
  tsx: "text-info",
  css: "text-secondary",
  png: "text-success",
  jpg: "text-success",
  svg: "text-accent",
  default: "text-base-content/60",
};

const getFileIcon = (name, type) => {
  if (type === "folder") return <span className="text-warning">{BI.folderOpen}</span>;
  const ext = name.split(".").pop();
  if (["png", "jpg", "jpeg", "svg", "gif"].includes(ext)) return <span className="text-success">{BI.image}</span>;
  if (["js", "ts", "jsx", "tsx", "css"].includes(ext)) return <span className="text-info">{BI.fileCode}</span>;
  return <span className="text-base-content/50">{BI.fileEarmark}</span>;
};

const TREE_DATA = [
  {
    id: "src", name: "src", type: "folder", children: [
      {
        id: "components", name: "components", type: "folder", children: [
          { id: "AppShell.jsx", name: "AppShell.jsx", type: "file" },
          { id: "Sidebar.jsx", name: "Sidebar.jsx", type: "file" },
          { id: "Breadcrumbs.jsx", name: "Breadcrumbs.jsx", type: "file" },
        ]
      },
      {
        id: "pages", name: "pages", type: "folder", children: [
          { id: "index.jsx", name: "index.jsx", type: "file" },
          { id: "dashboard.jsx", name: "dashboard.jsx", type: "file" },
        ]
      },
      {
        id: "assets", name: "assets", type: "folder", children: [
          { id: "logo.svg", name: "logo.svg", type: "file" },
          { id: "banner.png", name: "banner.png", type: "file" },
        ]
      },
      { id: "App.jsx", name: "App.jsx", type: "file" },
      { id: "main.jsx", name: "main.jsx", type: "file" },
    ]
  },
  { id: "public", name: "public", type: "folder", children: [
    { id: "favicon.ico", name: "favicon.ico", type: "file" },
    { id: "index.html", name: "index.html", type: "file" },
  ]},
  { id: "package.json", name: "package.json", type: "file" },
  { id: "vite.config.js", name: "vite.config.js", type: "file" },
  { id: "tailwind.config.js", name: "tailwind.config.js", type: "file" },
];

const FLAT_FILES = [];
const flatten = (nodes, path = []) => {
  nodes.forEach(n => {
    FLAT_FILES.push({ ...n, path: [...path, n.name].join("/") });
    if (n.children) flatten(n.children, [...path, n.name]);
  });
};
flatten(TREE_DATA);

function TreeNode({ node, depth = 0, onNavigate }) {
  const [open, setOpen] = useState(depth === 0);
  const isFolder = node.type === "folder";
  return (
    <li>
      <button
        className={`flex items-center gap-1.5 w-full text-left px-2 py-1 rounded hover:bg-base-300 text-sm transition-colors ${depth === 0 ? "font-medium" : ""}`}
        style={{ paddingLeft: `${8 + depth * 12}px` }}
        onClick={() => isFolder ? setOpen(o => !o) : onNavigate(node.name)}
      >
        {isFolder && (
          <span className="text-base-content/40 w-3">
            {open ? BI.chevronDown : BI.chevronRight}
          </span>
        )}
        {!isFolder && <span className="w-3" />}
        {getFileIcon(node.name, node.type)}
        <span className="truncate">{node.name}</span>
      </button>
      {isFolder && open && node.children && (
        <ul>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} depth={depth + 1} onNavigate={onNavigate} />
          ))}
        </ul>
      )}
    </li>
  );
}

function Sidebar({ onNavigate }) {
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-base-300">
        <p className="text-xs font-semibold uppercase tracking-widest text-base-content/40">Proje Gezgini</p>
      </div>
      <div className="flex-1 overflow-y-auto py-2">
        <ul className="menu menu-xs p-0">
          {TREE_DATA.map(node => (
            <TreeNode key={node.id} node={node} depth={0} onNavigate={onNavigate} />
          ))}
        </ul>
      </div>
      <div className="border-t border-base-300 p-3 space-y-1">
        {[
          { icon: BI.database, label: "Veritabanı" },
          { icon: BI.barChart, label: "Analitik" },
          { icon: BI.gear, label: "Ayarlar" },
        ].map(({ icon, label }) => (
          <button key={label} className="flex items-center gap-2 w-full px-3 py-1.5 rounded hover:bg-base-300 text-sm text-base-content/70 hover:text-base-content transition-colors">
            {icon} {label}
          </button>
        ))}
      </div>
    </div>
  );
}

function Breadcrumbs({ path, onNavigate }) {
  return (
    <div className="breadcrumbs text-sm py-0">
      <ul>
        <li>
          <button onClick={() => onNavigate([])} className="flex items-center gap-1 hover:text-primary transition-colors">
            {BI.house} Kök
          </button>
        </li>
        {path.map((segment, i) => (
          <li key={i}>
            <button
              onClick={() => onNavigate(path.slice(0, i + 1))}
              className="hover:text-primary transition-colors"
            >
              {segment}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function getNodeAtPath(nodes, pathArr) {
  if (!pathArr.length) return { children: nodes };
  const [head, ...rest] = pathArr;
  const found = nodes.find(n => n.name === head);
  if (!found) return null;
  if (!rest.length) return found;
  return getNodeAtPath(found.children || [], rest);
}

function FileExplorer({ currentPath, onNavigate }) {
  const [viewMode, setViewMode] = useState("grid");
  const node = getNodeAtPath(TREE_DATA, currentPath);
  const items = node?.children || [];
  const canGoUp = currentPath.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-base-300 bg-base-200/50">
        <button
          className={`btn btn-sm btn-ghost gap-1.5 ${!canGoUp ? "btn-disabled opacity-40" : ""}`}
          onClick={() => canGoUp && onNavigate(currentPath.slice(0, -1))}
          title="Üst dizine git"
        >
          {BI.arrowUp}
          <span className="hidden sm:inline">Üst dizin</span>
        </button>
        <button
          className="btn btn-sm btn-ghost gap-1.5"
          onClick={() => onNavigate([])}
          title="Köke git"
        >
          {BI.house}
          <span className="hidden sm:inline">Kök</span>
        </button>
        <div className="flex-1" />
        {/* path info badge */}
        <div className="badge badge-ghost gap-1 font-mono text-xs">
          {BI.folder}
          <span>/{currentPath.join("/") || ""}</span>
        </div>
        <div className="join">
          <button
            className={`join-item btn btn-xs ${viewMode === "grid" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setViewMode("grid")}
            title="Izgara görünümü"
          >{BI.grid}</button>
          <button
            className={`join-item btn btn-xs ${viewMode === "list" ? "btn-primary" : "btn-ghost"}`}
            onClick={() => setViewMode("list")}
            title="Liste görünümü"
          >{BI.list}</button>
        </div>
      </div>

      {/* Stats bar */}
      <div className="px-4 py-1.5 bg-base-100 border-b border-base-200 flex items-center gap-4">
        <span className="text-xs text-base-content/50">
          <strong className="text-base-content/70">{items.length}</strong> öğe
          {" · "}
          <strong className="text-base-content/70">{items.filter(i => i.type === "folder").length}</strong> klasör
          {" · "}
          <strong className="text-base-content/70">{items.filter(i => i.type !== "folder").length}</strong> dosya
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-base-content/30">
            <span className="text-4xl mb-2">{BI.folderOpen}</span>
            <p className="text-sm">Bu dizin boş</p>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {canGoUp && (
              <button
                onClick={() => onNavigate(currentPath.slice(0, -1))}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-base-300 hover:bg-base-200 hover:border-primary/40 transition-all group text-center"
              >
                <span className="text-3xl text-base-content/30 group-hover:text-warning transition-colors">{BI.folder}</span>
                <span className="text-xs text-base-content/50 font-mono">..</span>
              </button>
            )}
            {items.map(item => (
              <button
                key={item.id}
                onDoubleClick={() => item.type === "folder" && onNavigate([...currentPath, item.name])}
                onClick={() => item.type === "folder" && onNavigate([...currentPath, item.name])}
                className="flex flex-col items-center gap-2 p-3 rounded-xl border border-base-300 hover:bg-base-200 hover:border-primary/40 transition-all group text-center"
              >
                <span className="text-3xl">{getFileIcon(item.name, item.type)}</span>
                <span className="text-xs truncate w-full text-center text-base-content/70 group-hover:text-base-content">{item.name}</span>
              </button>
            ))}
          </div>
        ) : (
          <table className="table table-sm w-full">
            <thead>
              <tr className="text-xs text-base-content/40 uppercase tracking-wider">
                <th>Ad</th>
                <th>Tür</th>
                <th>Boyut</th>
                <th>Tarih</th>
              </tr>
            </thead>
            <tbody>
              {canGoUp && (
                <tr className="hover cursor-pointer" onClick={() => onNavigate(currentPath.slice(0, -1))}>
                  <td colSpan={4} className="text-base-content/40 font-mono text-xs">..</td>
                </tr>
              )}
              {items.map(item => (
                <tr
                  key={item.id}
                  className="hover cursor-pointer"
                  onClick={() => item.type === "folder" && onNavigate([...currentPath, item.name])}
                >
                  <td>
                    <div className="flex items-center gap-2">
                      {getFileIcon(item.name, item.type)}
                      <span className="text-sm">{item.name}</span>
                    </div>
                  </td>
                  <td className="text-xs text-base-content/50 font-mono">
                    {item.type === "folder" ? "klasör" : item.name.split(".").pop()}
                  </td>
                  <td className="text-xs text-base-content/40">
                    {item.type === "folder" ? `${item.children?.length || 0} öğe` : `${Math.floor(Math.random() * 120 + 2)} KB`}
                  </td>
                  <td className="text-xs text-base-content/40">Bugün</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function SearchResults({ query, onClose, onNavigate }) {
  const results = FLAT_FILES.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div className="absolute top-full left-0 right-0 z-50 bg-base-100 border border-base-300 shadow-xl rounded-b-xl overflow-hidden max-h-80 overflow-y-auto">
      <div className="flex items-center justify-between px-4 py-2 border-b border-base-200 bg-base-200/60">
        <span className="text-xs text-base-content/50">
          <strong>{results.length}</strong> sonuç bulundu: <em className="text-primary">"{query}"</em>
        </span>
        <button className="btn btn-xs btn-ghost" onClick={onClose}>{BI.x}</button>
      </div>
      {results.length === 0 ? (
        <div className="p-6 text-center text-base-content/40 text-sm">Sonuç bulunamadı</div>
      ) : (
        <ul>
          {results.map(r => (
            <li key={r.id}>
              <button
                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-base-200 transition-colors text-left"
                onClick={() => {
                  const parts = r.path.split("/");
                  onNavigate(r.type === "folder" ? parts : parts.slice(0, -1));
                  onClose();
                }}
              >
                {getFileIcon(r.name, r.type)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{r.name}</p>
                  <p className="text-xs text-base-content/40 font-mono truncate">/{r.path}</p>
                </div>
                <span className="text-xs badge badge-ghost">
                  {r.type === "folder" ? "klasör" : r.name.split(".").pop()}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function AppShell() {
  const [currentPath, setCurrentPath] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef(null);

  const handleNavigate = (pathArr) => {
    setCurrentPath(pathArr);
    setDrawerOpen(false);
  };

  useEffect(() => {
    const handler = (e) => {
      if (!searchRef.current?.contains(e.target)) setShowSearch(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="drawer lg:drawer-open h-screen bg-base-100" data-theme="dark">
      {/* Drawer toggle (mobile) */}
      <input
        id="main-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={e => setDrawerOpen(e.target.checked)}
      />

      {/* Page content */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Top Navbar */}
        <nav className="navbar bg-base-200 border-b border-base-300 px-4 gap-3 min-h-14 z-30">
          <label htmlFor="main-drawer" className="btn btn-ghost btn-sm drawer-button lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </label>

          {/* Logo */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-primary-content font-bold text-xs">FX</div>
            <span className="font-semibold text-sm hidden sm:block">FileExplorer</span>
          </div>

          {/* Breadcrumbs */}
          <div className="hidden md:flex flex-1 items-center">
            <Breadcrumbs path={currentPath} onNavigate={handleNavigate} />
          </div>

          {/* Search bar */}
          <div className="flex-1 md:flex-none md:w-64 relative" ref={searchRef}>
            <div className="input input-sm input-bordered flex items-center gap-2 w-full">
              <span className="text-base-content/40">{BI.search}</span>
              <input
                type="text"
                placeholder="Dosya ara…"
                className="grow bg-transparent outline-none text-sm"
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setShowSearch(e.target.value.length > 0);
                }}
                onFocus={() => searchQuery && setShowSearch(true)}
              />
              {searchQuery && (
                <button className="text-base-content/40 hover:text-base-content" onClick={() => { setSearchQuery(""); setShowSearch(false); }}>
                  {BI.x}
                </button>
              )}
            </div>
            {showSearch && searchQuery && (
              <SearchResults
                query={searchQuery}
                onClose={() => { setShowSearch(false); setSearchQuery(""); }}
                onNavigate={handleNavigate}
              />
            )}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-sm btn-circle indicator">
              <span className="indicator-item indicator-top indicator-end badge badge-primary badge-xs"></span>
              {BI.bell}
            </button>
            <div className="dropdown dropdown-end">
              <button tabIndex={0} className="btn btn-ghost btn-sm btn-circle">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center text-secondary-content text-xs font-bold">AY</div>
              </button>
              <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-base-200 rounded-box w-48 border border-base-300">
                <li><a className="flex items-center gap-2">{BI.person} Profil</a></li>
                <li><a className="flex items-center gap-2">{BI.gear} Ayarlar</a></li>
                <li className="border-t border-base-300 mt-1 pt-1"><a className="text-error">Çıkış</a></li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Mobile breadcrumbs */}
        <div className="md:hidden px-4 py-2 border-b border-base-300 bg-base-200/50">
          <Breadcrumbs path={currentPath} onNavigate={handleNavigate} />
        </div>

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          {/* Current location header */}
          <div className="px-6 py-3 bg-base-100 border-b border-base-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-warning">{BI.folder}</span>
              <div>
                <h1 className="text-sm font-semibold leading-tight">
                  {currentPath.length ? currentPath[currentPath.length - 1] : "Kök dizin"}
                </h1>
                <p className="text-xs text-base-content/40 font-mono">
                  /{currentPath.join("/")}
                </p>
              </div>
            </div>
            {/* Quick path ancestors */}
            {currentPath.length > 0 && (
              <div className="flex items-center gap-1">
                {currentPath.map((seg, i) => (
                  <button
                    key={i}
                    onClick={() => handleNavigate(currentPath.slice(0, i + 1))}
                    className="btn btn-xs btn-ghost font-mono gap-1"
                    title={`/${currentPath.slice(0, i + 1).join("/")}`}
                  >
                    {BI.arrowUp} {seg}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* File Explorer */}
          <div className="flex-1 overflow-hidden">
            <FileExplorer currentPath={currentPath} onNavigate={handleNavigate} />
          </div>
        </main>

        {/* Status bar */}
        <footer className="flex items-center gap-4 px-4 py-1.5 bg-base-300 border-t border-base-300 text-xs text-base-content/40">
          <span className="flex items-center gap-1">{BI.clockHistory} Son güncelleme: Bugün 14:32</span>
          <span className="flex-1" />
          <span>React 18 · Vite · DaisyUI</span>
        </footer>
      </div>

      {/* Drawer sidebar */}
      <div className="drawer-side z-40">
        <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="w-64 min-h-full bg-base-200 border-r border-base-300 flex flex-col">
          {/* Sidebar header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-base-300 bg-base-300/50">
            <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
              <span className="text-primary-content text-xs font-bold">FX</span>
            </div>
            <span className="font-semibold text-sm">FileExplorer</span>
            <label htmlFor="main-drawer" className="ml-auto btn btn-ghost btn-xs lg:hidden">
              {BI.x}
            </label>
          </div>
          <Sidebar onNavigate={handleNavigate} />
        </aside>
      </div>
    </div>
  );
}
 