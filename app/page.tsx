export default function Home() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold">Image Convert API</h1>
      <p className="text-lg py-2">A powerful API to convert and resize your images with ease</p>
      <h2 className="text-xl font-semibold mb-3">Supported Formats:</h2>
      <div className="flex flex-col gap-2">
        <div>- PNG</div>
        <div>- JPG</div>
        <div>- JPEG</div>
        <div>- GIF</div>
        <div>- WebP</div>
        <div>- AVIF</div>
        <div>- PDF</div>
        <div>- TIFF</div>
        <div>- TIF</div>
        <div>- HEIF</div>
        <div>- JP2</div>
      </div>
    </div>
  );
}
