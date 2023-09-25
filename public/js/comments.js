// developp the js logic to handle comments

const commentFormHandler = async (event) => {
    event.preventDefault(); 
  
    const commentForm = document.querySelector("#comment-form");
    const postId = commentForm.dataset.postId;
    const commentText = document.querySelector("#comment-text").value;
    
    if (commentText.trim() === "") {
      alert("Comment cannot be blank");
      return;
    }
    
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        body: JSON.stringify({ post_id: postId, text: commentText }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        location.reload();
      } else {
        alert("Failed to post comment");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    }
  };
  
  const commentForm = document.querySelector("#comment-form");
  commentForm.addEventListener("submit", commentFormHandler);
  
