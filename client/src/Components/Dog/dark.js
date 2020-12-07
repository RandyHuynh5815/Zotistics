let nightMode = false;

export const toggleNightMode = ()=> {
    let root = document.documentElement;
    nightMode = !nightMode;
    
    if (nightMode) {
        root.style.setProperty('--main-bg-color', "#dddedf");
        root.style.setProperty('--main-text-color', "#111111");
    } else {
        root.style.setProperty('--main-bg-color', "#111111");
        root.style.setProperty('--main-text-color', "#dddedf");
    }
    
}