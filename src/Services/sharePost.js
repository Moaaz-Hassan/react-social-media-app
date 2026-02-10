export function sharePost(postId , body) {
  if (!navigator.share) return;

  const postUrl = `${window.location.origin}/single-Post/${postId}`;

  navigator.share({
    title: body,
    text: postUrl,
  });
}
