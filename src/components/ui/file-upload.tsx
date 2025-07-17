import * as React from "react"
import { Upload, X, FileIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FileUploadProps extends React.HTMLAttributes<HTMLDivElement> {
  onFilesChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
}

const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      onFilesChange,
      accept,
      multiple = false,
      maxSize = 10 * 1024 * 1024, // 10MB default
      maxFiles = multiple ? 5 : 1,
      disabled = false,
      className,
      ...props
    },
    ref
  ) => {
    const [files, setFiles] = React.useState<File[]>([])
    const [dragOver, setDragOver] = React.useState(false)
    const [error, setError] = React.useState<string | null>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize) {
        return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`
      }
      return null
    }

    const handleFiles = (newFiles: FileList | null) => {
      if (!newFiles) return

      const validFiles: File[] = []
      let errorMessage = ""

      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i]
        const validation = validateFile(file)

        if (validation) {
          errorMessage = validation
          break
        }

        if (files.length + validFiles.length >= maxFiles) {
          errorMessage = `Maximum ${maxFiles} files allowed`
          break
        }

        validFiles.push(file)
      }

      if (errorMessage) {
        setError(errorMessage)
        return
      }

      setError(null)
      const updatedFiles = multiple ? [...files, ...validFiles] : validFiles
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    }

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onFilesChange?.(updatedFiles)
    }

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault()
      if (!disabled) setDragOver(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
    }

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      if (!disabled) {
        handleFiles(e.dataTransfer.files)
      }
    }

    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return "0 Bytes"
      const k = 1024
      const sizes = ["Bytes", "KB", "MB", "GB"]
      const i = Math.floor(Math.log(bytes) / Math.log(k))
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
    }

    return (
      <div ref={ref} className={cn("space-y-4", className)} {...props}>
        <div
          className={cn(
            "relative rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 text-center transition-colors",
            dragOver && "border-primary bg-primary/5",
            disabled && "opacity-50 cursor-not-allowed",
            !disabled && "hover:border-muted-foreground/50 cursor-pointer"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={e => handleFiles(e.target.files)}
            className="hidden"
            disabled={disabled}
          />

          <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          <div className="mt-4">
            <p className="text-sm font-medium">
              {multiple ? "Drop files here or click to browse" : "Drop file here or click to browse"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {accept && `Supported formats: ${accept}`}
              {maxSize && ` • Max size: ${Math.round(maxSize / 1024 / 1024)}MB`}
              {multiple && maxFiles && ` • Max ${maxFiles} files`}
            </p>
          </div>
        </div>

        {error && (
          <div className="rounded-md bg-destructive/15 p-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Uploaded Files</p>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-md border p-3"
              >
                <div className="flex items-center space-x-3">
                  <FileIcon className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>
                {!disabled && (
                  <button
                    onClick={() => removeFile(index)}
                    className="rounded-full p-1 hover:bg-muted"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }
)

FileUpload.displayName = "FileUpload"

export { FileUpload }