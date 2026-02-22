const gallery = document.querySelectorAll("#gallery li");

// Buttons
const startSlideshowBtn = document.getElementById("slideshow-start");
const stopSlideshowBtn = document.getElementById("slideshow-stop");
const viewImageBtn = document.getElementById("overlay-open");
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
    console.log(paintings)




    gallery.forEach((btn, index) => {
        const art = paintings[index];
        btn.addEventListener("click", (e) => {
            const slideGroup = e.target.closest(".group\\/slide");

            populateSlideshow(slideGroup, art);

        })
    })

    startSlideshowBtn.addEventListener("click", (e) => {
        const slideGroup = e.target.closest(".group\\/slide");
        // const slide = paintings[0]
        startSlideshow(slideGroup, paintings);
    })
}

const populateSlideshow = (slideGroup, art) => {
    slideGroup.classList.add("start");
    // console.log(index);
    // console.log(art);

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

const startSlideshow = (slideGroup, paintings) => {
    slideGroup.classList.add("start");

    // clearInterval(through);


    const slideInterval = setInterval(() => {
        if (currentIndex >= 14) {
            clearInterval(slideInterval);
            return;
        }

        currentIndex++;
        console.log(currentIndex);

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

    }, 3000)


}