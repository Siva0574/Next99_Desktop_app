export type WidgetType = 'text' | 'image' | 'table'

export interface Widget {
  id: string
  type: WidgetType
  config: {
    content?: string
    imageUrl?: string
    tableData?: string[][]
    fontSize?: number
    visibleSettingsPanel?: boolean
    src?: string
    width?: number
    headerBg?: string
    rows?: number
    cols?: number
}
}

export interface CanvasData {
  id: number
  name: string
  widgets: Widget[]
}
