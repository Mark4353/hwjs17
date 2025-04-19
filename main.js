const APIkey = "49809824-6020f8c5e3e6ee0bf43d51bd8";  
const perPage = 12;
let currentPage = 1;

const gallery = document.getElementById("image-gallery");
const loadMoreBtn = document.getElementById("load-more-btn");

async function fetchImages(page = 1) {
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${APIkey}&editors_choice=true&per_page=${perPage}&page=${page}`);
    const data = await response.json();
    return data.hits;
  } catch (error) {
    console.error("Помилка", error);
    return [];
  }
}

function renderImages(images) {
  images.forEach(image => {
    const imgElement = document.createElement("img");
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;
    gallery.appendChild(imgElement);
  });
}

async function loadMoreImages() {
  const images = await fetchImages(currentPage);
  if (images.length > 0) {
    renderImages(images);
    currentPage++;
    localStorage.setItem("pixabayPage", currentPage);
  } else {
    loadMoreBtn.disabled = true;
    loadMoreBtn.textContent = "Немає зображень";
  }
}

loadMoreBtn.addEventListener("click", loadMoreImages);

window.addEventListener("DOMContentLoaded", () => {
  const savedPage = localStorage.getItem("pixabayPage");
  currentPage = savedPage ? parseInt(savedPage) : 1;
  loadMoreImages();
});
