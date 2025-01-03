export function useScrollToElement(element, height = 2) {
    let rect = element.getBoundingClientRect();
    if (height === 2) {
        let middleOfElement = rect.top + (rect.height / 2);
        let middleOfViewport = window.innerHeight / 2;
        window.scrollTo({
            top: middleOfElement - middleOfViewport + window.scrollY,
            behavior: 'smooth'
        });
    } else {
        element.scrollIntoView({behavior: "smooth"});
    }
}