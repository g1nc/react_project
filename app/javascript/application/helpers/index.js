export const getMetaContent = (name) => {
    let meta = document.getElementsByTagName('meta')[name];
    return meta ? meta.getAttribute('content') : '';
};