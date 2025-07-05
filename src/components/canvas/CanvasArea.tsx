import { DragDropContext, Droppable,Draggable,} from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'
import type { Widget } from '../../types'
import TextWidget from '../widgets/TextWidget'
import ImageWidget from '../widgets/ImageWidget'
import TableWidget from '../widgets/TableWidget'

interface Props {
  widgets: Widget[]
  onDeleteWidget: (widgetId: string) => void
  onUpdateConfig: (widgetId: string, newConfig: any) => void
  onReorderWidgets: (newWidgets: Widget[]) => void
}

const CanvasArea = ({
  widgets,
  onDeleteWidget,
  onUpdateConfig,
  onReorderWidgets,
}: Props) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return
    const reordered = Array.from(widgets)
    const [moved] = reordered.splice(result.source.index, 1)
    reordered.splice(result.destination.index, 0, moved)
    onReorderWidgets(reordered)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="canvas">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {widgets.map((widget, index) => (
              <Draggable draggableId={widget.id} index={index} key={widget.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                      border: '1px solid #ccc',
                      padding: 15,
                      marginBottom: 10,
                      borderRadius: 8,
                      background: '#627E8B',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                      position: 'relative',
                      color: '#fff',
                    }}>
                      
                    <strong style={{position: 'absolute', top: 5,}}>{widget.type.toUpperCase()} Widget</strong>

                    <button
                      onClick={() =>
                        onUpdateConfig(widget.id, {
                          visibleSettingsPanel:
                            !widget.config.visibleSettingsPanel,
                        })
                      }
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 40,
                        background: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        padding: '2px 6px',
                        cursor: 'pointer',
                      }}> ⚙
                    </button>

                    <button
                      onClick={() => onDeleteWidget(widget.id)}
                      style={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        background: 'red',
                        color: 'white',
                        border: 'none',
                        borderRadius: 4,
                        padding: '2px 6px',
                        cursor: 'pointer',
                      }}> ✖
                    </button>

                    {/* === Widget Render === */}
                    {widget.type === 'text' && (
                      <TextWidget
                        initialContent={widget.config.content}
                        fontSize={widget.config.fontSize || 16}
                        onContentChange={(newContent) =>
                          onUpdateConfig(widget.id, {
                            content: newContent,
                          })
                        }
                      />
                    )}

                    {widget.type === 'image' && (
                      <ImageWidget
                        initialSrc={widget.config.src}
                        width={widget.config.width || 100}
                        onChange={(data) =>
                          onUpdateConfig(widget.id, {
                            src: data.src,
                            width: data.width,
                          })
                        }
                      />
                    )}

                    {widget.type === 'table' && (
                      <TableWidget
                        initialData={widget.config.tableData || [['']]}
                        headerBg={widget.config.headerBg}
                        onChange={(newData) =>
                          onUpdateConfig(widget.id, {
                            tableData: newData,
                          })
                        }
                      />
                    )}

                    {/* === Settings Panels (unchanged) === */}
                    {widget.type === 'text' &&
                      widget.config.visibleSettingsPanel && (
                        <div style={{ marginTop: 8 }}>
                          <label style={{ marginRight: 8 }}>Font Size:</label>
                          <input
                            type="number"
                            value={widget.config.fontSize || 16}
                            onChange={(e) =>
                              onUpdateConfig(widget.id, {
                                fontSize: Number(e.target.value),
                              })
                            }
                            min={10}
                            max={48}
                          />
                        </div>
                      )}

                    {widget.type === 'image' &&
                      widget.config.visibleSettingsPanel && (
                        <div style={{ marginTop: 8 }}>
                          <label>Image URL:</label>
                          <input
                            type="text"
                            value={widget.config.src || ''}
                            onChange={(e) =>
                              onUpdateConfig(widget.id, {
                                src: e.target.value,
                              })
                            }
                            style={{ width: '100%', marginBottom: 6 }}/>

                          <label>Width (%):</label>
                          <input
                            type="number"
                            value={widget.config.width || 100}
                            min={10}
                            max={100}
                            onChange={(e) =>
                              onUpdateConfig(widget.id, {
                                width: Number(e.target.value),
                              })
                            }
                          />
                        </div>
                      )}

                    {widget.type === 'table' &&
                      widget.config.visibleSettingsPanel && (
                        <div style={{ marginTop: 10 }}>
                          <label>Rows:</label>
                          <input
                            type="number"
                            value={
                              widget.config.rows ||
                              widget.config.tableData?.length ||
                              1
                            }
                            onChange={(e) => {
                              const rows = Number(e.target.value)
                              const cols =
                                widget.config.cols ||
                                widget.config.tableData?.[0]?.length ||
                                1
                              const newTable = Array.from(
                                { length: rows },
                                (_, rowIdx) =>
                                  Array.from(
                                    { length: cols },
                                    (_, colIdx) =>
                                      widget.config.tableData?.[rowIdx]?.[colIdx] ||
                                      ''
                                  )
                              )
                              onUpdateConfig(widget.id, {
                                rows,
                                tableData: newTable,
                              })
                            }}
                          />

                          <label style={{ marginLeft: 10 }}>Columns:</label>
                          <input
                            type="number"
                            value={
                              widget.config.cols ||
                              widget.config.tableData?.[0]?.length ||
                              1
                            }
                            onChange={(e) => {
                              const cols = Number(e.target.value)
                              const rows =
                                widget.config.rows ||
                                widget.config.tableData?.length ||
                                1
                              const newTable = Array.from(
                                { length: rows },
                                (_, rowIdx) =>
                                  Array.from(
                                    { length: cols },
                                    (_, colIdx) =>
                                      widget.config.tableData?.[rowIdx]?.[colIdx] ||
                                      ''
                                  )
                              )
                              onUpdateConfig(widget.id, {
                                cols,
                                tableData: newTable,
                              })
                            }}
                          />

                          <div style={{ marginTop: 10 }}>
                            <label>Header Row Background:</label>
                            <input
                              type="color"
                              value={widget.config.headerBg || '#000'}
                              onChange={(e) =>
                                onUpdateConfig(widget.id, {
                                  headerBg: e.target.value,
                                })
                              }
                              style={{ marginLeft: 10 }}
                            />
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default CanvasArea
