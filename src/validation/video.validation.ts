/* eslint-disable @typescript-eslint/no-explicit-any */
export function validateImage(
  selectedImage: File | null,
  setError: (error: string) => void
): boolean {
  const maxSize = 5 * 1024 * 1024;
  if (!selectedImage) {
    setError("Thumbnail is required");
    return false;
  } else if (selectedImage.size > maxSize) {
    setError("Thumbnail exceeds maximum file size (5MB)");
    return false;
  } else {
    const allowedFormats = ["jpg", "jpeg", "png", "webp"];
    const fileNameParts = selectedImage.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      setError("Thumbnail format is not supported(jpg,jpeg,png,webp)");
      return false;
    }
    setError("");
    return true;
  }
}

export function validateVideo(
  video: File | null,
  setError: (error: string) => void
): boolean {
  const maxSize = 50 * 1024 * 1024;
  if (!video) {
    setError("Video is required");
    return false;
  } else if (video.size > maxSize) {
    setError("Video exceeds maximum file size (50MB)");
    return false;
  } else {
    const allowedFormats = ["mp4", "wav", "mpeg4"];
    const fileNameParts = video.name.split(".");
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (!allowedFormats.includes(fileExtension)) {
      setError("Video format is not supported(mpeg4,wav,mp4)");
      return false;
    } else {
      setError("");
      return true;
    }
  }
}
