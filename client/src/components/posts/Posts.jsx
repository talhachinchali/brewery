

import Post from "../post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  // Reverse the posts array
  const reversedPosts = posts.slice().reverse();

  return (
    <div className="posts">
      {reversedPosts.map((p) => (
        <Post key={p.id} post={p} />
      ))}
    </div>
  );
}
