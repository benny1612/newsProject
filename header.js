
export function createHeader(){
const header = document.getElementById("header")


const newsDiv = document.createElement("a")
newsDiv.textContent = "news"
newsDiv.classList.add("home")


header.appendChild(newsDiv)
const homeDiv = document.createElement("a")

homeDiv.textContent = "home"
homeDiv.classList.add("home")

header.appendChild(homeDiv)

const createStory = document.createElement("a")

createStory.textContent = "create Story"
createStory.classList.add("createStory")

header.appendChild(createStory)

}


