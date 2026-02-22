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
    populateSlideshow(slideshowData)
}

loadData();



const populateSlideshow = (paintings) => {
    console.log(paintings)
    let targetId;

    // Get the index of the gallery
    gallery.forEach((btn, index) => {
        btn.addEventListener("click", () => {

            const art = paintings[index];


            console.log(art);
        })
    })

}

