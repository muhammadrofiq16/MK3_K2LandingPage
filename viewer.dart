const img = document.getElementById("product-view");
let isDragging = false;
let startX = 0;
let currentFrame = 1;
const totalFrames = 36; // jumlah gambar sudut (frame-1.png ... frame-36.png)

function updateImage(frame) {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = `images/frame-${frame}.png`;
    img.style.opacity = 1;
  }, 100);
}

img.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
});

window.addEventListener("mouseup", () => {
  isDragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const diff = e.pageX - startX;

  if (Math.abs(diff) > 15) {
    if (diff > 0) {
      currentFrame = currentFrame - 1 < 1 ? totalFrames : currentFrame - 1;
    } else {
      currentFrame = currentFrame + 1 > totalFrames ? 1 : currentFrame + 1;
    }
    updateImage(currentFrame);
    startX = e.pageX;
  }
});

// Support touchscreen
img.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].pageX;
});

img.addEventListener("touchend", () => {
  isDragging = false;
});

img.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const diff = e.touches[0].pageX - startX;

  if (Math.abs(diff) > 15) {
    if (diff > 0) {
      currentFrame = currentFrame - 1 < 1 ? totalFrames : currentFrame - 1;
    } else {
      currentFrame = currentFrame + 1 > totalFrames ? 1 : currentFrame + 1;
    }
    updateImage(currentFrame);
    startX = e.touches[0].pageX;
  }
});
