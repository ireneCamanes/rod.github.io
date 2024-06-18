const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let isDrawing = false;

function resize() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
}
resize();

window.addEventListener('resize', resize);

function getMousePos(event) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function draw(event) {
    if (!isDrawing) return;

    ctx.lineWidth = 40; // Adjust the line width as needed
    ctx.lineCap = "round";
    ctx.strokeStyle = "#E8FF5D";

    const mousePos = getMousePos(event);
    ctx.lineTo(mousePos.x, mousePos.y);
    ctx.stroke();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener('mousedown', (event) => {
    isDrawing = !isDrawing; // Toggle drawing mode
    if (isDrawing) {
        ctx.beginPath();
        const mousePos = getMousePos(event);
        ctx.moveTo(mousePos.x, mousePos.y);
    } else {
        clearCanvas(); // Clear canvas if drawing mode is toggled off
    }
});

// Smooth drawing
canvas.addEventListener('mousemove', draw);

window.addEventListener('scroll', () => {
    sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            navbarItems.forEach((item, i) => {
                if (i === index) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const words = ["product", "interaction", "graphic","experience"];
    let currentWordIndex = 0;
    const wordElement = document.getElementById("changing-word");

    function changeWord() {
        // Exit animation
        wordElement.classList.add('fall-out');
        setTimeout(() => {
            // Update the word
            currentWordIndex = (currentWordIndex + 1) % words.length;
            wordElement.textContent = words[currentWordIndex];

            // Entry animation
            wordElement.classList.remove('fall-out');
            wordElement.classList.add('fall-in');
        }, 500); // Change word after the exit animation completes (0.5s)
    }

    setInterval(changeWord, 2000); // Change word every 2 seconds
});

// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Get the changing word span
    const changingWord = document.getElementById("changing-word");
    // Get the line div
    const line = document.querySelector(".line");
    // Get the offset of the changing word relative to its parent container
    const wordOffsetLeft = changingWord.offsetLeft;
    // Set the left position of the line to match the left offset of the changing word
    line.style.left = wordOffsetLeft + "px";
});

const hiSection = document.getElementById('hi');
const cursor = document.createElement('div');
cursor.classList.add('cursor');
hiSection.appendChild(cursor);

hiSection.addEventListener('mousemove', (e) => {
  const cursorSize = 20; // Adjust the size of the cursor
  cursor.style.left = `${e.clientX - cursorSize / 2}px`; // Adjust the position to center the cursor
  cursor.style.top = `${e.clientY - cursorSize / 2}px`; // Adjust the position to center the cursor
});

hiSection.addEventListener('mouseenter', () => {
  cursor.style.display = 'block';
});

hiSection.addEventListener('mouseleave', () => {
  cursor.style.display = 'none';
});



const container = document.getElementById('container');
const pictures = document.querySelectorAll('.picture');

// Create custom cursor element
const customCursor = document.createElement('div');
customCursor.id = 'custom-cursor';
document.body.appendChild(customCursor);

let isDragging = false;
let currentPicture = null;
let startX, startY, initialX, initialY;

const centerX = container.clientWidth / 2;
const centerY = container.clientHeight / 2;

pictures.forEach(picture => {
  // Randomize initial position around the center
  const offsetX = (Math.random() - 0.5) * 900; // Random offset between -50 and 50
  const offsetY = (Math.random() - 1) * 300; // Random offset between -50 and 50

  picture.style.left = `${centerX + offsetX}px`;
  picture.style.top = `${centerY + offsetY}px`;

  picture.addEventListener('mousedown', (e) => {
    isDragging = true;
    currentPicture = picture;
    startX = e.clientX;
    startY = e.clientY;
    initialX = picture.offsetLeft;
    initialY = picture.offsetTop;
    container.style.cursor = 'grabbing';
    picture.style.zIndex = 1000; // Ensure the dragged image is on top
  });

  picture.addEventListener('mouseup', () => {
    isDragging = false;
    container.style.cursor = 'default';
    if (currentPicture) {
      currentPicture.style.zIndex = '';
      currentPicture = null;
    }
  });
});

document.addEventListener('mousemove', (e) => {
  // Update the position of the custom cursor
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;

  if (!isDragging || !currentPicture) return;

  e.preventDefault();

  requestAnimationFrame(() => {
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    currentPicture.style.left = `${initialX + dx}px`;
    currentPicture.style.top = `${initialY + dy}px`;
  });
});

document.addEventListener('mouseup', () => {
  if (isDragging) {
    isDragging = false;
    container.style.cursor = 'default';
    if (currentPicture) {
      currentPicture.style.zIndex = '';
      currentPicture = null;
    }
  }
});

document.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    container.style.cursor = 'default';
    if (currentPicture) {
      currentPicture.style.zIndex = '';
      currentPicture = null;
    }
  }




  
});



