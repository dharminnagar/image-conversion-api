# Image Conversion API

A Next.js-based API service that allows you to convert and resize images on the fly. This service provides a simple HTTP endpoint that accepts image URLs and returns the converted/resized images in your desired format.

## Features

- Convert images between multiple formats (PNG, JPG, JPEG, GIF, WebP, AVIF, PDF, TIFF, HEIF, JP2)
- Resize images while maintaining aspect ratio
- Automatic format detection from source image
- Efficient image processing using Sharp
- Caching support for better performance

## API Usage

### Endpoint

```
GET /api/convert
```

### Query Parameters

- `url` (required): The URL of the image to convert
- `format` (optional): Target format for the converted image. If not specified, the original format will be used.
- `width` (optional): Desired width of the output image
- `height` (optional): Desired height of the output image

### Example Request

```
GET /api/convert?url=https://example.com/image.jpg&format=webp&width=800
```

### Supported Formats

- PNG
- JPG/JPEG
- GIF
- WebP
- AVIF
- PDF
- TIFF/TIF
- HEIF
- JP2

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Sharp](https://sharp.pixelplumbing.com/) - High performance image processing
- [Axios](https://axios-http.com/) - HTTP client

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Author

- [@dharminnagar](https://github.com/dharminnagar)

## License

This project is licensed under the MIT License

## Support

If you encounter any issues or have suggestions, please [open an issue](https://github.com/dharminnagar/image-conversion-api/issues).