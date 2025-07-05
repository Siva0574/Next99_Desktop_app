import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import CanvasList from './CanvasList'
import CanvasToolbar from './CanvasToolbar'
import CanvasArea from './CanvasArea'
import PromptModal from '../common/PromptModal' 
import type { CanvasData, Widget, WidgetType } from '../../types'

const CanvasApp = () => {
  const [canvases, setCanvases] = useState<CanvasData[]>([
    { id: 1, name: 'Canvas 1', widgets: [] }
  ])
  const [activeCanvasId, setActiveCanvasId] = useState(1)
  const [canvasCounter, setCanvasCounter] = useState(2)
  const [showModal, setShowModal] = useState(false) 

  
  const handleCreateCanvas = (name: string) => {
    const newCanvas: CanvasData = {
      id: canvasCounter,
      name: name.trim(),
      widgets: []
    }
    setCanvases([...canvases, newCanvas])
    setActiveCanvasId(newCanvas.id)
    setCanvasCounter(canvasCounter + 1)
    setShowModal(false)
  }

  
  const handleAddCanvas = () => {
    setShowModal(true)
  }

  const handleDeleteCanvas = (id: number) => {
    const updated = canvases.filter(c => c.id !== id)
    setCanvases(updated)
    if (activeCanvasId === id && updated.length) {
      setActiveCanvasId(updated[0].id)
    }
  }

  const addWidget = (type: WidgetType) => {
    setCanvases(prev =>
      prev.map(canvas => {
        if (canvas.id === activeCanvasId) {
          return {
            ...canvas,
            widgets: [
              ...canvas.widgets,
              {
                id: uuidv4(),
                type,
                config: {}
              }
            ]
          }
        }
        return canvas
      })
    )
  }

  const handleDeleteWidget = (widgetId: string) => {
    setCanvases(prev =>
      prev.map(canvas => {
        if (canvas.id === activeCanvasId) {
          return {
            ...canvas,
            widgets: canvas.widgets.filter(widget => widget.id !== widgetId)
          }
        }
        return canvas
      })
    )
  }

  const updateWidgetConfig = (widgetId: string, newConfig: any) => {
    setCanvases(prev =>
      prev.map(canvas => {
        if (canvas.id === activeCanvasId) {
          return {
            ...canvas,
            widgets: canvas.widgets.map(widget =>
              widget.id === widgetId
                ? { ...widget, config: { ...widget.config, ...newConfig } }
                : widget
            )
          }
        }
        return canvas
      })
    )
  }

  const handleReorderWidgets = (newWidgets: Widget[]) => {
    setCanvases(prev =>
      prev.map(canvas =>
        canvas.id === activeCanvasId
          ? { ...canvas, widgets: newWidgets }
          : canvas
      )
    )
  }

  const activeCanvas = canvases.find(c => c.id === activeCanvasId)

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh',
        flexWrap: 'wrap',
      }}>
      {/* Sidebar */}
      <div
        style={{
          width: 'auto',
          background: '#1F3541',
          padding: '10px',
          flexShrink: 0,
          boxSizing: 'border-box',
        }}>
        <CanvasList
          canvases={canvases}
          activeId={activeCanvasId}
          onSwitch={setActiveCanvasId}
          onDelete={handleDeleteCanvas}
          onAdd={handleAddCanvas}
        />
      </div>

      {/* Main canvas area */}
      <div
        style={{
          flex: 1,
          padding: '16px',
          minWidth: '200px',
          boxSizing: 'border-box',
        }}>
        <h2 style={{ fontSize: '1.2rem' }}>{activeCanvas?.name}</h2>
        <CanvasToolbar onAddWidget={addWidget} />
        <CanvasArea
          widgets={activeCanvas?.widgets || []}
          onDeleteWidget={handleDeleteWidget}
          onUpdateConfig={updateWidgetConfig}
          onReorderWidgets={handleReorderWidgets}
        />
      </div>

      {/*  Canvas Name Modal */}
      {showModal && (
        <PromptModal
          title="Enter Canvas Name"
          onSubmit={handleCreateCanvas}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default CanvasApp
