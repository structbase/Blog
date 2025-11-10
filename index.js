const createPostBtn = document.getElementById("create-post");
const themeToggle = document.getElementById("theme-toggle");
const blogPostContainer = document.getElementById("blog-post");

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

    if (posts.innerHTML = 0) {
        blogPostContainer.innerHTML = `
            <span class="text-center text-muted d-block">
                There are no posts yet — please create one by pressing
                <strong>Create Post</strong>.
            </span>
        `;
    }
}
