document.addEventListener("DOMContentLoaded", () => {
    const pageIframe = document.getElementById("page-iframe");
    const prevPageButton = document.getElementById("prev-page-button");
    const nextPageButton = document.getElementById("next-page-button");
    const pageNumberInput = document.getElementById("page-number-input");

    let currentPageIndex = 0;

    function loadPage(pageIndex) {
        if (pageIndex >= 0 && pageIndex < emTextPages.length) {
            pageIframe.src = emTextPages[pageIndex];
            currentPageIndex = pageIndex;
            pageNumberInput.value = pageIndex + 1;
        }
    }

    function nextPage() {
        loadPage(currentPageIndex + 1);
    }

    function prevPage() {
        loadPage(currentPageIndex - 1);
    }

    nextPageButton.addEventListener("click", nextPage);
    prevPageButton.addEventListener("click", prevPage);

    pageNumberInput.addEventListener("change", () => {
        const pageNumber = parseInt(pageNumberInput.value, 10);
        if (!isNaN(pageNumber) && pageNumber > 0 && pageNumber <= emTextPages.length) {
            loadPage(pageNumber - 1);
        }
    });

    // Swipe gestures
    let touchstartX = 0;
    let touchendX = 0;

    pageIframe.contentWindow.document.addEventListener("touchstart", (event) => {
        touchstartX = event.changedTouches[0].screenX;
    });

    pageIframe.contentWindow.document.addEventListener("touchend", (event) => {
        touchendX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        if (touchendX < touchstartX) {
            nextPage();
        }
        if (touchendX > touchstartX) {
            prevPage();
        }
    }

    // Load the initial page
    loadPage(0);
});
