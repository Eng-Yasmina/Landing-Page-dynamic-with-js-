/**
 * Defines Global Variables
 */
const allSections = document.getElementsByTagName('section');
const homeSection = document.querySelector('section');
const teamSection = document.getElementById('Team');
const navigation__list = document.getElementById('navigation__list');
const mainFragment = document.createDocumentFragment();
const fragment2 = document.createDocumentFragment();
const fixedHeaderBar = document.querySelector('header');
const scrollToTop = document.getElementById('scroll-btn');


/**
 * End Global Variables
 * Starts Helper Functions
 * IMPORTANT: in my js script, helper fn means a small function that I can declare separately away from the main fn that I will call this small fn in.
 */

    /**
     * @description set timer to hide the header (navigation) bar.
     */
    const timer = () => {
        hide = setTimeout(()=>{fixedHeaderBar.style.display = 'none';},1000);
    }; 

    /**
     * @description clears the (set time out)
     */
    const stopTimer = () => {
        if (typeof hide != 'undefined') {
            clearTimeout(hide);
        }
    };

/**
 * End Helper Functions
 * Begins Main Functions
 */

// TODO: build the nav
    /**
     * @description builds the nav through loops over all sections to create list tags <li> and anchor tags <a>, adds the text in the innerHTML of <a> and appends anchor tags to list tags to fragment to the unordered list.
     */
    const navigationMenu = () => {
        for (const sectionTag of allSections) {
            // creates list tags <li> and anchor tages <a>.
            const listTag = document.createElement('li');
            const anchorTag = document.createElement('a'); 

            // Extracts the title of each section to add it to <a>'s content.
            anchorTag.innerHTML = sectionTag.getAttribute('data-navigation');

            // adds some styles to nav anchors by adding a class to it.
            anchorTag.classList = 'navigation__a';

            // Appends anchor tag <a> to list tag <li>
            listTag.appendChild(anchorTag);

            // Appends list tag <li> to fragment
            mainFragment.appendChild(listTag);
        }

        // appends fragment to unoreder list <ul>
        navigation__list.appendChild(mainFragment);

        // set the first anchor tag <a> in the navigation menu to active by default.
        navigation__list.childNodes[0].firstChild.classList.add('nav-active-section');
    };

navigationMenu();

// TODO: add value to nav item 'hrf' attribute.
    const navAnchors = navigation__list.querySelectorAll('a'); //It's a global variable now, after creating it in navigationMenu fn and appending it;
    /**
     * @description extracts title from each section to add it to nav <a>'s href attribute.
     */
    const scrollToSection = () => {
        for (const sectionTag of allSections) {
            for (const navAnchor of navAnchors) {
                if (navAnchor.innerHTML===sectionTag.getAttribute('data-navigation')) {
                    navAnchor.href=`#${sectionTag.getAttribute('data-navigation')}`;
                }
            }
        }
    };

// TODO: build the background circles for activated section.
    /**
     * @description creates an empty (div) and append it to fragment2, then prepend fragment2 to the top of each section.
     */
    const bgCircles = () => {
        for (const sectionTag of allSections) {
            const circle = document.createElement('div');
            //appends circle to fragment2.
            fragment2.appendChild(circle);
            //prepends fragment2 to each section as a first child because i use grid for each section; therefore the order of elements is important for me.
            sectionTag.prepend(fragment2);
        }
    };

bgCircles();

// TODO: add class 'user-active-section' to the section when near the top of the viewport.
    const highlightActiveSection = () => {
        // checkes out which section is the section actively being viewed.
        for (const sectionTag of allSections) {
            const backgroundCilcle = sectionTag.querySelector('div');
            // detects the section location relative to the viewport using .getBoundingClientRect()
            if (sectionTag.getBoundingClientRect().top>-250 && sectionTag.getBoundingClientRect().top<250) {
                sectionTag.classList.add('user-active-section');
                backgroundCilcle.classList.add('circle1');
            } else {
                sectionTag.classList.remove('user-active-section');
                backgroundCilcle.classList.remove('circle1');
            }
        }
    };

// TODO: add class 'nav-active-section' to nav anchor tag if it's linked section is the active section.
    /**
     * @description uses (get bounding client rect.) method to add class (nav-active-section) to navigation anchor tag <a> when it's linked section near top of viewport.
     */
     const highlightNavActivSection = () => {
        for (const sectionTag of allSections) {
            if (sectionTag.getBoundingClientRect().top>-250 && sectionTag.getBoundingClientRect().top<250) {
                // checks out which nav anchor is linked to the section actively being viewed.
                for (const navAnchor of navAnchors) {
                    if (navAnchor.innerHTML===sectionTag.getAttribute('data-navigation')) {
                        navAnchor.classList.add('nav-active-section');
                    } else {
                        navAnchor.classList.remove('nav-active-section');
                    }
                }
            }
        }
    };

// TODO: hide fixed nav bar
    /**
     * @description hides fixed header (navigation) bar while not scrolling.
     */
    const hideFixedHeader = () => {
        fixedHeaderBar.style.display = 'flex';
        stopTimer();
        timer();
    };

// TODO: add a scroll to the top button that's only visible when the user scrolls below the fold of the page.
    /**
     * @description shows scroll to the top button when only scroll Y is > 500.
     */
    const scrollToTopBtn = () => {
        scrollToTop.classList.toggle('scroll-to-top',window.scrollY>500);
    };

    /**
     * @description links scroll to the top button with the home section.
     */
    const linkScrollToTopBtn = () => {
        scrollToTop.href=`#${homeSection.getAttribute('data-navigation')}`;
    };

// TODO: pop-up the photos of our amazing instructors only when the user hovers over section 3 (Team).
    /**
     * @describtion when the user hovers on (section: Team), the instructors pop up.
     */
    const showInstructors = () => {
        const instructors = teamSection.querySelector('.instructors');
        instructors.style.display = 'block';
    };     

    /**
     * @describtion the photos of instructors disappear when the user moves the mouse away from section3.
     */
    const hideInstructors = () => {
        const instructors = teamSection.querySelector('.instructors');          
        instructors.style.display = 'none';
    };     

/**
 * End Main Functions
 * Begins Events
 */

// TODO: add event listener (highlightActiveSection) while scrolling in window.
    window.addEventListener("scroll", highlightActiveSection);

// TODO: add listener (highlightNavActiveSection) while scrolling in window.
    window.addEventListener("scroll", highlightNavActivSection);

// TODO: run function (hideFixedHeader) when an event of type 'scroll' happens in the eventTarget (window).
    window.addEventListener('scroll', hideFixedHeader);

// TODO: run event listener (scrollToTopBtn) when the eventTarget (window) listens for an event of type 'scroll'.
    window.addEventListener('scroll', scrollToTopBtn);

// TODO: run function (linkScrollToTopBtn) when the eventTarget (scroll to top) listens for an event of type 'click'.
    scrollToTop.addEventListener('click',linkScrollToTopBtn);

// TODO: run listener fn (showInstructors) to (section: Team), when the user hovers on it.
    teamSection.addEventListener('mouseover', showInstructors);

// TODO: run listener fn (hideInstructors) to Team section, when mouse event is mouseleave.
    teamSection.addEventListener('mouseleave', hideInstructors);

// TODO: scroll to section on navAnchor click.
    for (const navAnchor of navAnchors) {
        navAnchor.addEventListener('click', scrollToSection);
    }





