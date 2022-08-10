/**
 * Defines Global Variables
 */
const allSections = document.getElementsByTagName('section');
const mainSection = document.querySelector('section')
const navigattion__list = document.getElementById('navigation__list');
const mainFragment = document.createDocumentFragment();
const fixedHeaderBar = document.querySelector('header');
const scrollToTop = document.getElementById('scroll-btn');
/**
 * End Global Variables
 * Starts Helper Functions
 */

    /**
     * @description sets timer to hide the header (navigation) bar 
     */
    function timer() {
        hide = setTimeout(()=>{fixedHeaderBar.style.display = 'none';},1000);
    } 

    /**
     * @description clears the (set time out)
     */
    function stopTimer() {
        if (typeof hide != 'undefined') {
            clearTimeout(hide);
        }
    }

/**
 * End Helper Functions
 * Begins Main Functions
 */

// TODO: build the nav
    /**
     * @description Build the nav through loops over all sections to creat list tags <li> and anchor tages <a>, adds text in the innerHTML of <a>, and append anchor tags to list tags to fragment to the unorder list
     */
    function navigationMenu(){
    // loops over all sections
    for (const sectionTag of allSections) {
        // creates list tags <li> and anchor tages <a>
        const listTag = document.createElement('li');
        const anchorTag = document.createElement('a'); 

        // extracts data-navigation using getAttribute
        //adds text content to <a>
        anchorTag.innerHTML = sectionTag.getAttribute('data-navigation');

        // appends anchor Tag <a> to list Tag <li>
        anchorTag.classList = 'navigation__a';
        listTag.appendChild(anchorTag);

        // Scrolls to section on link click
        anchorTag.addEventListener('click',()=>{
            anchorTag.href=`#${sectionTag.getAttribute('data-navigation')}`
        });

        // appends list tag <li> to fragment
        mainFragment.appendChild(listTag);
    }


    //appends fragment to unoreder list <ul>
    navigattion__list.appendChild(mainFragment);

    // sets the first anchor tag <a> in the navigation menu to active by default
    navigattion__list.childNodes[0].firstChild.classList.add('active__anchor');
    }

navigationMenu();

// TODO: build the background circles
    /**
     * @description Build active section background circles
     */
    function bgCircles() {
        for (const sectionTag of allSections) {
            const circle = document.createElement('div');
            //prepends the div element to each section as a first child
            sectionTag.prepend(circle);
        }
    }

bgCircles();


/**
 * End Main Functions
 * Begins Events
 */

// TODO: Add class 'user-active-section' to section when near top of viewport
    /**
     * uses (get bouding client rect.) method to adds class (user-active-section) to section  and class (active-anchor) to it's linked navigation anchor tag <a> when near top of viewport
     */
    window.addEventListener("scroll", () =>{
        const navAnchors = document.getElementsByTagName('a');
    
        // loops through all sections to determine the active section and  also to get each anchor tag <a> inside each section to determine the active anchor tag
        for (const sectionTag of allSections){
            const backgroundCilcle = sectionTag.querySelector('div');

            if(sectionTag.getBoundingClientRect().top>-350 && sectionTag.getBoundingClientRect().top<350){
                const userActiveSection = sectionTag;
                userActiveSection.classList.add('user-active-section');
                backgroundCilcle.classList.add('circle1');

            
                for(const anchor of navAnchors){
                    // extracts data-navigation to check if it's the active anchor tag <a> or not
                    if(anchor.innerHTML===userActiveSection.getAttribute('data-navigation')){
                        anchor.classList.add('active__anchor');
                    }
                    else{ anchor.classList.remove('active__anchor');}
                }
            } else {
                sectionTag.classList.remove('user-active-section');
                backgroundCilcle.classList.remove('circle1');
            }
        }

    });


// TODO: hide fixed header (navigation) bar while not scrolling
    window.addEventListener('scroll', ()=>{
        fixedHeaderBar.style.display = 'flex';
      stopTimer();
       timer();
    });

// TODO: add a scroll to top buttom that's only visible when the user scrolls below the fold of the page
    window.addEventListener('scroll',()=>{
        scrollToTop.classList.toggle('scroll-to-top',window.scrollY>500);
    });

    scrollToTop.addEventListener('click',()=>{
        scrollToTop.href=`#${mainSection.getAttribute('data-navigation')}`;
    });










