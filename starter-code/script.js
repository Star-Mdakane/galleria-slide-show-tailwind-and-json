const gallery = document.querySelectorAll("#gallery li");

// Buttons
const startSlideshowBtn = document.getElementById("slideshow-start");
const stopSlideshowBtn = document.getElementById("slideshow-stop");
const viewImageBtn = document.getElementById("overlay-open");
const closeOverlayImageBtn = document.getElementById("overlay-close");
const imageSourceBtn = document.getElementById("image-source");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

// Slideshow
const slideshowImage = document.getElementById("slideshow__image");
const authorImage = document.getElementById("author-image");
const artName = document.getElementById("art-name");
const artistName = document.getElementById("artist-name");
const footerArtName = document.getElementById("footer-art-name");
const footerArtistName = document.getElementById("footer-artist-name");
const artYear = document.getElementById("art-year");
const description = document.getElementById("description");
const slider = document.getElementById("slider");

// Overlay
const overlayImage = document.getElementById("overlay-image");

const overlay = document.getElementById("overlay");
const slideshow = document.getElementById("slideshow");


let slideshowData = [];
let currentIndex = 0;

const fetchArt = async () => {
    try {
        const response = await fetch("./data.json");
        if (!response.ok) throw new Error(`HTTP Error! status: ${response.status}`);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error:", error);
    }

}

const loadData = async () => {
    const data = await fetchArt();
    slideshowData = data;
    console.log(slideshowData);
    openSlideshow(slideshowData)
}

loadData();

const openSlideshow = (paintings) => {

    gallery.forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            const slideGroup = e.target.closest(".group\\/slide");

            // if (index === 0) {
            //     console.log(index);
            //     prevBtn.classList.add("group-hover");
            // } else if (index === 14) {
            //     nextBtn.classList.add("group-hover");
            // } else {
            //     prevBtn.classList.remove("group-hover");
            //     nextBtn.classList.remove("group-hover");
            // }

            populateSlideshow(e, slideGroup, index, paintings);
        })
    })

    startSlideshowBtn.addEventListener("click", (e) => {
        const slideGroup = e.target.closest(".group\\/slide");
        startSlideshow(slideGroup, paintings);
    })
}

const populateSlideshow = (e, slideGroup, index, paintings) => {

    slideGroup.classList.add("start");
    let slideIndex = index;
    // let art = paintings[index];

    const updateSlide = () => {
        const art = paintings[slideIndex]

        artName.textContent = art.name;
        footerArtName.textContent = art.name;
        artistName.textContent = art.artist.name;
        footerArtistName.textContent = art.artist.name;
        description.textContent = art.description;
        artYear.textContent = art.year;
        authorImage.src = art.artist.image;
        if (window.matchMedia('(max-width: 768px)').matches) {
            slideshowImage.src = art.images.gallery;
        } else {
            slideshowImage.src = art.images.hero.large;
        }
    }

    updateSlide();

    viewImageBtn.addEventListener("click", (e) => {
        const overlayGroup = e.target.closest(".group\\/ovl");
        overlayGroup.classList.add("open");
        overlayImage.src = paintings[index].images.hero.large;
    });

    closeOverlayImageBtn.addEventListener("click", (e) => {
        const overlayGroup = e.target.closest(".group\\/ovl");
        overlayGroup.classList.remove("open");
    });

    imageSourceBtn.addEventListener("click", (e) => {
        const slideGroup = e.target.closest(".group\\/slide");
        slideGroup.classList.remove("start");
    })

    nextBtn.addEventListener("click", () => {
        if (slideIndex < paintings.length - 1) {
            slideIndex++;
            updateSlide();
        } else if (slideIndex == 14) {
            nextBtn.classList.add("isActive");
        }
        prevBtn.classList.remove("isActive");

    });

    prevBtn.addEventListener("click", () => {

        if (slideIndex > 0) {
            slideIndex--;
            updateSlide();
        } else if (slideIndex == 0) {
            prevBtn.classList.add("isActive");
        }
        nextBtn.classList.remove("isActive");
    });
};

const startSlideshow = (slideGroup, paintings) => {
    slideGroup.classList.add("start");

    const slideInterval = setInterval(() => {
        if (currentIndex > 14) {
            clearInterval(slideInterval);
            slideGroup.classList.remove("start");
            currentIndex = 0;
            return;
        }

        let slide = paintings[currentIndex]

        artName.textContent = slide.name;
        footerArtName.textContent = slide.name;
        artistName.textContent = slide.artist.name;
        footerArtistName.textContent = slide.artist.name;
        description.textContent = slide.description;
        artYear.textContent = slide.year;
        authorImage.src = slide.artist.image;
        if (window.matchMedia('(max-width: 768px)').matches) {
            slideshowImage.src = slide.images.gallery;
        } else {
            slideshowImage.src = slide.images.hero.large;
        }

        currentIndex++;


    }, 3000);

}

const stopSlideshow = (e) => {

}

stopSlideshowBtn.addEventListener("click", (e) => {
    const slideGroup = e.target.closest(".group\\/slide");
    slideGroup.classList.remove("start");
})

