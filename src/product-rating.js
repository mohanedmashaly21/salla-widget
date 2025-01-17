import { styles } from "./assets.js";

export default class ProductRatingWidget {
  constructor(position = "above-description", rating = 3) {
    this.position = position;
    this.rating = rating; // Default to 3 stars, or you can pass a custom rating
    this.init();
    this.injectStyles();
  }

  position = "";
  widgetContainer = null;

  async init() {
    this.widgetContainer = document.createElement("div");
    this.createWidgetContent();

    const targetElement = document.querySelector(".product__description");

    if (targetElement) {
      // Insert the widget above the target element
      targetElement.parentNode.insertBefore(this.widgetContainer, targetElement);
    } else {
      console.error("Target element '.product__description' not found.");
    }
  }

  createWidgetContent() {
    this.widgetContainer.innerHTML = `
      <div class="rating-stars">
        ${this.getStarsHTML()}
      </div>
      <p class="rating-text">${this.rating} من 5</p>
    `;
  }

  getStarsHTML() {
    let starsHTML = '';
    for (let i = 1; i <= 5; i++) {
      starsHTML += `<span class="star ${i <= this.rating ? 'filled' : ''}">&#9733;</span>`;
    }
    return starsHTML;
  }

  injectStyles() {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = styles.replace(/^\s+|\n/gm, "");
    document.head.appendChild(styleTag);

    // Additional styles for the stars
    const starStyles = `
      .rating-stars {
        display: flex;
        justify-content: center;
        gap: 5px;
        font-size: 30px;
      }
      .star {
        color: #ccc;
        transition: color 0.2s ease;
      }
      .star.filled {
        color: #FFD700;
      }
      .star:hover {
        cursor: pointer;
      }
    `;
    const starStyleTag = document.createElement("style");
    starStyleTag.innerHTML = starStyles;
    document.head.appendChild(starStyleTag);
  }
}
