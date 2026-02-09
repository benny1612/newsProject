import { createHeader } from "./header.js";

const apiKey = "800758cda9b64c778d31f2b2b82390c6";
const main = document.getElementById("main");

createHeader();
let arrData = [];

const fetchNews = async (query) => {
  main.innerHTML = "";

  if (!localStorage.getItem("data")) {
    let url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
    arrData = data.articles;
    localStorage.setItem("data", JSON.stringify(data.articles));
  } else {
    arrData = JSON.parse(localStorage.getItem("data"));
  }
  arrData.forEach((article, i) => {
    const articleDiv = document.createElement("div");
    articleDiv.className = "news-article";
    articleDiv.id = i;
    const articleImage = document.createElement("img");
    articleImage.src = article.urlToImage;
    articleImage.alt = article.title;
    const articleAuthor = document.createElement("h3");
    articleAuthor.textContent = article.author;
    const articleTitle = document.createElement("h2");
    articleTitle.textContent = article.title;

    const articleDescription = document.createElement("p");
    articleDescription.textContent = article.description;

    articleDiv.appendChild(articleAuthor);
    articleDiv.appendChild(articleTitle);
    articleDiv.appendChild(articleImage);
    main.appendChild(articleDiv);
  });
};
function backHomeHaeder() {
  const backHomeHeaders = document.querySelectorAll(".home");
  backHomeHeaders.forEach((e) => {
    e.addEventListener("click", () => {
      window.location.reload();
    });
  });
}

function createStory() {
  const createStoryBu = document.querySelector(".createStory");
  createStoryBu.addEventListener("click", () => {
    topS.style.visibility = "hidden";
    main.innerHTML = "";
    const form = document.createElement("form");
    const formtitle = document.createElement("p");
    formtitle.textContent = "create a new story";
    form.appendChild(formtitle);
    const author = document.createElement("input");
    author.setAttribute("type", "text");
    author.setAttribute("name", "author");
    author.setAttribute("placeholder", "author");
    form.appendChild(author);
    const title = document.createElement("input");
    title.setAttribute("type", "text");
    title.setAttribute("name", "title");
    title.setAttribute("placeholder", "title");
    form.appendChild(title);
    const content = document.createElement("input");
    content.setAttribute("type", "text");
    content.setAttribute("name", "content");
    content.setAttribute("placeholder", "content");
    form.appendChild(content);
    const description = document.createElement("input");
    description.setAttribute("type", "text");
    description.setAttribute("name", "description");
    description.setAttribute("placeholder", "description");
    form.appendChild(description);

    const uploadImage = document.createElement("input");
    uploadImage.setAttribute("type", "file");
    uploadImage.setAttribute("name", "uploadImage");
    uploadImage.setAttribute("accept", "image/png, image/jpg, image/jpeg");
    form.appendChild(uploadImage);

    const showedImage = document.createElement("img");
    showedImage.height = "50";
    showedImage.width = "50";
    form.appendChild(showedImage);

    uploadImage.addEventListener("change", (event) => {
      const reader = new FileReader(); 
      reader.onload = function () {
        showedImage.src = reader.result; 
      };
      reader.readAsDataURL(event.target.files[0]); 
    });

    const submit = document.createElement("input");
    submit.setAttribute("type", "submit");
    submit.setAttribute("value", "Submit");
    form.appendChild(submit);
    main.appendChild(form);
    
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const obj = Object.fromEntries(fd);
      obj.urlToImage = showedImage.src;
      console.log(obj);

      let result = JSON.parse(localStorage.getItem("data"));
      result.push(obj);
      localStorage.setItem("data", JSON.stringify(result));
      window.location.reload();
    });
  });
}
function expandArticle() {
  const findArticle = document.querySelectorAll(".news-article");
  findArticle.forEach((e) => {
    e.addEventListener("click", () => {
      const topS = document.getElementById("topS");
      topS.style.visibility = "hidden";

      main.innerHTML = "";
      const articleDiv = document.createElement("div");
      articleDiv.className = "news-article";
      articleDiv.id = e.id;
      const articleImage = document.createElement("img");
      articleImage.src = arrData[e.id].urlToImage;
      articleImage.alt = arrData[e.id].title;
      const articleAuthor = document.createElement("h3");
      articleAuthor.textContent = `author: ${arrData[e.id].author}`;
      const articleTitle = document.createElement("h3");
      articleTitle.textContent = arrData[e.id].title;

      const articleDescription = document.createElement("p");
      articleDescription.textContent = `description : ${arrData[e.id].description};`;
      const articlePublishedAt = document.createElement("p");
      const articleContent = document.createElement("p");
      articleContent.textContent = `Content: ${arrData[e.id].content}`;
      const articleDate = new Date(arrData[e.id].publishedAt);
      articlePublishedAt.textContent = `Published At: ${articleDate.toLocaleDateString()} ${articleDate.toLocaleTimeString()}`;
      const backHome = document.createElement("a");
      backHome.classList.add("backHome");

      backHome.textContent = "back home";
      articleDiv.appendChild(backHome);

      articleDiv.appendChild(articlePublishedAt);

      articleDiv.appendChild(articleAuthor);
      articleDiv.appendChild(articleTitle);
      articleDiv.appendChild(articleImage);
      articleDiv.appendChild(articleDescription);
      main.appendChild(articleDiv);
      articleDiv.appendChild(articleContent);
      main.appendChild(articleDiv);
      backHome.addEventListener("click", () => {
        window.location.reload();
      });
    });
  });
}

fetchNews();
backHomeHaeder();
createStory();
expandArticle();
