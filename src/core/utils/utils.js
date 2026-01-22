
export const getPerPageList = () => {
    return [
        10, 25, 50, 100, 200
    ];
};


export const getPaginationMetaDataFromApiResponse = (pData) => {
    return {
        current_page: pData.current_page,
        first_page_url: pData.first_page_url,
        from: pData.from,
        links: pData.links,  // This should be pData.links, not pData.last_page
        last_page: pData.last_page,
        last_page_url: pData.last_page_url,
        next_page_url: pData.next_page_url,
        path: pData.path,
        per_page: pData.per_page,
        prev_page_url: pData.prev_page_url,
        to: pData.to,
        total: pData.total,
    };
};
