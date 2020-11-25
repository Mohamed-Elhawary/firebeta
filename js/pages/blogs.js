$(document).ready(function () {
    /*Start Load Features, Navbar and Footer (DOM HTML Code)*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer (DOM HTML Code)*/

    /*Start Blogs Section*/
    /*Start layout-Side*/
    /*Start Pager Navigator*/
    //Create a dynamic pager navigator depending on how many blogs boxes are existed
    function pagerNavigator () {
        let blogsBoxs  = document.querySelectorAll(".blogs-box");
        //console.log(blogsBoxs)
        let pagination = document.querySelector(".pagination");

        for(let i = 0; i < blogsBoxs.length; i++) {
            pagination.innerHTML += `<li class="page cursor transition" id="${i}"><a data-id="${blogsBoxs[i].getAttribute("id")}">${i+1}</a></li>`
        }

        let dottedLi           = document.createElement("li"),
            dottedLiAnchor     = document.createElement("a"),
            dottedLiAnchorText = document.createTextNode("...");
        dottedLiAnchor.appendChild(dottedLiAnchorText);
        dottedLi.appendChild(dottedLiAnchor);
        dottedLi.setAttribute("class", "dotted cursor");
        //dottedLiAnchor.setAttribute("href", "");
        pagination.insertBefore(dottedLi, pagination.children[2]);
    }

    pagerNavigator();

    //Control the dotted li mechanism in the pager navigator
    let hiddenPageNumBeforeCloned = 3;  
    /*Change the number of the variable (hiddenPageNumBeforeCloned) to a suitable number for your pages number, if you have big number of pages for example more than 20 pages,
    so you can set this number to (7) as you like, and for example if you have small numbers of pages so set it to suitable number like (3), 
    But you must note that the number of this variable must be more than (2) at any case...*/

    $("body").on("click", "li.dotted", function() { 
        if(hiddenPageNumBeforeCloned <= ($(".pagination").children().length - 4)) {
            $(this).nextUntil("#" + hiddenPageNumBeforeCloned).css("display", "inline");
            $("#" + hiddenPageNumBeforeCloned).before($(this).clone(true).addClass("cloned"));
            sessionStorage.setItem("data-clone", "#" + hiddenPageNumBeforeCloned);
            $(this).remove();
            hiddenPageNumBeforeCloned += 4;
            sessionStorage.setItem("hiddenPageNumBeforeCloned", hiddenPageNumBeforeCloned);
        } else {
            $(this).nextUntil("#"+ hiddenPageNumBeforeCloned).css("display", "inline");
            $(this).remove();
            sessionStorage.removeItem("data-clone");
        } 
    });
    
    //Control the pager navigator li
    $(".pagination").on("click", "li.page", function() {
        $(this).addClass("active").siblings().removeClass("active").find("a").removeClass("theme-bg").addClass("theme-color");
        $(this).find("a").addClass("theme-bg");

        $(".blogs-box").hide();
        $("#" + $(this).find("a").attr("data-id")).fadeIn();
        sessionStorage.setItem("page-number", $(this).attr("id"));
        sessionStorage.setItem("box-id", "#" + $(this).find("a").attr("data-id"));
        $("html, body").animate({scrollTop: 0}, "slow");
    });

    //Control the session storage for the pager navigtor and the pages of the blogs
    if (sessionStorage.getItem("page-number")) {
        $(".pagination").find("li#" + sessionStorage.getItem("page-number")).addClass("active");
       // $(".pagination").find("li#" + sessionStorage.getItem("page-number")).prevAll(".dotted").remove();  (wrong solving 1)
        if(sessionStorage.getItem("hiddenPageNumBeforeCloned")) {
            hiddenPageNumBeforeCloned = JSON.parse(sessionStorage.getItem("hiddenPageNumBeforeCloned"));
            //if(hiddenPageNumBeforeCloned <= ($(".pagination").children().length - 4)) { (wrong solving 2)
            if(sessionStorage.getItem("data-clone")) {  //(true solving 2)
                $(sessionStorage.getItem("data-clone")).before("<li class='dotted cursor injected'><a>...</a><li>");
                $("li.injected").next().remove();
                $(sessionStorage.getItem("data-clone")).prevAll("li.dotted:not(.injected)").remove(); //(true solving 1)
            } else {
                $("li.dotted").remove();
            }
        }
        
        $(".pagination").find("li:not(.active)").find("a").addClass("theme-color");
        $(".pagination").find("li.active").find("a").addClass("theme-bg");
      
    } else {
        $(".pagination").find("li:eq(0)").addClass("active");
        $(".pagination").find("li:not(:first-child)").find("a").addClass("theme-color");
        $(".pagination").find("li:eq(0)").find("a").addClass("theme-bg"); 
    }

    if (sessionStorage.getItem("box-id")) {
        $(".blogs-box").hide();
        $(sessionStorage.getItem("box-id")).fadeIn();
    } else {
        $("#blogs-box-1").show();
    }
    /*End Pager Navigator*/

    //Control the label span for each blog thumbnail
    let labels = document.querySelectorAll(".label");
    labels.forEach(label => {
        let category = label.parentElement.getAttribute("data-category");
        label.innerHTML = category;
    });

    /*Start Article Part Mechanism of Displaying >> i prefered to use OOP Technique here*/
    class Article {
        constructor(element) {
            this.element            = element;
            this.mainHead           = element.querySelector(".blog-head");
            this.secondHead         = this.mainHead.dataset.secondhead;
            this.mainImgSrc         = element.querySelector(".blog-img").src;
            this.secondImgSrc       = element.querySelector(".blog-img").dataset.secondimg;
            this.date               = element.querySelector(".date");
            this.views              = element.querySelector(".views");
            this.category           = element.dataset.category;
            this.content1           = this.element.querySelector(".content1");
            this.content2           = this.element.querySelector(".content2");
            this.content3           = this.element.querySelector(".content3");
        }

        generateArticle() {
            this.mainHead.addEventListener("click", () => {
                window.location.href = 'article.html';
                let template = 
                    `
                    <div class="container">
                        <div class = 'row'>
                            <div class = 'col-xs-12 main-blog margin-bt'>
                                <div class="thumbnail relative">
                                    <h2 class="text-center margin-bt theme-color">${this.mainHead.innerHTML}</h2>
                                    <img class="radius shadow" src="${this.mainImgSrc}" alt="article-img"/>
                                    <div class="info theme-box-shw white-bg">
                                        <span class="date text-muted text-center"><i class="fas fa-table"></i>${this.date.innerHTML}</span>
                                        <span class="views text-muted text-center"><i class="fas fa-eye"></i>${this.views.innerHTML}</span>
                                        <span class="comments text-muted text-center"><i class="fas fa-comments"></i><span>4</span></span>
                                        <span class="category text-muted text-center"><i class="fas fa-tags"></i>${this.category}</span>
                                    </div>
                                </div>
                                <div class='caption margin-bt padding'> 
                                    <p class="par shadow radius padding box-for-dark">${this.content1.innerHTML}</p>
                                    <p class="par shadow radius padding box-for-dark">${this.content2.innerHTML}</p>
                                </div>
                                <div class="row content">
                                    <div class="col-md-3 col-xs-6">
                                        <div class= "img border" data-aos="fade-right" data-aos-easing="linear" data-aos-delay="50">
                                            <img src="${this.secondImgSrc}" alt="second-img">
                                        </div>
                                    </div>
                                    <div class="col-md-9 col-xs-12">
                                        <div class="texts">
                                            <h4 class="theme-color h3" data-aos="fade-right" data-aos-easing="linear" data-aos-delay="50">${this.secondHead}:</h4>
                                            <p class="par shadow radius padding box-for-dark" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="50">${this.content3.innerHTML}</p>   
                                            <p class="par shadow radius padding box-for-dark" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="50">${this.content3.innerHTML}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 related-blogs">
                                <h5 class="h4 relative dark-grey text-for-dark line-below margin-bt">Related Blogs:</h5>
                                <div class="col-sm-6 thumbnail-box" data-aos="zoom-in" data-aos-easing="linear" data-aos-delay="50">
                                    ${this.element.parentElement.parentElement.getElementsByClassName("thumbnail-box")[Math.floor(Math.random() * this.element.parentElement.parentElement.children.length)].innerHTML}
                                </div>
                                <div class="col-sm-6 thumbnail-box" data-aos="zoom-in" data-aos-easing="linear" data-aos-delay="50">
                                    ${this.element.parentElement.parentElement.getElementsByClassName("thumbnail-box")[Math.floor(Math.random() * this.element.parentElement.parentElement.children.length)].innerHTML}
                                </div>
                            </div>
                        </div>
                    </div>`
                localStorage.setItem("article", template);
            }); 
        }

        triggerEvent(elem) {
            elem.addEventListener("click", () => {
                this.mainHead.click();
            });
        }
    }

    document.querySelectorAll(".layout-side .thumbnail").forEach(thumbnail => {
        const article = new Article(thumbnail);
        article.generateArticle();
        article.triggerEvent(thumbnail.querySelector(".read"));
        article.triggerEvent(thumbnail.querySelector(".blog-img-box"));
    });

    document.querySelector(".side-bar .popular-blogs").onclick = function(e) {
        if(e.target.tagName === "IMG") {
            //console.log(e.target.tagName);
            let   originalPopTumbnail = document.querySelector(`.layout-side .thumbnail[data-post = '${e.target.parentElement.dataset.postnum}']`);
            originalPopTumbnail.querySelector(".blog-head").click();
        }
        console.log(e.target.tagName)

        if(e.target.tagName === "H5") {
            let   originalPopTumbnail = document.querySelector(`.layout-side .thumbnail[data-post = '${e.target.parentElement.parentElement.dataset.postnum}']`);
            originalPopTumbnail.querySelector(".blog-head").click();
        }
    };   
    /*End Article Part Mechanism of Displaying*/
    /*End Layout-Side*/
    
    /*Start Side-bar Side*/
    /*Start Popular Posts Part*/
    //Get 5 blogs of popular blogs randomly (popular blogs that have views more than 1000)
    function randomPopularBlogs () {
        "use strict";
        let viewCounts = document.querySelectorAll(".views");
        //console.log(viewCounts);
        viewCounts.forEach((view) => {
            if(!view.innerText.includes("K")) {
                view.parentElement.parentElement.parentElement.setAttribute("data-popular", "no");
            }
        });
        let popularBlogs = document.querySelectorAll(".thumbnail[data-popular = 'yes']");
        //console.log(popularBlogs.length);
        let randomPopBlogsArray = [];
        for (let i = 0; i < 5; i++) {
            randomPopBlogsArray.push(popularBlogs[Math.floor(Math.random() * popularBlogs.length)]);
        }
        //console.log(randomPopBlogsArray);
        sideBarPopBlogsCreator(randomPopBlogsArray);
    }

    randomPopularBlogs();

    //Inject the random popular blogs in the side bar
    function sideBarPopBlogsCreator(popBlogs) {
        let sideBarPopBlogs = document.querySelector(".side-bar .popular-blogs");
        for(let i = 0; i < popBlogs.length; i++ ) {
            //console.log(popBlogs[i].children[1])
            sideBarPopBlogs.innerHTML += `
                <div class="thumbnail" data-postnum = ${popBlogs[i].dataset.post}>
                    ${popBlogs[i].children[1].innerHTML}
                    <div class="caption">
                        <h5 class="cursor text-center h4 dark-grey text-for-dark">${popBlogs[i].children[2].children[0].innerHTML}</h5>
                    </div>
                </div>`
        };
    }
    /*End Popular Posts Part*/
    
    /*Start Tags Part*/
    //Control tags part counter for different category
    let tags = document.querySelectorAll(".tags .tag.category");
    tags.forEach(tag => {
        let tagCategoryLength = document.querySelectorAll(`.thumbnail[data-category = ${tag.getAttribute("data-tag")}]`).length;
        //console.log(tagCategoryLength)
        tag.firstElementChild.innerHTML = `(${tagCategoryLength})`;
    });

    //Control tags part counter for all categories
    let allTag = document.querySelector(".tags .tag.all");
    let allCategoriesLength = document.querySelectorAll(`.blogs-box .thumbnail`).length;
    allTag.firstElementChild.innerHTML = `(${allCategoriesLength})`;

    //Control the tags part clicked event for different categories
    $(".tag.all").addClass("active theme-bg white-color");
    $(".tag:not(.all)").on("click", function() {
        $(this).addClass("active theme-bg white-color").siblings().removeClass("theme-bg active white-color");
        $(".pagerNav").css("display", "none");       
        $('.layout-side .thumbnail').parent().fadeOut();           
        $(`.layout-side .thumbnail[data-category = ${$(this).attr("data-tag")}]`).parent().fadeIn();
        if($('.layout-side .thumbnail').parent().parent().is("div.blogs-box")) {
            $('.layout-side .thumbnail').parent().unwrap();           
        }
        $("html, body").animate({scrollTop: 0}, "slow");
    });

    //Control the tags part clicked event for all categories
    $(".tag.all").on("click", function() {
        window.location.reload();
    });
    /*End Tags Part*/
    /*End Side Bar Side*/
    /*End Blogs Section*/
});