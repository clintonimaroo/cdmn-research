export function getUniqueId() {
    let uniqueId = localStorage.getItem('uniqueId');
    if (!uniqueId) {
        uniqueId = 'id-' + Math.random().toString(36).substr(2, 16);
        localStorage.setItem('uniqueId', uniqueId);
    }
    return uniqueId;
}