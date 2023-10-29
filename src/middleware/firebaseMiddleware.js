const { getStorage, ref, uploadBytesResumable } = require("firebase/storage");
const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} = require("firebase/auth");
const { auth } = require("../../config/firebase");
const config = require("../../config/config");

async function uploadImage(file, quantity) {
  const storageFB = getStorage();

  await signInWithEmailAndPassword(
    auth,
    config.firebaseUser,
    config.firebaseAuth
  );

  if (quantity === "single") {
    const dateTime = Date.now();
    const fileName = `images/${dateTime}`;
    const storageRef = ref(storageFB, fileName);
    const metadata = {
      contentType: file.type,
    };
    await uploadBytesResumable(storageRef, file.buffer, metadata);
    return fileName;
  }

  if (quantity === "multiple") {
    for (let i = 0; i < file.images.length; i++) {
      const dateTime = Date.now();
      const fileName = `images/${dateTime}`;
      const storageRef = ref(storageFB, fileName);
      const metadata = {
        contentType: file.images[i].mimetype,
      };

      const saveImage = await Image.create({ imageUrl: fileName });
      file.item.imageId.push({ _id: saveImage._id });
      await file.item.save();

      await uploadBytesResumable(storageRef, file.images[i].buffer, metadata);
    }
    return;
  }
}

const useFirebase = async (req, res, next) => {
  try {
    if (!req.file) {
      next();
    } else {
      const file = {
        type: req.file?.mimetype,
        buffer: req.file?.buffer,
      };
      const buildImage = await uploadImage(file, "single");
      req.imageName = buildImage;
      // const name = buildImage.split("/");
      // req.imageName = `https://firebasestorage.googleapis.com/v0/b/golib-59a06.appspot.com/o/images%2F${name[1]}?alt=media`;
      next();
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = useFirebase;