import type { CanvasData } from '../../types'

interface Props {
  canvases: CanvasData[]
  activeId: number
  onSwitch: (id: number) => void
  onDelete: (id: number) => void
  onAdd: () => void
}

const CanvasList = ({ canvases, activeId, onSwitch, onDelete, onAdd }: Props) => (
  <div style={{ width: '240px', padding: '10px', color: 'white' }}>
    <h3 style={{ color: '#fff', marginBottom: '16px' }}> Canvas List</h3>

    {canvases.map(canvas => {
      const isActive = canvas.id === activeId

      return (
        <div
          key={canvas.id}
          style={{
            paddingBottom: '10px',
            marginBottom: '10px',
            borderBottom: '2px solid #444',
          }}>
          <button
            onClick={() => onSwitch(canvas.id)}
            style={{
              background: isActive ? '#AB0552' : '#f8f9fa',
              color: isActive ? '#fff' : '#000',
              width: '100%',
              padding: '10px',
              border: 'none',
              borderRadius: '6px',
              fontWeight: isActive ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'background 0.2s ease',
            }}>{canvas.name}
          </button>

          <button
            onClick={() => onDelete(canvas.id)}
            style={{
              fontSize: '0.75em',
              color: 'red',
              marginTop: '5px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'block',
            }}>❌ Delete
          </button>
        </div>
      )
    })}

    <button
      onClick={onAdd}
      style={{
        marginTop: '10px',
        width: '100%',
        padding: '10px',
        background: 'none',
        color: 'white',
        border: '1px solid #444',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
      }}>➕ Add Canvas
    </button>
  </div>
)

export default CanvasList
