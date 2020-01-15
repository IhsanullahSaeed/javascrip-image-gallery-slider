let gallaryImages = document.querySelectorAll(".gallary-img");
let latestOpenedImg;
let windowWith = window.innerWidth;

if (gallaryImages) {
  gallaryImages.forEach(function(image, index){
    image.onclick = function() {
      let getElementCss = window.getComputedStyle(image);
      let getFullImgUrl = getElementCss.getPropertyValue("background-image");
      let getImgUrlPos = getFullImgUrl.split("/thumbnail/");

      let setNewImgUrl = getImgUrlPos[1].replace('")', '');

      latestOpenedImg = index + 1;

      let container = document.body;
      let newImgWindow = document.createElement("div");
      container.appendChild(newImgWindow);
      newImgWindow.setAttribute("class", "img-window");
      newImgWindow.setAttribute("onclick", "closeImg()");

      let newImg = document.createElement("img");
      newImgWindow.appendChild(newImg);
      newImg.setAttribute("src", "assets/images/" + setNewImgUrl);
      newImg.setAttribute("id", "current-img");


      newImg.onload = function() {

        let imgWidth = this.width;
        let calcImgToEdge = ((windowWith - imgWidth) / 2) - 80;

        let newNextBtn = document.createElement("a");
        let btnNextText = document.createTextNode("Next");
        newNextBtn.appendChild(btnNextText);
        container.appendChild(newNextBtn);
        newNextBtn.setAttribute("class", "img-btn-next");
        newNextBtn.setAttribute("onclick", "changeImg(1)");
        newNextBtn.style.cssText = "right: " + calcImgToEdge + "px";

        let newPrevBtn = document.createElement("a");
        let btnPrevText = document.createTextNode("Prev");
        newPrevBtn.appendChild(btnPrevText);
        container.appendChild(newPrevBtn);
        newPrevBtn.setAttribute("class", "img-btn-prev");
        newPrevBtn.setAttribute("onclick", "changeImg(0)");
        newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px";
      }
    }
  });
}

function closeImg(){
  document.querySelector(".img-window").remove();
  document.querySelector(".img-btn-next").remove();
  document.querySelector(".img-btn-prev").remove();
}

function changeImg(changeDir) {
  console.log(latestOpenedImg);
    document.querySelector("#current-img").remove();

    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    let calcNewImg;
    if (changeDir === 1 ) {
      calcNewImg = latestOpenedImg + 1;
      if (calcNewImg > gallaryImages.length) {
        calcNewImg = 1;
      }
    }
    else if (changeDir === 0 ) {
      calcNewImg = latestOpenedImg - 1;
      if (latestOpenedImg == 1) {
        calcNewImg = gallaryImages.length -1;
      }
    }
    newImg.setAttribute("src", "assets/images/"  + "img-"  + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");
    latestOpenedImg = calcNewImg;

    newImg.onload = function() {

      let imgWidth = this.width;
      let calcImgToEdge = ((windowWith - imgWidth) / 2) - 80;


      let nextBtn = document.querySelector(".img-btn-next");
      nextBtn.style.cssText = "right: " + calcImgToEdge + "px";
      console.log(nextBtn);
      let prevBtn = document.querySelector(".img-btn-prev");
      prevBtn.style.cssText = "left: " + calcImgToEdge + "px";
    }
}
