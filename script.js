// Code for the Custom Cursor

const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

circles.forEach((circle) => {
    circle.x = 0;
    circle.y = 0;
});

window.addEventListener("mousemove", (e) => {
    coords.x = e.clientX;
    coords.y = e.clientY;
});

const animateCircles = () => {
    let x = coords.x;
    let y = coords.y;

    circles.forEach((circle, index) => {
        circle.style.left = x + "px";
        circle.style.top = y + "px";

        circle.style.scale = (circles.length - index) / circles.length;
        // circle.style.transform = `translate(10%, 50%)`
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];  // Corrected from circle[0] to circles[0]
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });

    requestAnimationFrame(animateCircles); // Schedule the next animation frame
};

requestAnimationFrame(animateCircles); // Start the animation



// Code for when hovered over the A tags in the Navbar
document.querySelectorAll(".link").forEach((elem) => {
    let ogColor = elem.style.color; 

    elem.addEventListener("mouseenter", () => {
        gsap.to(".circle",{
            scale: 5,
            duration: 0.3,
            ease: "elastic.out(0.5, 0.3)"
        })
        gsap.to(elem,{
            color: "#0fadad",
            duration: 0.3,
            ease: "elastic.out(0.5, 0.3)"
        })
    })
    elem.addEventListener("mouseleave", () => {
        gsap.to(".circle",{
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(0.5, 0.3)"
        })
        gsap.to(elem,{
            color: ogColor,
            duration: 0.3,
            ease: "elastic.out(0.5, 0.3)"
        })
    });

})

// ---------- Code for Buttons-----------
const buttons = document.querySelectorAll(".button");
buttons.forEach((button, index)=>{
    

    button.addEventListener("mouseenter", (e)=>{
        console.log(index);
        gsap.set(`#bg-circle-${index}`,{
            x: e.clientX - 85 - button.getBoundingClientRect().left,
            y: e.clientY - 30 - button.getBoundingClientRect().top,
        })
        gsap.to(`#bg-circle-${index}`,{
            scale: 1,
            duration: .5,
        })

    })

    button.addEventListener("mouseleave", (e)=>{
        gsap.set(`#bg-circle-${index}`,{
            x: e.clientX - 85 - button.getBoundingClientRect().left,
            y: e.clientY - 30 - button.getBoundingClientRect().top,
        })
        gsap.to(`#bg-circle-${index}`,{
            scale: 0,
            duration: .5 ,
        })

    })
})

// ------Adding the Partner Logos-------

const partnerGrid = document.querySelector("#partners-grid")

for(let i = 1; i < 10; i++) {
partnerGrid.appendChild(
    Object.assign(document.createElement("img"),{
        src: `media assets/partner${i}.svg`
    })
)}


// --- Coding the Scroll behaviour of the NavBar ---

let lastScrollTop = 0;
let delta = 5; //Determines when the navbar reappears
const navBar = document.querySelector("nav");

window.addEventListener("scroll", function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (Math.abs(lastScrollTop - scrollTop) <= delta) {
        return; // If scroll distance is less than delta, do nothing
    }

    if (scrollTop > lastScrollTop) {
        gsap.to(navBar, { top: -navBar.offsetHeight, duration: 0.3, ease: "power2.out" }); // Slide navbar up
    } else {
        gsap.to(navBar, { top: 0, duration: 0.3, ease: "power2.out" }); // Slide navbar down
    }
    lastScrollTop = scrollTop;

});


// Code for List Item Image Animation

const listItems = document.querySelectorAll(".list-item");

listItems.forEach((item, index) => {
    const img = document.querySelector(`#list-item-img-${index + 1}`);
    let isOverLeft = false; // Flag to track if the mouse is over the .left div

    item.addEventListener("mouseenter", () => {
        gsap.to(img, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(0.5, 0.3)"
        });
    });

    item.addEventListener("mousemove", (e) => {
        if (!isOverLeft) { // Only move the image if the mouse is not over the .left div
            gsap.to(img, {
                x: e.clientX +150 - img.getBoundingClientRect().left,
                y: e.clientY - 100 - img.getBoundingClientRect().top,
                duration: 0.3,
                ease: "easeInOut"
            });
        }
    });

    item.addEventListener("mouseleave", () => {
        gsap.to(img, {
            scale: 0,
            duration: 0.3,
            ease: "elastic.out(0.5, 0.3)"
        });
    });

    // Handle mouse entering the .left div
    item.querySelector(".left").addEventListener("mouseenter", () => {
        isOverLeft = true; // Set the flag to true when entering the .left div
    });

    // Handle mouse leaving the .left div
    item.querySelector(".left").addEventListener("mouseleave", () => {
        isOverLeft = false; // Reset the flag when leaving the .left div
    });
});


// ---- Home Page Case Studies LoadBar ----

// Changing the Size of the LoadBar when hovered over it

document.querySelector("#product-loadbars")
.addEventListener("mouseenter",()=>{
    gsap.to(".circle",{
        scale: 0.2,
        duration:0.3,
        ease: "elastic.out(0.5, 0.3)"
    })
})
document.querySelector("#product-loadbars")
.addEventListener("mouseleave",()=>{
    gsap.to(".circle",{
        scale: 1,
        duration:0.3,
        ease: "elastic.out(0.5, 0.3)"
    })
})

