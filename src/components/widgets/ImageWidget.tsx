import { useState, useEffect } from 'react'

interface Props {
  initialSrc?: string
  width?: number
  onChange?: (data: { src: string; width: number }) => void
}

const ImageWidget = ({ initialSrc = '', width = 100, onChange }: Props) => {
  const [src, setSrc] = useState(initialSrc)

  // ✅ Update src when props.initialSrc changes
  useEffect(() => {
    if (initialSrc !== src) {
      setSrc(initialSrc)
    }
  }, [initialSrc])

  // ✅ Notify parent if internal src changes
  useEffect(() => {
    if (src) {
      onChange?.({ src, width: width || 100 })
    }
  }, [src])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const imageUrl = reader.result as string
      setSrc(imageUrl)
    }
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <input style={{marginTop:'20px',position:"relative"}} type="file" accept="image/*" onChange={handleFileChange} />
      {src && (
        <img
          src={src}
          alt="Uploaded"
          style={{
            display: 'block',
            maxWidth: '100%',
            width: `${width}%`,
            marginTop: '10px',
            borderRadius: 8,
            
          }}
        />
      )}
    </div>
  )
}

export default ImageWidget
