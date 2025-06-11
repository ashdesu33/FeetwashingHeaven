
function toWebpPath(originalPath) {
  return originalPath
    .replace('../visual_asset/', '../output_webp/')
    .replace(/\.[^/.]+$/, '.webp'); // replace extension with .webp
}
const imageList = [
    "../visual_asset/scattered/Artboard 1.png",
    "../visual_asset/scattered/Artboard 2.png",
    "../visual_asset/scattered/Artboard 3.png",
    "../visual_asset/scattered/Artboard 4.png",
    "../visual_asset/scattered/Artboard 5.png",
    "../visual_asset/scattered/Artboard 8.png",
    "../visual_asset/scattered/Artboard 9.png",
    "../visual_asset/scattered/Artboard 10.png",
    "../visual_asset/scattered/Artboard 11.png",
    "../visual_asset/scattered/Artboard 12.png",
    "../visual_asset/scattered/Artboard 13.png",
    "../visual_asset/scattered/Artboard 14.png",
    "../visual_asset/scattered/Artboard 15.png",
    "../visual_asset/scattered/Artboard 16.png",
    "../visual_asset/scattered/Artboard 17.png",
    "../visual_asset/scattered/Artboard 18.png",
    "../visual_asset/scattered/Artboard 19.png",
    "../visual_asset/scattered/Artboard 20.png",
    "../visual_asset/scattered/Artboard 21.png",
    "../visual_asset/scattered/Artboard 24.png",
    "../visual_asset/scattered/Artboard 25.png",
    "../visual_asset/scattered/Artboard 26.png",
    "../visual_asset/Artboard 28.png",
    
  ];
  
  const container = document.getElementById("scattered");
  
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }
  
  function loadRandomImages(count) {
    for (let i = 0; i < count; i++) {
      const img = document.createElement("img");
      const src = toWebpPath(imageList[i]);
      const widthPercent = getRandom(10, 15);
      const baseRotation = getRandom(-100, 100);
  
      img.src = src;
      img.style.position = "absolute";
      img.style.width = widthPercent + "vw";
      img.style.left = getRandom(0, 100 - widthPercent) + "vw";
      img.style.top = getRandom(0, 100 - widthPercent) + "vh"; // adjust for vertical overlap
        
      img.style.transform = `rotate(${baseRotation}deg)`;
      img.style.transition = "none";

      container.appendChild(img);
      setInterval(() => {
        const jitter = getRandom(-10.5, 10.5);
        img.style.transform = `rotate(${jitter}deg)`;
      }, getRandom(200, 300));
    }
  }
  
  loadRandomImages(23); 
