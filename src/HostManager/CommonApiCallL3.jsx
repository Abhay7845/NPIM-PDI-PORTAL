import { privateApiClient } from "./PrivateClient";

export const APILogin = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIGetHomeReligion = (url) => {
    return privateApiClient.get(url);
}

export const APIGetForAdvariant = (url) => {
    return privateApiClient.get(url);
}
export const APIGetDropdownList = (url) => {
    return privateApiClient.get(url);
}
export const APIGetDropdownCollectionList = (url) => {
    return privateApiClient.get(url);
}
export const APIGetDropdownConsumerBaseList = (url) => {
    return privateApiClient.get(url);
}
export const APIGetDropdownITGroupList = (url) => {
    return privateApiClient.get(url);
}
export const APIGetDropdownCategory = (url) => {
    return privateApiClient.get(url);
}
export const APIGetStatusPortal = (url) => {
    return privateApiClient.get(url);
}
export const APIGetLimitCatPBWise = (url) => {
    return privateApiClient.get(url);
}
export const APIAdminGetParameter = (url) => {
    return privateApiClient.get(url);
}
export const APIGetStatusReports = (url) => {
    return privateApiClient.get(url);
}

export const APIGetL1L2Reports = (url) => {
    return privateApiClient.get(url);
}

export const APIGetL1L2PendingRtp = (url) => {
    return privateApiClient.get(url);
}
export const APIGetAllDropdownList = (url) => {
    return privateApiClient.get(url);
}
export const APIClosePortal = (url) => {
    return privateApiClient.get(url);
}
export const APIGetItemWiseRptL3 = (url) => {
    return privateApiClient.get(url);
}

export const APIDNPIMProductData = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIPNPIMProductData = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIGetPreNextProductData = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIInsertDataL1L2 = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIInsertRatingL1L2Feedback = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIInsertDataL3 = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIYesItemWiseRtp = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIDeleteUpdate = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIUpdateFormL3 = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIMoveToWishList = (url) => {
    return privateApiClient.get(url);
}
export const APICheckItemCode = (url) => {
    return privateApiClient.get(url);
}
export const APIMoveToIndent = (url) => {
    return privateApiClient.get(url);
}
export const APIUpdateStaus = (url) => {
    return privateApiClient.get(url);
}
export const APIMailContentIndent = (url) => {
    return privateApiClient.get(url);
}
export const APIMailContentWishList = (url) => {
    return privateApiClient.get(url);
}
export const APIGetSizeDropdown = (url) => {
    return privateApiClient.get(url);
}
export const APICoupleBandDropdown = (url) => {
    return privateApiClient.get(url);
}
export const APIGetStatuL3 = (url) => {
    return privateApiClient.get(url);
}

export const APIGetReportL3 = (url) => {
    return privateApiClient.get(url);
}
export const APISaveFormDataL3 = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIGetCollCatListL3 = (url) => {
    return privateApiClient.get(url);
}
export const APIInsWishList = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIGetWishlistData = (url) => {
    return privateApiClient.get(url);
}

export const APIInsLimit = (url, payload) => {
    return privateApiClient.post(url, payload);
}

// -----------------------------ADDMON ----------------------
export const APIGetCatList = (url) => {
    return privateApiClient.get(url);
}
export const APISetCatCode = (url) => {
    return privateApiClient.get(url);
}
export const APIGetMailerContent = (url) => {
    return privateApiClient.get(url);
}

export const APICopyIndentStore = (url) => {
    return privateApiClient.get(url);
}
export const APIOpenPortal = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIGetStoreList = (url) => {
    return privateApiClient.get(url);
}
export const APIGetStoreListFromDate = (url) => {
    return privateApiClient.get(url);
}
export const APISendTestMail = (url, payload) => {
    return privateApiClient.post(url, payload);
}


export const APIGetSkuMaster = (url) => {
    return privateApiClient.get(url);
}
export const APIGetAdminLoginData = (url) => {
    return privateApiClient.get(url);
}

export const APIInsDataLogin = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIInsSizeMaster = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIUpdateGenderShape = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIBulkMoveWhislist = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIInsContentMailer = (url, payload) => {
    return privateApiClient.post(url, payload);
}

export const APIInsObjStoreMaster = (url, payload) => {
    return privateApiClient.post(url, payload);
}
export const APIGetEndDayRtp = (url) => {
    return privateApiClient.get(url);
}

export const APIGetWishEndDayRtp = (url) => {
    return privateApiClient.get(url);
}

export const APISendMail = (url, payload) => {
    return privateApiClient.post(url, payload);
}

