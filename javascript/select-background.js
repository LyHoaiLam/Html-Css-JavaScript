
    const images = [
      { id: 1, path: '../../images/france-01.jpg', name: 'Paris, France' },
      { id: 2, path: '../../images/indonesia-01.jpg', name: 'Bali, Indonesia' },
      { id: 3, path: '../../images/indonesia-02.jpg', name: 'Jakarta, Indonesia' },
      { id: 4, path: '../../images/japan-01.jpg', name: 'Tokyo, Japan' },
      { id: 5, path: '../../images/vietnam-01.jpg', name: 'Hanoi, Vietnam' }
    ];

    let currentImageIndex = 0;

    function initGallery() {
      const gallery = document.getElementById("gallery");
      gallery.innerHTML = "";

      images.forEach((image, index) => {
        const imageItem = document.createElement("div");
        imageItem.className = "image-item";
        imageItem.style.backgroundImage = `url(${image.path})`;
        imageItem.dataset.index = index;

        const imageNumber = document.createElement("div");
        imageNumber.className = "image-number";
        imageNumber.textContent = `${index + 1}`;

        imageItem.appendChild(imageNumber);
        imageItem.addEventListener("click", () => selectImage(index));

        gallery.appendChild(imageItem);
      });
    }

    function selectImage(index) {
      const mainBackground = document.getElementById("mainBackground");
      const currentBgText = document.getElementById("currentBg");
      const backgroundText = document.getElementById("backgroundText");
      const gallery = document.getElementById("gallery");
      const clickedImage = document.querySelector(`[data-index="${index}"]`);

      if (!clickedImage) return;

      const imageRect = clickedImage.getBoundingClientRect();
      const imageCenterX = imageRect.left + imageRect.width / 2;
      const imageCenterY = imageRect.top + imageRect.height / 2;

      const originX = (imageCenterX / window.innerWidth) * 100;
      const originY = (imageCenterY / window.innerHeight) * 100;

      mainBackground.style.transformOrigin = `${originX}% ${originY}%`;
      mainBackground.style.backgroundImage = `url(${images[index].path})`;

      mainBackground.classList.remove("active");
      void mainBackground.offsetWidth;
      mainBackground.classList.add("active");

      currentBgText.textContent = `Current Background: ${images[index].name}`;
      
      // Animate old text out first
      if (backgroundText.classList.contains("show")) {
        backgroundText.classList.remove("show");
        backgroundText.classList.add("hide");
        
        // After text hides, update content and animate in
        setTimeout(() => {
          backgroundText.textContent = images[index].name;
          backgroundText.classList.remove("hide");
          void backgroundText.offsetWidth;
          backgroundText.classList.add("show");
        }, 600); // Wait for hide animation
      } else {
        // First time, just show text after background animation
        backgroundText.textContent = images[index].name;
        setTimeout(() => {
          backgroundText.classList.add("show");
        }, 1000);
      }
      
      // Reset and trigger container text animation
      currentBgText.classList.remove("show");
      void currentBgText.offsetWidth;
      currentBgText.classList.add("show");

      gallery.classList.add("rearranging");

      document.querySelectorAll(".image-item").forEach((item) => {
        item.classList.remove("selected");
        item.style.animation = "";
      });

      clickedImage.classList.add("selected");
      clickedImage.style.animation = "pulse 0.7s cubic-bezier(0.22, 1, 0.36, 1)";

      const allImages = document.querySelectorAll(".image-item");
      allImages.forEach((item, i) => {
        if (i !== index) {
          item.classList.add("slide-out");
        }
      });

      const selectedImage = images.splice(index, 1)[0];
      images.push(selectedImage);

      currentImageIndex = images.length - 1;

      setTimeout(() => {
        initGallery();

        const newImages = document.querySelectorAll(".image-item");
        newImages.forEach((item, i) => {
          if (i < images.length - 1) {
            item.classList.add("slide-in");
          }
        });

        setTimeout(() => {
          const selectedMovedItem = document.querySelector(
            `[data-index="${currentImageIndex}"]` 
          );
          if (selectedMovedItem) {
            selectedMovedItem.classList.add("selected");
          }
          gallery.classList.remove("rearranging");
        }, 400);
      }, 400);
    }

    document.addEventListener("DOMContentLoaded", () => {
      initGallery();
    });
