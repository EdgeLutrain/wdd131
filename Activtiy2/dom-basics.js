const newParagraph = document.createElement("p");
newParagraph.innerText = "Added with Javascript!";
document.body.appendChild(newParagraph);

const newImage = document.createElement("img");
newImage.setAttribute("src", "https://picsum.photos/200");
newImage.setAttribute("alt", "Random images.");
document.body.appendChild(newImage);

const newDiv = document.createElement("div");
newDiv.innerHTML = "<ul><li>One</li><li>Two</li><li>Three</li></ul>";
document.body.appendChild(newDiv);

const newSection = document.createElement("h2");
newSection.innerText = "Dom Basics";
document.body.appendChild(newSection);

const newParagraph3 = document.createElement("p");
newParagraph3.innerText = "This was Added with Javascript!";
document.body.appendChild(newParagraph3);