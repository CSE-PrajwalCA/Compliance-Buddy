import { Upload, File, X, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function FileUpload({ onFileSelect, accept = '.pdf,.docx,.xlsx,.csv', multiple = false }) {
  const [files, setFiles] = useState([])
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleFileInput = (e) => {
    const selectedFiles = Array.from(e.target.files)
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles) => {
    const updatedFiles = multiple ? [...files, ...newFiles] : newFiles
    setFiles(updatedFiles)
    onFileSelect?.(updatedFiles)
  }

  const removeFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFileSelect?.(updatedFiles)
  }

  return (
    <div className="space-y-3">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? 'border-eco-500 bg-eco-500/10'
            : 'border-dark-border hover:border-eco-600/50 hover:bg-dark-elevated'
        }`}
      >
        <input
          type="file"
          onChange={handleFileInput}
          accept={accept}
          multiple={multiple}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <Upload className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-eco-500' : 'text-dark-muted'}`} />
        
        <p className="text-dark-text font-medium mb-1">
          Drop files here or click to browse
        </p>
        <p className="text-sm text-dark-muted">
          Supports PDF, DOCX, XLSX, CSV
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 glass-effect rounded-lg group"
            >
              <div className="w-10 h-10 bg-eco-600/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <File className="w-5 h-5 text-eco-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-dark-text truncate">
                  {file.name}
                </p>
                <p className="text-xs text-dark-muted">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>

              <CheckCircle2 className="w-5 h-5 text-eco-500 flex-shrink-0" />
              
              <button
                onClick={() => removeFile(index)}
                className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4 text-red-400" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
