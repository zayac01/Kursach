"use strict";
export function setupInfiniteScroll(container, loadMore) {
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            loadMore();
        }
    }, { threshold: 1.0 });
    const sentinel = document.createElement('div');
    sentinel.style.height = '10px';
    container.appendChild(sentinel);
    observer.observe(sentinel);
}
