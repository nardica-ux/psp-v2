import { firestore } from "./firebase.utils";

export const CommentAddToFirebase = async (
  body,
  meeting_id,
  user_id = "HJ0ZzqUDNnbMVUhdnbOybbvcKuz1"
) => {
  try {
    let newComment = firestore.collection("meeting_comments").doc();
    let own_id = newComment.id;
    let date = new Date();
    let tdate = date.toLocaleTimeString();
    date = date.toLocaleDateString() + "-" + tdate.split(":").join("/");

    await newComment.set({
      comment_id: own_id,
      meeting_id,
      user_id,
      createdAt: date,
      body,
      type: "comment",
      vote_count: null,
    });
    let newCom = await newComment.get();
    return newCom.data();
  } catch (err) {
    console.log(err.message);
  }
};

export const voteMeetingComment = async (vote, comment_id) => {
  console.log(comment_id, vote);
  try {
    var voteCommentRef = firestore
      .collection("meeting_comments")
      .doc(comment_id);

    var voteDoc = await voteCommentRef.get();
    voteDoc = voteDoc.data();

    if (voteDoc) {
      let count = voteDoc.vote_count;
      await voteCommentRef.update({ vote_count: count + vote });
    }
  } catch (error) {
    console.error("Error adding vote_comment: ", error.message);
    return false;
  }
  return voteDoc.vote_count + vote;
};

export const deleteCommentFromFirebase = async (id) => {
  var okDelete = false;
  try {
    await firestore
      .collection("meeting_comments")
      .doc(id)
      .delete();
    okDelete = true;
  } catch (err) {
    console.log("*** error delete fromFireBase", err.message);
  }
  return okDelete;
};
