const zineList = [
    "../visual_asset/zine/comic.png",
    "../visual_asset/zine/yuki.png",
    "../visual_asset/zine/random.png"
  ];

const zine_container = document.getElementById("zine_collection");
for(i=0; i<zineList.length;i++){
    const img = document.createElement("img");
    const src = toWebpPath(zineList[i]);
    img.src = src;
    zine_container.append(img);
}




const exhib_images = [
    '../visual_asset/exhib/0.GIF',
    '../visual_asset/exhib/1.jpg',
    '../visual_asset/exhib/2.png',
    '../visual_asset/exhib/3.png',
    '../visual_asset/exhib/4.png',
    '../visual_asset/exhib/5.png',
    '../visual_asset/exhib/6.png',
    '../visual_asset/exhib/7.png',
    '../visual_asset/exhib/8.png',
    '../visual_asset/exhib/9.png',
    '../visual_asset/exhib/10.png'
  ];

  const row = document.querySelector('.gallery-row');
const exhibition = document.querySelector('#exhibition');

const framePattern = [1, 2, 1, 2, 2, 1];

// Build frames based on pattern and image count
const frames = [];
let count = 0;
let p = 0;

while (count < exhib_images.length) {
  const n = framePattern[p % framePattern.length];
  const take = Math.min(n, exhib_images.length - count);
  frames.push(take);
  count += take;
  p++;
}

let currentFrame = -1;

function renderFrame(frameIndex) {
    const imagesThisFrame = frames[frameIndex];
    const startIndex = frames.slice(0, frameIndex).reduce((a, b) => a + b, 0);
    const images = exhib_images.slice(startIndex, startIndex + imagesThisFrame)
    .map(toWebpPath);
  
    row.innerHTML = '';
  
    let imgPtr = 0; // track actual image inserted
  
    for (let i = 0; i < 2; i++) {
      const div = document.createElement('div');
  
      const shouldInsert =
        (images.length === 1 && i === 1) ||
        (images.length === 2 && (i === 0 || i === 2)) ||
        (images.length === 2);
  
      if (shouldInsert && images[imgPtr]) {
        const img = document.createElement('img');
        img.src = images[imgPtr];
        img.alt = `Image ${startIndex + imgPtr}`;
        div.classList.add('gallery-item');
        img.onload = () => div.classList.add('loaded');
        div.appendChild(img);
        imgPtr++; // move to next image only when inserted
      }
  
      row.appendChild(div);
    }
  }

function handleScroll() {
    const sectionTop = exhibition.offsetTop;
    const sectionHeight = exhibition.offsetHeight;
    const scrollY = window.scrollY + window.innerHeight / 2;
  
    const relativeScroll = scrollY - sectionTop;
  
    // Clamp ratio from 0 to just under 1
    const scrollRatio = Math.min(Math.max(relativeScroll / sectionHeight, 0), 0.9999);
    const targetFrame = Math.floor(scrollRatio * frames.length);
  
    if (
      targetFrame !== currentFrame &&
      targetFrame >= 0 &&
      targetFrame < frames.length
    ) {
      currentFrame = targetFrame;
      renderFrame(currentFrame);
    }
  }

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
    currentFrame = -1;
    renderFrame(0);
  });


  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
  
      const targetId = link.textContent.trim().toLowerCase(); // match section id
      const targetEl = document.getElementById(targetId);
  
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });




const overlay = document.getElementById("overlay");
const overlayGallery = document.getElementById("overlay-gallery");
const closeBtn = document.getElementById("close-overlay");

// A function to load images from a folder with given ID
function openGalleryFromId(id) {
  const folderPath = `../output_webp/${id}/`;
  overlayGallery.innerHTML = '';


  for (let i = 0; i < 10; i++) {
    const img = new Image();
    img.src = `${folderPath}${i}.webp`;
    img.onerror = () => img.remove(); 
    overlayGallery.appendChild(img);
  }

  overlay.classList.remove("hidden");
}

// Close overlay
closeBtn.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// Attach click listeners to images
document.querySelectorAll('img[id]').forEach(img => {
  img.addEventListener("click", () => {
    openGalleryFromId(img.id);
  });
});