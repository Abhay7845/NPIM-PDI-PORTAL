export const AdminLoginHeading = ["loginId", "password", "role"];

export const L1L2ReportHeaders = [
  "ID",
  "View",
  "Itemcode",
  "Collection",
  "NeedState",
  "ItGroup",
  "Category",
  "StdWt",
  "StdUCP",
  "Action",
  "Saleable",
  "Reasons",
  "Quality Rating",
  "Quality Reasons",
];
export const L1L2SubmittedHeaders = [
  "ID",
  "Image",
  "DOE",
  "Store_Code",
  "Region",
  "NeedState",
  "Collection",
  "CatPB",
  "ItemCode",
  "Action",
  "Activity",
  "ItGroup",
  "Category",
  "Q1Rating",
  "Q2Rating",
  "Q3Rating",
  "Q4Rating",
  "Specific_Feedback",
  "Overall(%)",
];
export const L1L2PnddHeaders = [
  "ID",
  "Image",
  "itemCode",
  "Collection",
  "NeedState",
  "ItGroup",
  "Category",
  "CatPB",
  "Action",
  "StdWt",
  "StdUcp",
  "Complexity",
  "Findings",
  "MetalColor",
];
export const WislistLeHeaders = [
  "Image",
  "itemCode",
  "indCategory",
  "catPB",
  "needState",
  "itGroup",
  "stdWt",
  "stdUCP",
  "stoneQuality",
  "stoneQualityVal",
  "Action",
];

export const imageUrl =
  "https://jewbridge.titanjew.in/CatalogImages/api/ImageFetch/?Type=ProductImages&ImageName=";

export const specialChars = [
  "",
  "+",
  "-",
  "_",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "{",
  "}",
  "[",
  "]",
  ";",
  ":",
  "?",
  "/",
  ">",
  "<",
  ".",
  ",",
  "~",
  "`",
];

export const hitRateColRegion = [
  "region",
  "itemCode",
  "sealable",
  "notSealable",
  "totalCount",
  "hitRate",
];
export const hitRateColItemCode = [
  "itemCode",
  "sealable",
  "notSealable",
  "totalCount",
  "hitRate",
];

// export const feedbackl1l2Navigate = "NpimPortal/feedbackL1andL2";
export const feedbackl1l2Navigate = "NpimPortal/new/feedbackL1andL2";
export const L1L2Reports = "NpimPortal/new/reportL1andL2";

export const sizeUCPToKey = {
  Single_Tag: "stdUCP",
  Only_EARRING: "stdUcpE",
  Only_OTHER: "stdUcpO",
  Only_NECKWEAR: "stdUcpN",
  Only_TIKKA: "stdUcpK",
  Only_HARAM: "stdUcpH",
  Set2Tag: "stdUcpN",
  Set2Tag_H: "stdUcpH",
};

export const sizeSTDWTToKey = {
  Single_Tag: "stdWt",
  Only_EARRING: "stdWtE",
  Only_OTHER: "stdWtF",
  Only_NECKWEAR: "stdWtH",
  Only_TIKKA: "stdWtK",
  Only_HARAM: "stdWtN",
  Set2Tag: "stdWtO",
  Set2Tag_H: "stdWtV",
};
