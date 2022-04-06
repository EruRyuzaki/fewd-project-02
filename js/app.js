// ===========================================================================

// *** CREATE NAVIGATION LIST

// store the navigation list and all sections

const navigationList = document.querySelector(".header .nav .nav-list");
const sections = document.querySelectorAll(".main > section[data-nav]");

// start the builder function

const buildNavigation = () => {

    // get each section with for ... of loop

    for (const section of sections) {

        // get section attributes

        const sectionId = section.getAttribute("id");
        const sectionData = section.getAttribute("data-nav");

        // create <li> elements

        const navigationItem = document.createElement("li");

        // create <a> elements and give attributes

        const itemAnchor = document.createElement("a");
        itemAnchor.setAttribute("href", `#${sectionId}`);
        itemAnchor.classList.add("nav-item");
        itemAnchor.textContent = `${sectionData}`;

        // append <a> elements to <li> elements

        navigationItem.appendChild(itemAnchor);

        // alternate way with innerHTML:
        // navigationItem.innerHTML = `<a href="#${sectionId}" class="nav-item">${sectionData}</a>`;

        // append <li> elements to <ul> element

        navigationList.appendChild(navigationItem);

    }

};

// call the function

buildNavigation();

// ===========================================================================

// *** SCROLL INTO VIEW WITH SMOOTHING BEHAVIOR

// get all <a> elements which starts with #

const links = document.querySelectorAll("body a[href^='#']");

// get each link with for ... of loop

for (const link of links) {

    // get the links href and search for the element with the same id

    const linkLocation = link.getAttribute("href");
    const target = document.querySelector(linkLocation);

    // start the click event for each link

    link.onclick = (e) => {

        // prevent the default behavior

        e.preventDefault();

        // scroll to the target with smoothness

        target.scrollIntoView({

            behavior: "smooth"

        });

    };

}

// ===========================================================================

// *** TOGGLE BURGER MENU

// store the burger menu

const burger = document.querySelector(".header .nav .burger");

// add the click event to the navigation burger menu and toggle active class on the <ul> and burger element

burger.onclick = () => {

    navigationList.classList.toggle("active");
    burger.classList.toggle("active");

};

// ===========================================================================

// *** HIDE NAVBAR ON SCROLL DOWN

// store the navbar

const navbar = document.querySelector(".header");

// define the current scrollY position

let scrollY = window.scrollY;

// start function to hide the navbar on scroll down

const hideNavbarOnScroll = () => {

    // if statement: if the last scrollY is less than the current scrollY - add or remove class on the navbar
    
    if (scrollY < window.scrollY) {

        navbar.classList.add("hide-navbar");

    } else {

        navbar.classList.remove("hide-navbar");

    }

    // update the last scrollY to the current scrollY

    scrollY = window.scrollY;

};

// ===========================================================================

// *** SET ACTIVE SECTION CLASS FOR SECTIONS AND LINKS

// store navigation links

const navigationLinks = document.querySelectorAll(".header .nav .nav-list > li > .nav-item");

// set active section threshold to 50% of the viewport height

let windowScale = window.innerHeight * 0.5;

// function to set the active range and class for each section

const setActiveSection = () => {

    // get each sections index in a for loop

    for (i = 0; i < sections.length; i++) {

        // get the sections locations

        const location = sections[i].getBoundingClientRect();

        // if statement: if the top and bottom location of the section is within the viewport of the window scale - add or remove class on section and link

        if (location.top < windowScale && location.bottom > windowScale) {

            sections[i].classList.add("active-section");
            navigationLinks[i].classList.add("active-section");

        } else {

            sections[i].classList.remove("active-section");
            navigationLinks[i].classList.remove("active-section");

        }

    }

};

// ===========================================================================

// *** SHOW SCROLLER

// store scroller and hero section

const scroller = document.querySelector(".main .scroller");
const heroSection = document.getElementById("hero");

// function to activate the scroller

const activateScroller = () => {

    // get the bottom location of the hero section

    const locationBottom = heroSection.getBoundingClientRect().bottom;

    // if statement: if the bottom location is less than 0 - add or remove class on the scroller

    if (locationBottom < 0) {

        scroller.classList.add("active");

    } else {

        scroller.classList.remove("active");

    }

};

// ===========================================================================

// *** ASSIGN WINDOW EVENTS

// reset the viewport scale on window resize

window.onresize = () => {

    windowScale = window.innerHeight * 0.5;
    
};

// call functions on scroll

window.onscroll = () => {

    navigationList.classList.remove("active");
    burger.classList.remove("active");

    hideNavbarOnScroll();
    setActiveSection();
    activateScroller();

};

// ===========================================================================