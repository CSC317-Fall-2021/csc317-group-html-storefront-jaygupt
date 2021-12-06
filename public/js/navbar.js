const navbar = document.querySelector("nav.navbar");

navbar.innerHTML = `<h1 id="logo"><a href="index.html" id="logo-text"><span class="logo-g">G</span>ood<span class="logo-g">G</span>ame</a></h1>
                    <a href="index.html">HOME</a>
                    <a href="categories.html">CATEGORIES</a>
                    <input type="text" placeholder="Search products..." id="productSearch">
                    <a href="login.html">LOGIN/REGISTER</a>
                    <a href="cart.html">CART</a>
                    <a href="about_us.html">ABOUT</a>`;

const navLinks = Array.from(document.querySelectorAll("nav.navbar > a"));

if(window.location.pathname === '/'){
    navLinks[0].classList.add('current');
}
navLinks.forEach((link) => {
    let tmp = new URL(link.href);
    if(window.location.pathname === tmp.pathname){
        link.classList.add('current');
    }
});