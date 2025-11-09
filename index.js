const createPostBtn = document.getElementById("create-post");
const themeToggle = document.getElementById("theme-toggle");

function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts));
}

document.addEventListener("DOMContentLoaded", () => {
    const posts = getPosts();
    renderPosts(posts);
});
