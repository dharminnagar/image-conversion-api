import { NextRequest, NextResponse } from "next/server";
import sharp, { FormatEnum } from "sharp";
import axios from "axios";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const url = searchParams.get("url");
    const width = searchParams.get("width");
    const height = searchParams.get("height");
    let format = searchParams.get("format");

    if (!url) {
        return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const image = await axios.get(url, {
        responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(image.data);

    const metadata = await sharp(imageBuffer).metadata();
    const originalFormat = metadata.format;

    if(!format) {
        format = originalFormat;
    }

    if (!format || !["png", "jpg", "jpeg", "gif", "webp", "avif", "pdf", "avif", "tiff", "tif", "heif", "jp2"].includes(format)) {
        return new NextResponse("Unsupported image format", { status: 400 });
    }

    const resizedImage = sharp(imageBuffer).resize({
        width: width ? Number(width) : undefined,
        height: height ? Number(height) : undefined,
        fit: "contain",
    });

    const outputBuffer = await resizedImage.toFormat(format as keyof FormatEnum).toBuffer();

    return new NextResponse(new Blob([new Uint8Array(outputBuffer)]), {
        headers: {
            "Content-Type": `image/${format}`,
            "Cache-Control": "public, max-age=31536000, immutable",
        },
    });
}