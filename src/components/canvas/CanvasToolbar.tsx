import type { WidgetType } from '../../types'

interface Props {
  onAddWidget: (type: WidgetType) => void
}

const CanvasToolbar = ({ onAddWidget }: Props) => (
  <div style={{ marginBottom: '10px' }}>
    <button style={{background:'#1F3541',color:'#EAEDF0'}} onClick={() => onAddWidget('text')}>➕ Text</button>
    <button style={{background:'#1F3541',color:'#EAEDF0'}}  onClick={() => onAddWidget('image')}>🖼️ Image</button>
    <button style={{background:'#1F3541',color:'#EAEDF0'}}  onClick={() => onAddWidget('table')}>📊 Table</button>
  </div>
)

export default CanvasToolbar
