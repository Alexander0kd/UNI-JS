document.addEventListener("DOMContentLoaded", () => {

    // Hamburger
    const hamburgerButton = document.getElementById("hamburger-btn");
    if (hamburgerButton) {
        hamburgerButton.addEventListener("click", () => {
            const ul = document.getElementById("ul");

            if (ul) {
                ul.classList.toggle("active");
                hamburgerButton.classList.toggle("active");
            }

        });
    }

    // Carousel
    const carouselSlides = document.getElementById("carousel-slides");
    const slideCount = carouselSlides.childElementCount;
    let currentSlide = 0;
    let timer = 0;

    const indicators = document.getElementById("indicators");
    if (indicators) {
        for (let i = 0; i < slideCount; i++) {
            const div = document.createElement("div");
            div.classList.add("indicator");
            div.id = "indicator-" + i;

            div.addEventListener("click", () => {
                currentSlide = i;
                slideImg(0);

                clearInterval(timer);
                timer = setInterval(() => {
                    slideImg(1);
                }, 3000);
            });

            indicators.appendChild(div);
        }
    }

    const slideImg = (dir) => {
        if (!carouselSlides) return;

        currentSlide += dir;

        if (currentSlide >= slideCount) {
            currentSlide = 0;
        }

        if (currentSlide < 0) {
            currentSlide = slideCount - 1;
        }

        carouselSlides.scroll({
            left: carouselSlides.scrollWidth / slideCount * currentSlide + 1,
            behavior: "smooth"
        });

        const slideIndicators = document.getElementsByClassName("indicator");
        for (let i = 0; i < slideIndicators.length; i++) {
            slideIndicators[i].classList.remove("active");

            slideIndicators[currentSlide].classList.add("active");
        }

        clearInterval(timer);
        timer = setInterval(() => {
            slideImg(1);
        }, 3000);
    };

    const nextBtn = document.getElementById("next-btn");
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            slideImg(1);
        });
    }

    const prevBtn = document.getElementById("prev-btn");
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            slideImg(-1);
        });
    }

    slideImg(0);

});
