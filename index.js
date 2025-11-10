const themeToggle = document.getElementById("theme-toggle");
const blogPostContainer = document.getElementById("blog-post");
const savePostBtn = document.getElementById("savePostBtn");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

const posts = [];
let editIndex = [];

function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function renderPosts() {
    const posts = getPosts();

    blogPostContainer.innerHTML = "";

    // dynamic no blog message
    if ((posts.innerHTML = 0)) {
        blogPostContainer.innerHTML = `
            <span class="text-center text-muted d-block">
                There are no posts yet — please create one by pressing
                <strong>Create Post</strong>.
            </span>
        `;
    }

    // blog card
    posts.forEach((post, index) => {
        const card = document.getElementById("div");
        card.classList = "card mb-4 w-50 mx-auto";
        card.innerHTML = `
            <div class="card-body">
                <div class="small text-muted">${post.date}</div>
                <h2 class="card-title">${post.title}</h2>
                <p class="card-text">${post.content}</p>
                <button class="btn btn-outline-primary btn-sm me-2" data-index="${index}" id="btn-read-more">Read more</button>
                <button class="btn btn-outline-secondary btn-sm me-2" data-index="${index}" id="btn-edit">Edit</button>
                <button class="btn btn-outline-danger btn-sm" data-index="${index}" id="btn-delete">Delete</button>
            </div>
        `;
        blogPostContainer.appendChild(card);
    });
}
