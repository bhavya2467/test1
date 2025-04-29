document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content })
    });

    fetchPosts();
});

async function fetchPosts() {
    const res = await fetch("http://localhost:3000/posts");
    const posts = await res.json();

    const postsDiv = document.getElementById("posts");
    postsDiv.innerHTML = "";
    posts.forEach(post => {
        postsDiv.innerHTML += `<div><h2>${post.title}</h2><p>${post.content}</p></div>`;
    });
}

fetchPosts();
