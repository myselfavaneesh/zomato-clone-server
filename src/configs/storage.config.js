import ImageKit from '@imagekit/nodejs';

const imagekitClient = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function uploadFile(buffer) {
    try {
        const response = await imagekitClient.files.upload({
            file: buffer.toString("base64"),
            fileName: "post.png"
        })
        return response
    } catch (error) {
        return error
    }
}

export default uploadFile;