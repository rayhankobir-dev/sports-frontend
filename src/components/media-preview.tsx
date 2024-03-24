/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, Fragment } from "react";
import SpinerLoading from "./spiner-loading";
import toast from "react-hot-toast";
import ReactPlayer from "react-player";

interface Props {
  className?: string;
  file?: Blob | string;
  alt?: string;
}

function MediaPreview({ className, file, alt }: Props) {
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState<string>("");
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!file) throw new Error("File not selected");
      if (typeof file === "string") {
        setPreview(file);
        if (
          file.endsWith(".m3u8") ||
          file.endsWith(".mp4") ||
          file.endsWith(".webm") ||
          file.endsWith(".ogv") ||
          file.endsWith(".mov")
        ) {
          setFileType("video");
        } else {
          setFileType("image");
        }
      } else {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
          if (file.type.startsWith("image/")) {
            setFileType("image");
          } else if (file.type.startsWith("video/")) {
            setFileType("video");
          } else {
            throw new Error("Unsupported file type");
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

    return () => {
      setPreview("");
      setFileType(null);
      setLoading(true);
    };
  }, [file]);

  return (
    <Fragment>
      {loading ? (
        <SpinerLoading className="text-green-600" />
      ) : (
        <Fragment>
          {file && fileType === "image" && (
            <img src={preview} alt={alt} className={className} />
          )}

          {file && fileType === "video" && (
            <ReactPlayer
              playing={true}
              width="100%"
              height="auto"
              url={preview}
            />
          )}
        </Fragment>
      )}
    </Fragment>
  );
}

export default MediaPreview;
