const themeToggle = document.getElementById("theme-toggle");
const blogPostContainer = document.getElementById("blog-post");
const savePostBtn = document.getElementById("savePostBtn");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

let posts = getPosts();
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

// saves posts  to local storage
function handleSavePost() {
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    if (!title) return alert("Title can't be empty");
    if (!content) return alert("Content can't be empty");

    const date = new Date().toLocaleDateString();

    if (editIndex !== null) {
        posts[editIndex] = { title, content, date };
        editIndex = null; // Reset edit mode
    } else {
        posts.push({ title, content, date });
    }

    savePosts(posts); // sync to localStorage
    renderPosts(); // refresh display

    titleInput.value = "";
    contentInput.value = "";

    postModal.hide();
}

// event delegation for delete/edit 
blogPostContainer.addEventListener("click", (event) => {
    const target = event.target;
    const index = parseInt(target.dataset.index);

    if (!target.dataset.action) return;

    if (target.dataset.action === "delete") {
        posts.splice(index, 1); // remove the post from array
        savePosts(posts);
        renderPosts();
    } else if (target.dataset.action === "edit") {
        const post = posts[index];
        titleInput.value = post.title;
        contentInput.value = post.content;
        editIndex = index;
        postModal.show();
    }
});

document.addEventListener("DOMContentLoaded", renderPosts);
savePostBtn.addEventListener("click", handleSavePost);

renderPosts();
