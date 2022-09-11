/*
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * Dependencies: None   * JS Version: ES2015/ES6   * JS Standard: ESlint
*/

/*
DocumentFragments are DOM Node objects which are never part of the main DOM tree. 
The usual use case is to create the document fragment,
append elements to the document fragment and then append the document 
fragment to the DOM tree. 
In the DOM tree, the document fragment is replaced by all its children.
*/

/* Define Global Variables */
const DocumentFragment = document.createDocumentFragment();

/* will push all obj have the same html tag <section> into one array  */
const sectionSquare = document.querySelectorAll('section');

// to create elements with one line code 
function createElem (tagName,className,inner,attrvalue){
    const elm = document.createElement(tagName);
    if(className) elm.setAttribute("class",className);
    if(attrvalue) elm.setAttribute('attr',attrvalue)
    if(inner) elm.innerHTML =  inner ; 
    return elm}

/* Check if there is viewport then returns 
   DOM and get information about the size of an element and its position relative  */
function isInViewport (elem) {
    const bound = elem.getBoundingClientRect();
    return ( bound.top >= 0 && bound.left >= 0 &&
             bound.bottom <= (window.innerHeight || document.documentElement.clientHeight) 
          && bound.right <=  (window.innerWidth || document.documentElement.clientWidth) );};

// create nav bar section items 
function buildNavigation(){
    sectionSquare.forEach((ele,ind) => {
        const itemHTML = `<a class ="menu__link" attr="${sectionSquare[ind].getAttribute('id')}">${sectionSquare[ind].getAttribute('data-nav')}</a>`;
        const newMenuItem = createElem('li',null,itemHTML,null)
        DocumentFragment.appendChild(newMenuItem);
    });
    const navBarList = document.getElementById('navbar__list')
    navBarList.appendChild(DocumentFragment);
}

// change class state to active for selected section and vice versa  
function makeActive(){
    sectionSquare.forEach( (ele ,ind) => {
        if (isInViewport(sectionSquare[ind])){sectionSquare[ind].classList.add("your-active-class");}
        else{sectionSquare[ind].classList.remove("your-active-class");}   });}

// make scroll smooth from according to event  
function scrollToElement(event){
    if(event.target.nodeName === 'A'){
        const secId = event.target.getAttribute('attr');
        const sec = document.getElementById(secId);
        sec.scrollIntoView({behavior: "smooth"});  }}

// when section is selected and active go to there with smooth effect 
document.addEventListener('scroll', function(){ makeActive();});

// waiting click event to call scroll function to scroll in smooth behavior
const navBarList = document.getElementById('navbar__list')
navBarList.addEventListener('click', function(event){ scrollToElement(event)})

// call all main js function depend on current event   
buildNavigation()