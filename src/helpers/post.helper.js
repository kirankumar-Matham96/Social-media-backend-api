// package imports
import { v4 as uuidv4 } from "uuid";

// in-build imports
import fs from "fs";
import path from "path";

export class PostHelper {
  /**
   * To save the post as a draft
   *
   * parameters:
   *    post: post object
   */
  static saveDraft = (req, res) => {
    // constructing the folder path
    const folderPath = path.join(path.resolve(), "src/drafts");

    // constructing unique file name
    const fileName = `${Date.now()}_draft_post.txt`;

    // creating an object to organize the post content
    const post = {
      id: uuidv4(),
      caption: req.body.caption,
      image: req.file.filename,
    };

    // writing to a file to save
    fs.writeFileSync(`${folderPath}/${fileName}`, JSON.stringify(post));

    // sending response
    res.status(200).send({ status: "success", message: "file saved" });
  };

}
