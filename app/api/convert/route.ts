import { NextRequest, NextResponse } from "next/server";
import sharp, { FormatEnum } from "sharp";
import axios from "axios";
import { PDFDocument } from "pdf-lib";

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

    if (!["png", "jpg", "jpeg", "gif", "webp", "avif", "tiff", "tif", "heif", "jp2", "pdf"].includes(format)) {
        return new NextResponse("Unsupported image format", { status: 400 });
    }

    if(format === "pdf") {
        // Create a new PDF document
        const pdfDoc = await PDFDocument.create();
        
        // Convert image to PNG for embedding in PDF
        const pngBuffer = await sharp(imageBuffer)
            .resize({
                width: width ? Number(width) : undefined,
                height: height ? Number(height) : undefined,
                fit: "contain",
            })
            .png()
            .toBuffer();
        
        // Embed the PNG image
        const pngImage = await pdfDoc.embedPng(pngBuffer);
        
        // Add a page with the same dimensions as the image
        const page = pdfDoc.addPage([pngImage.width, pngImage.height]);
        
        // Draw the image on the page
        page.drawImage(pngImage, {
            x: 0,
            y: 0,
            width: pngImage.width,
            height: pngImage.height,
        });
        
        // Save the PDF
        const pdfBytes = await pdfDoc.save();
        
        return new NextResponse(new Blob([new Uint8Array(pdfBytes)]), {
            headers: {
                "Content-Type": "application/pdf",
                "Cache-Control": "public, max-age=31536000, immutable",
            },
        });
    } else {
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
}