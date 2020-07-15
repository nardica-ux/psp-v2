import { firestore } from "./firebase.utils";

export const CommentAddToFirebase = async ({
  body,
  meeting_id,
  user_id,
  event_id,
  user_name,
}) => {
  if (!event_id || !meeting_id) return false;
  try {
    let newComment = firestore.collection("meeting_comments").doc();
    let comment_id = newComment.id;

    await newComment.set({
      user_name,
      comment_id,
      meeting_id,
      user_id,
      createdAt: new Date(),
      body,
      type: "comment",
      vote_count: null,
      event_id,
    });
    let newCom = await newComment.get();
    return newCom.data();
  } catch (err) {
    console.log(err.message);
  }
};

export const voteMeetingComment = async ({ vote, comment_id }) => {
  try {
    var voteCommentRef = await firestore
      .collection("meeting_comments")
      .doc(comment_id)
      .get();
    let voteDoc = voteCommentRef.data();
    if (voteDoc) {
      await voteCommentRef.update({ vote_count: voteDoc.count + vote });
    }
    let updated = await voteCommentRef.get();
    return updated.data();
  } catch (error) {
    console.error("Error adding vote_comment: ", error.message);
    return false;
  }
};

export const deleteCommentFromFirebase = async ({ id }) => {
  var okDelete = false;
  try {
    let el = await firestore
      .collection("meeting_comments")
      .doc(id)
      .get();
    let elData = el.data();
    console.log(elData);
    await firestore
      .collection("meeting_comments")
      .doc(id)
      .delete();
    okDelete = {
      meeting_id: elData.meeting_id,
      event_id: elData.event_id,
      id,
    };
    return okDelete;
  } catch (err) {
    console.log("*** error delete fromFireBase", err.message);
    return okDelete(false);
  }
  return okDelete;
};