const loadbarsAnimation = (startIndex = 0) => {
    const timeDuration = 10;
    const upperLoadBars = document.querySelectorAll(".upper-loadbar");
    const loadbars = document.querySelectorAll(".loadbar");
    const totalLoadBars = upperLoadBars.length;

    upperLoadBars.forEach((elem, index) => {
        if (index >= startIndex) {
            gsap.to(elem, {
                width: "7.75rem",
                duration: timeDuration,
                delay: (index - startIndex) * timeDuration,
                ease: "linear",

                onStart: () => {
                    document.querySelector(`#loadbar${index + 1}`).classList.add("active-loadbar");
                },
                onComplete: () => {
                    document.querySelector(`#loadbar${index + 1}`).classList.remove("active-loadbar");
                }
            });

            gsap.to("#products-sm", {
                x: `-${index * 106}%`,
                duration: 0.4,
                ease: "power2.inOut",
                delay: (index - startIndex) * timeDuration,
            });

            // Resetting the animation once we reach the last loadbar
            if (index === totalLoadBars - 1) {
                gsap.to("#products-sm", {
                    x: `-${4 * 106}%`,
                    duration: 0.4,
                    ease: "power2.inOut",
                    delay: (index - startIndex + 1) * timeDuration,
                })

                gsap.set(".upper-loadbar", {
                    width: 0,
                    delay: (index - startIndex + 1) * timeDuration,
                });
                gsap.set("#products-sm", {
                    x: 0,
                    delay: (index - startIndex + 1) * timeDuration + 0.5,
                    onComplete: () => {
                        // Restart the animation loop from the beginning
                        loadbarsAnimation();
                    }
                });
            }
        }
    });

    // Add click event listeners to loadbars
    loadbars.forEach((loadbar, index) => {
        loadbar.addEventListener("click", () => {
            // Stop the current animation
            gsap.killTweensOf([upperLoadBars, "#products-sm"]);

            // Set all previous loadbars to full width
            upperLoadBars.forEach((bar, i) => {
                if (i < index) {
                    gsap.set(bar, { width: "7.75rem" });
                } else {
                    gsap.set(bar, { width: 0 });
                }
            });

            // Move the card container to the selected card
            gsap.to("#products-sm", {
                x: `-${index * 106}%`,
                duration: 0.4,
                ease: "power2.inOut",
            });

            // Set the active class for the selected loadbar
            loadbars.forEach((lb) => lb.classList.remove("active-loadbar"));
            loadbar.classList.add("active-loadbar");

            // Restart the animation from the new active loadbar and continue looping
            loadbarsAnimation(index);
        });
    });
}

// Start the looping animation
loadbarsAnimation();


// Animating Project Grid Cursor

const projectGrid = document.querySelector("#project-grid");
const projectGridCursor = document.querySelector("#project-grid-cursor");
const projectList = document.querySelectorAll(".project-slab a");

projectGrid.addEventListener("mousemove", (e) => {
    gsap.to(projectGridCursor, {
        x: e.clientX -60,
        y: e.clientY - 60,
        duration: 0.3,
        ease: "power2.out"
    })
})

projectList.forEach((proj, index) => {
    proj.addEventListener("mouseenter", () => {

        gsap.to(".circle", {
            scale: 0,
            duration: 0.3,
            ease: "easeIn"
        })
        gsap.to(projectGridCursor, {
            scale: 1,
            duration: 0.3,
            ease: "back"
        })
    })

    proj.addEventListener("mouseleave", () => {
        gsap.to(".circle", {
            scale: 1,
            duration: 0.3,
            ease: "back"
        })
        gsap.to(projectGridCursor, {
            scale: 0,
            duration: 0.3,
            ease: "easeIn"
        })
    })
})




// Setting up Scrolling animation using ScrollTriger

const tl = gsap.timeline()

// Landing Page

tl.from("nav",{
    y: -30,
    opacity:0,
    duration: .5,
    ease: "power2.out"
})

tl.from("#title h1", {
    y: 110,
    duration:0.6,
    stagger: 0.15,
    ease : "power2.out"
}, "a")

tl.from("#pgNo01", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "a")

tl.from("#homepage-footer", {
    y: 100,
    opacity:0,
    duration: .5,
    ease: "power2.out"
}, "-=.3")
tl.from("#case-studies-text", {
    opacity: 0,
    duration: 0.6,
    ease: "power2.out"
}, "-=.3")


// Animating Page 4 Scroll animations
function animateRates(){


    function animatePercentage(elem, finalPercentage, duration) {
        const element = document.querySelector(elem);
        let currentPercentage = 0;
        const stepTime = duration / finalPercentage; // Calculate the time per percentage step
    
        const interval = setInterval(() => {
            if (currentPercentage < finalPercentage) {
                currentPercentage++;
                element.innerText = `${currentPercentage}%`;
            } else {
                clearInterval(interval); // Stop the interval once the final percentage is reached
            }
        }, stepTime);
    }
    
    animatePercentage('#conversion-rate h2', 25, 1750); 
    animatePercentage('#bounce-rates h2', 30, 1750);
    }

ScrollTrigger.create({
    trigger: "#page4",    
    onEnter: animateRates,
})



// ------ Handling Form Submission -------

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("#contactForm");
    const confirmationMessage = document.querySelector("#confirmationMessage");
    const reFormButton = document.querySelector("#reForm");

    form.addEventListener("submit", (e)=>{
      // Prevent the default form submission
      event.preventDefault();

      // Hide the form
      form.style.display = "none";

      // Show the confirmation message
      confirmationMessage.style.display = "block";
    });

    reFormButton.addEventListener("click", ()=>{
        confirmationMessage.style.display = "none";
        form.style.display = "block";

        form.querySelectorAll("input, textarea").forEach((field)=>{
            field.value = "";
        })
    })

  });
