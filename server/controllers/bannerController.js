const {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} = require("firebase/firestore");
const { firestore } = require("../db");

const COLLECTION_BANNERS = collection(firestore, "banners");

const get_document_using_document_reference = async (docRef) => {
  let docData;
  const snapShot = await getDoc(docRef);
  if (snapShot.exists()) {
    docData = { id: snapShot.id, ...snapShot.data() };
  }
  return docData;
};
const getBanners = async (req, res, next) => {
  try {
    const collectionQuery = query(collection(firestore, "banners"));
    const snapShot = await getDocs(collectionQuery);
    let data = [];
    snapShot.forEach((snap) => {
      const obj = { id: snap.id, ...snap.data() };
      data.push(obj);
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};
const saveBanner = async (req, res, next) => {
  try {
    const data = req.body;
    let docRef;
    if (data?.id) {
      docRef = doc(firestore, `banners/${data.id}`);
      await updateDoc(docRef, data);
    } else {
      const { text, url } = data;
      docRef = await addDoc(COLLECTION_BANNERS, { text, url });
    }
    const documentData = await get_document_using_document_reference(docRef);
    res.status(200).send(documentData);
  } catch (error) {
    res.status(400).send(error?.message);
  }
};
const deleteBanner = async (req, res, next) => {
  try {
    const { id } = req.body;
    if (id) {
      const docRef = doc(firestore, `banners/${id}`);
      await deleteDoc(docRef);
    }
    res.status(200).send("Success");
  } catch (error) {
    res.status(400).send(error?.message);
  }
};

module.exports = { getBanners, saveBanner, deleteBanner };
