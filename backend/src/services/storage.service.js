const ImageKit = require("imagekit");

let client = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

async function uploadFile(file, fileName) {
  const result = await client.upload({
    file: file,
    fileName: fileName,
  });

  return result;
}

module.exports = {
  uploadFile,
};
