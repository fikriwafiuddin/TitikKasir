import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload } from "lucide-react"
import Image from "next/image"
import { ChangeEvent, DragEvent, useCallback, useRef, useState } from "react"

interface FileUploadProps extends React.ComponentProps<"input"> {
  onFileSelect: (file: File) => void
  acceptedFileTypes?: string
  fileRestrictionsText?: string
  previewUrl?: string | null
}

const DEFAULT_MIME_TYPES = "image/png, image/jpeg, audio/mp3, video/mp4"
const DEFAULT_RESTRICTIONS_TEXT = "Max 120 MB, PNG, JPEG, MP3, MP4"

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  acceptedFileTypes = DEFAULT_MIME_TYPES,
  fileRestrictionsText = DEFAULT_RESTRICTIONS_TEXT,
  previewUrl,
  ...props
}) => {
  const [dragActive, setDragActive] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (files && files.length > 0) {
        onFileSelect(files[0])
      }
    },
    [onFileSelect],
  )

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      handleFiles(e.target.files)
    },
    [handleFiles],
  )

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  const borderClass = dragActive
    ? "border-primary bg-primary/5"
    : "border-input bg-background hover:border-muted-foreground/50"

  return (
    <div
      className={`relative flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-10 transition-colors duration-200 ${borderClass}`}
      onDragEnter={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <Input
        ref={inputRef}
        type="file"
        {...props}
        onChange={handleChange}
        accept={acceptedFileTypes}
        className="hidden"
      />

      {dragActive && (
        <div
          className="absolute top-0 left-0 z-10 h-full w-full"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        />
      )}

      <div className="z-20 flex flex-col items-center space-y-3">
        {previewUrl ? (
          <div className="relative size-48 overflow-hidden rounded-lg border border-gray-200">
            <Image
              src={previewUrl}
              alt="Pratinjau Gambar"
              className="h-full w-full object-cover"
              fill
            />
          </div>
        ) : (
          <Upload className="h-8 w-8 text-muted-foreground" />
        )}

        <p className="text-sm text-muted-foreground">{fileRestrictionsText}</p>

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onButtonClick()
          }}
        >
          Browse File
        </Button>
      </div>
    </div>
  )
}

// export default FileUpload;
