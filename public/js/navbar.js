const navbar = document.querySelector("nav.navbar");
let userName = navbar.getAttribute('data-userName');

let cookie = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value]) => ({...accumulator, [key.trim()]: decodeURIComponent(value)}), {});

if(cookie.sessionID){
    navbar.innerHTML = `<h1 id="logo"><a href="/" id="logo-text"><span class="logo-g">G</span>ood<span class="logo-g">G</span>ame</a></h1>
                        <a href="/">HOME</a>
                        <a href="/categories">CATEGORIES</a>
                        <input type="text" placeholder="Search products..." id="productSearch">
                        <div class="dropdown">
                            <a href="#" id="navbarDropLink">${userName}</a>
                            <div id="navbarDropdown">
                                <a href="#">Profile</a>
                                <a href="#">Orders</a>
                                <a href="#">Saved Cards</a>
                                <a href="#" id="signOutLink">Sign Out</a>
                            </div>
                        </div>
                        <a href="/cart">CART</a>`
}
else{
    navbar.innerHTML = `<h1 id="logo"><a href="/" id="logo-text"><span class="logo-g">G</span>ood<span class="logo-g">G</span>ame</a></h1>
                        <a href="/" class="<%= pageName === 'Home' && 'active' %>">HOME</a>
                        <a href="/categories" class="<%= pageName === 'Categories' && 'active' %>">CATEGORIES</a>
                        <input type="text" placeholder="Search products..." id="productSearch">
                        <a href="/login" class="<%= pageName === 'Login' && 'active' %>">LOGIN/REGISTER</a>
                        <a href="/cart" class="<%= pageName === 'Cart' && 'active' %>">CART</a>
                        <a href="/about_us" class="<%= pageName === 'About Us' && 'active' %>">ABOUT</a>`;
}

const navLinks = Array.from(document.querySelectorAll("nav.navbar > a"));

if(window.location.pathname === '/'){
    navLinks[0].classList.add('current');
}
navLinks.forEach((link) => {
    let tmp = new URL(link.href);
    if(window.location.pathname === tmp.pathname){
        link.classList.add('active');
    }
});

const navbarDropLink = document.querySelector("#navbarDropLink");
const navbarDropdown = document.querySelector("#navbarDropdown");

navbarDropLink.addEventListener('click', (e) => {
    navbarDropdown.classList.toggle('show');
});

window.addEventListener('click', (e) => {
    if(e.target !== navbarDropLink){
        if(navbarDropdown.classList.contains('show')){
            navbarDropdown.classList.remove('show');
        }
    }
});

const signOutLink = document.querySelector("#signOutLink");

signOutLink.addEventListener('click', (e) => {
    document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
});