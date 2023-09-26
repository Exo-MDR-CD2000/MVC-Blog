// develop user account functionality
// Does the route need to be changed to show the user's posts?
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

// // Edit post form handler
// const editPostFormHandler = async (event) => {
//     event.preventDefault();
//     const title = document.querySelector("#edit-post-title").value.trim();
//     const content = document.querySelector("#edit-post-content").value.trim();
//     const id = document.querySelector("#edit-post-id").value.trim();
  
//     if (title && content && id) {
//       const response = await fetch(`/api/posts/${id}`, {
//         method: "PUT",
//         body: JSON.stringify({ title, content }),
//         headers: { "Content-Type": "application/json" },
//       });
  
//       if (response.ok) {
//         window.location.reload();
//       } else {
//         alert("Failed to update post");
//       }
//     } else {
//       alert("Fields cannot be empty");
//     }
//   };
    
  // Delete post handler
  const deletePostHandler = async (event) => {
      event.preventDefault();
      const id = event.target.getAttribute("data-post-id");
    
      if (id) {
        const response = await fetch(`/api/posts/${id}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          window.location.reload();
        } else {
          alert("Failed to delete post");
        }
      }
    };
    
//   // Add event listeners to edit and delete post buttons
//   const editPostButtons = document.querySelectorAll(".edit-post");
//   editPostButtons.forEach((button) => {
//     button.addEventListener("click", async (event) => {
//       const id = event.target.getAttribute("data-post-id");
//       const response = await fetch(`/api/posts/${id}`);
//       const post = await response.json();
  
//       // Populate edit post form with post data
//       document.querySelector("#edit-post-title").value = post.title;
//       document.querySelector("#edit-post-content").value = post.content;
//       document.querySelector("#edit-post-id").value = post.id;
  
//       // Show edit post form
//       document.querySelector("#edit-post-form").classList.remove("d-none");
//     });
//   });
  
  const deletePostButtons = document.querySelectorAll(".delete-post");
  deletePostButtons.forEach((button) => {
    button.addEventListener("click", deletePostHandler);
  });
  
//   // Add event listener to edit post form
//   const editPostForm = document.querySelector("#edit-post-form");
//   editPostForm.addEventListener("submit", editPostFormHandler);