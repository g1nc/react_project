export const getMetaContent = (name) => {
    let meta = document.getElementsByTagName('meta').find((meta) => {
        return meta.getAttribute("name") === name
    });
    return meta ? meta.getAttribute('content') : '';
};