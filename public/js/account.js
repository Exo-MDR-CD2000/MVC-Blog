// develop user account functionality
// needs to allow post creation with title and content fields working
// needs to allow post deletion
// needs to allow post editing



const newPostForm = document.querySelector("#new-post-form");
newPostForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-content").value.trim();
  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to create post");
    }
  } else {
    alert("Fields cannot be empty");
  }
});
