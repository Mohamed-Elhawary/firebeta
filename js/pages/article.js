$(document).ready(function() {
    /*Start Load Features, Navbar and Footer (DOM HTML Code)*/
    $("div.features").load('../../features.html');
    $("nav.navbar").load('../../navbar.html');
    $("footer.footer").load('../../footer.html');
    /*End Load Features, Navbar and Footer (DOM HTML Code)*/

    //Get the article content from the local storage depending on the the clicked blog in the blogs page
    if (localStorage.getItem("article")) {
        $("div.article").html(localStorage.getItem("article"));
    }
    
    //Add the article name to the page title
    $("title").html(`Firebeta | ${$(".article").find(".thumbnail h2").html()}`);

    /*Start Related Blogs Clicking Event*/
    $(".article").find(".related-blogs").on("click", ".thumbnail-box .thumbnail .blog-img", (e) => {
        let template = 
            `
            <div class="thumbnail relative">
                <h2 class="text-center margin-bt theme-color">${e.target.parentElement.nextElementSibling.querySelector("h3.blog-head").innerHTML}</h2>
                <img class="radius shadow"src="${e.target.src}" alt="article-img"/>
                <div class="info theme-box-shw white-bg">
                    <span class="date text-muted text-center"><i class="fas fa-table"></i>${e.target.parentElement.nextElementSibling.querySelector(".info .date").innerHTML}</span>
                    <span class="views text-muted text-center"><i class="fas fa-eye"></i>${e.target.parentElement.nextElementSibling.querySelector(".info .views").innerHTML}</span>
                    <span class="comments text-muted text-center"><i class="fas fa-comments"></i><span>${commentsNumber}</span></span>
                    <span class="category text-muted text-center"><i class="fas fa-tags"></i>${e.target.parentElement.previousElementSibling.innerHTML}</span>
                </div>
            </div>
            <div class='caption margin-bt padding'> 
                <p class="par shadow radius padding box-for-dark">${e.target.parentElement.nextElementSibling.querySelector(".disabled-disc .content1").innerHTML}</p>
                <p class="par shadow radius padding box-for-dark">${e.target.parentElement.nextElementSibling.querySelector(".disabled-disc .content2").innerHTML}</p>
            </div>
            <div class="row content">
                <div class="col-md-3 col-xs-6">
                    <div class= "img border" data-aos="fade-right" data-aos-easing="linear" data-aos-delay="50">
                        <img src="${e.target.dataset.secondimg}" alt="second-img">
                    </div>
                </div>
                <div class="col-md-9 col-xs-12">
                    <div class="texts">
                        <h4 class="theme-color h3" data-aos="fade-right" data-aos-easing="linear" data-aos-delay="50">${e.target.parentElement.nextElementSibling.querySelector("h3.blog-head").dataset.secondhead}:</h4>
                        <p class="par shadow radius padding box-for-dark" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="50">${e.target.parentElement.nextElementSibling.querySelector(".disabled-disc .content3").innerHTML}</p>   
                        <p class="par shadow radius padding box-for-dark" data-aos="fade-left" data-aos-easing="linear" data-aos-delay="50">${e.target.parentElement.nextElementSibling.querySelector(".disabled-disc .content3").innerHTML}</p>
                    </div>
                </div>
            </div>`
        $(".article").find(".main-blog").html(template);
        $("html, body").animate({scrollTop: 0}, "slow");
    });
    /*End Related Blogs Clicking Event*/

    /*Start Comments Mechnism*/
    let commentsNumber = $(".comments-box").children().length;
    $("span.comments span").html(commentsNumber);

    $(".comment-form .comment-btn").on("click", function(e) {
        e.preventDefault();
        let username = $(".comment-form .name").val().trim();
        let message  = $(".comment-form .message").val().trim();
        let date     = new Date();
        let when = dateFns.distanceInWordsToNow(
            date,
            {addSuffix: true}
        );
        
        if(username == "") {
            username = "Unknown";
        }

        if(message == "") {
            message = "Empty Comment";
        }

        let template = 
            `
            <div class="comment">
              <div class="col-xs-3">
                <div class= "comment-img">
                  <img src="../../images/article_comments/unknown.jpg" alt="comment-owner" class="img-responsive img-circle">
                </div>
              </div>
              <div class="col-xs-9">
                <div class="comment-body relative box-for-dark radius shadow padding margin-bt">
                  <div class="info">
                    <h4 class="theme-color h3 name">${username}</h4>
                    <span class="date text-muted">${when}</span>
                    <span class="replay theme-color cursor hvr-backward"><i class="fas fa-reply-all"></i>Replay</span>
                  </div>
                  <hr>
                  <p class="par text">${message}</p>   
                </div>
              </div>
          </div>
            `
        $(".comments-box").append(template);
        commentsNumber++;
        $("span.comments span").html(commentsNumber)
    });
    /*End Comments Mechnism*/
});

