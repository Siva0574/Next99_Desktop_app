import { useState, useEffect } from 'react'

interface Props {
  initialData?: string[][]
  onChange?: (data: string[][]) => void
  headerBg?: string
}


const TableWidget = ({ initialData = [['']], onChange,headerBg}: Props) => {
  const [data, setData] = useState<string[][]>(initialData)

  // Optional: sync parent if initialData changes
  useEffect(() => {
    setData(initialData || [['']])
  }, [initialData])

  const handleChange = (rowIdx: number, colIdx: number, value: string) => {
    const newData = data.map((row, r) =>
      r === rowIdx ? row.map((cell, c) => (c === colIdx ? value : cell)) : row
    )
    setData(newData)
    onChange?.(newData)
  }

  const addRow = () => {
    const newRow = new Array(data[0]?.length || 1).fill('')
    const updated = [...data, newRow]
    setData(updated)
    onChange?.(updated)
  }

  const removeRow = () => {
    if (data.length > 1) {
      const updated = data.slice(0, -1)
      setData(updated)
      onChange?.(updated)
    }
  }

  const addColumn = () => {
    const updated = data.map(row => [...row, ''])
    setData(updated)
    onChange?.(updated)
  }

  const removeColumn = () => {
    if (data[0]?.length > 1) {
      const updated = data.map(row => row.slice(0, -1))
      setData(updated)
      onChange?.(updated)
    }
  }

  return (
    <div style={{ overflowX: 'auto',marginTop:'20px',position:"relative" }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx}>
              {row.map((cell, colIdx) => (
                <td
                  key={colIdx}
                  style={{
                    border: '1px solid #ccc',
                    padding: 8,
                    background: rowIdx === 0 ? (headerBg || '#000') : '#000'
                  }} >
                  <input
                    value={cell}
                    onChange={e => handleChange(rowIdx, colIdx, e.target.value)}
                    style={{
                      width: '100%',
                      border: 'none',
                      outline: 'none',
                      background: 'transparent',
                    }}/>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: 10}}>
        <button onClick={addRow}>➕ Row</button>
        <button onClick={removeRow} style={{ marginLeft: 6 }}>➖ Row</button>
        <button onClick={addColumn} style={{ marginLeft: 12 }}>➕ Col</button>
        <button onClick={removeColumn} style={{ marginLeft: 6 }}>➖ Col</button>
      </div>
    </div>
  )
}

export default TableWidget
