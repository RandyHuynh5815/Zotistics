export const toggleNightMode = ()=> {
    //switches some colors around
    let root = document.body;
    let bg = getComputedStyle(root).getPropertyValue('--main-bg-color');
    let text =  getComputedStyle(root).getPropertyValue('--main-text-color');
    let bg2 =  getComputedStyle(root).getPropertyValue('--secondary-bg-color');
    let text2 =  getComputedStyle(root).getPropertyValue('--secondary-text-color');
    root.style.setProperty('--main-bg-color', text);
    root.style.setProperty('--main-text-color', bg);
    root.style.setProperty('--secondary-bg-color', text2);
    root.style.setProperty('--secondary-text-color', bg2);

}