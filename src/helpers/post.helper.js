// package imports
import { v4 as uuidv4 } from "uuid";
import archiver from "archiver";

// in-build imports
import fs from "fs";
import path from "path";

// module imports
import PostModel from "../features/posts/models/post.model.js";

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

  /**
   * To archive a post using archiver module
   */
  static archivePost = (req, res) => {
    const postId = req.params.id;
    const post = PostModel.get(postId);

    // constructing the folder path
    const folderPath = path.join(path.resolve(), "src/archives");

    // constructing unique file name
    const fileName = `${Date.now()}_archive_post.txt`;

    // archive file name construction
    // const archiveName = `${Date.now()}_archive.zip`;
    const archiveName = `1_archive.zip`;

    // constructing the file path
    const outputFilePath = path.join(folderPath, archiveName);

    // create a file to stream archive data to.
    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver("zip", {
      zlib: { level: 9 }, // Sets the compression level.
    });

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on("close", function () {
      console.log(archive.pointer() + " total bytes");
      console.log(
        "archiver has been finalized and the output file descriptor has closed."
      );
    });

    // This event is fired when the data source is drained no matter what was the data source.
    // It is not part of this library but rather from the NodeJS Stream API.
    // @see: https://nodejs.org/api/stream.html#stream_event_end
    output.on("end", function () {
      console.log("Data has been drained");
    });

    // good practice to catch warnings (ie stat failures and other non-blocking errors)
    archive.on("warning", function (err) {
      if (err.code === "ENOENT") {
        // log warning
      } else {
        // throw error
        throw err;
      }
    });

    // good practice to catch this error explicitly
    archive.on("error", function (err) {
      throw err;
    });

    // pipe archive data to the file
    archive.pipe(output);

    // append a file from string
    archive.append(JSON.stringify(post), { name: fileName });

    // finalize the archive (ie we are done appending files but streams have to finish yet)
    // 'close', 'end' or 'finish' may be fired right after calling this method so register to them beforehand
    archive.finalize();

    // delete the file
    res.status(200).send({ status: "success", message: "post archived" });
  };
}
