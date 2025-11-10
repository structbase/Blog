const themeToggle = document.getElementById("theme-toggle");
const blogPostContainer = document.getElementById("blog-post");
const savePostBtn = document.getElementById("savePostBtn");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

const posts = [];
let editIndex = null;

function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}
// bootstrap modal instance
const modalElement = document.getElementById("createPostModal");
const postModal = new bootstrap.Modal(modalElement);

function renderPosts() {
    blogPostContainer.innerHTML = "";

    if (posts.length === 0) {
        blogPostContainer.innerHTML = "";
        blogPostContainer.innerHTML = `
            <span class="text-center text-muted d-block">
                There are no posts yet — please create one by pressing
                <strong>Create Post</strong>.
            </span>
        `;
        return;
    }

    posts.forEach((post, index) => {
        const card = document.createElement("div");
        card.className = "card mb-4 w-50 mx-auto";
        card.innerHTML = `
            <div class="card-body">
                <div class="small text-muted">${post.date}</div>
                <h2 class="card-title">${post.title}</h2>
                <p class="card-text">${post.content}</p>
                <button class="btn btn-outline-primary btn-sm me-2" data-index="${index}" data-action="read">Read more</button>
                <button class="btn btn-outline-secondary btn-sm me-2" data-index="${index}" data-action="edit">Edit</button>
                <button class="btn btn-outline-danger btn-sm" data-index="${index}" data-action="delete">Delete</button>
            </div>
        `;
        blogPostContainer.appendChild(card);
    });
}
