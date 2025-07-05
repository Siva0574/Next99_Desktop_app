import { useState } from 'react'

interface Props {
  title: string
  onSubmit: (value: string) => void
  onClose: () => void
}

const PromptModal = ({ title, onSubmit, onClose }: Props) => {
  const [value, setValue] = useState("")

  return (
    <div
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        padding: '20px',
      }} >
      <div
        style={{
          background: '#AB0552',
          padding: '24px',
          borderRadius: '12px',
          minWidth: '300px',
          maxWidth: '90%',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}>
        <h2 style={{ marginBottom: '16px',color:'#EBEEF1' }}>{title}</h2>

        <input
          type="text"
          value={value}
          placeholder="Enter canvas name"
          onChange={(e) => setValue(e.target.value)}
          style={{
            width: '100%',
            padding: '5px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '16px',
            textAlign:'center',
            background:'#EBEEF1',
            color:'#000'
          }}/>

        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <button
            onClick={onClose}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: '#ddd',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
              color:'#000'
            }}>Cancel
          </button>

          <button
            onClick={() => {
              if (value.trim()) onSubmit(value.trim())
            }}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              background: '#013A20',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 'bold',
            }}>OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default PromptModal
