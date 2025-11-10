// theme toggle elements
const themeToggle = document.getElementById("theme-toggle"); // Get the button element
const icon = document.getElementById("theme-icon"); // Get the icon element

// DOM elements for posts and form
const blogPostContainer = document.getElementById("blog-post");
const savePostBtn = document.getElementById("savePostBtn");
const titleInput = document.getElementById("titleInput");
const contentInput = document.getElementById("contentInput");

// retrieve posts from localStorage
function getPosts() {
    return JSON.parse(localStorage.getItem("posts")) || [];
}

let posts = getPosts(); // add existing posts into the global array
let editIndex = null; // index of post (for edit )
let currentTheme = localStorage.getItem("theme") || "light"; // theme setting from localStorage

// Function to store posts to localStorage
function savePosts(posts) {
    localStorage.setItem("posts", JSON.stringify(posts)); // Stringify and save the array
}
// bootstrap modal instance
const modalElement = document.getElementById("createPostModal");
const postModal = new bootstrap.Modal(modalElement);

// function to render all posts
function renderPosts() {
    blogPostContainer.innerHTML = ""; // Clear existing content

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
        // Loop through each post to create a card
        const card = document.createElement("div");
        card.className = "card mb-4 w-50 mx-auto";
        card.innerHTML = `
            <div class="card-body">
                <div class="small text-muted">${post.date}</div>
                <h2 class="card-title">${post.title}</h2>
                <p class="card-text">${post.content}</p>
                <button class="btn btn-outline-secondary btn-sm me-2" data-index="${index}" data-action="edit">Edit</button>
                <button class="btn btn-outline-danger btn-sm" data-index="${index}" data-action="delete">Delete</button>
            </div>
        `;
        blogPostContainer.appendChild(card);
    });
}

// saves posts to local storage
function handleSavePost() {
    // selecting the input from form
    const title = titleInput.value.trim();
    const content = contentInput.value.trim();

    // basic validation
    if (!title) return alert("Title can't be empty");
    if (!content) return alert("Content can't be empty");

    // data is automatically added to the object
    const date = new Date().toLocaleDateString();

    // current instance of the post (check if editing or creating new)
    if (editIndex !== null) {
        // post edit
        //update existing post
        posts[editIndex] = { title, content, date };
        editIndex = null; // reset index
    } else {
        posts.push({ title, content, date }); //new post
    }

    savePosts(posts); // sync to localStorage
    renderPosts(); // refresh

    // clear the input
    titleInput.value = "";
    contentInput.value = "";

    postModal.hide(); // Hide the modal
}

// event delegation for delete/edit
blogPostContainer.addEventListener("click", (event) => {
    const target = event.target;
    const index = parseInt(target.dataset.index);

    if (!target.dataset.action) return; // Ignore clicks that aren't on action buttons

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

// Apply theme on initial load
document.documentElement.setAttribute("data-bs-theme", currentTheme);
icon.className =
    currentTheme === "light" ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";

// toggle on click listener
themeToggle.addEventListener("click", () => {
    const isDark =
        document.documentElement.getAttribute("data-bs-theme") === "dark"; // xheck current theme

    if (isDark) {
        document.documentElement.setAttribute("data-bs-theme", "light"); // light mode
        icon.className = "bi bi-sun-fill"; 
        localStorage.setItem("theme", "light"); 
    } else {
        document.documentElement.setAttribute("data-bs-theme", "dark"); // dark mode
        icon.className = "bi bi-moon-stars-fill";
        localStorage.setItem("theme", "dark"); 
    }
});
// event listener after DOM is fully loaded
document.addEventListener("DOMContentLoaded", renderPosts);
// Attach listener to save button
savePostBtn.addEventListener("click", handleSavePost);

renderPosts(); // render  posts
