import { useEffect, useState } from 'react'

const recordsFrom = (data) => Array.isArray(data) ? data : data.results ?? data.data ?? []

function ResourceTable({ endpoint, eyebrow, title, countLabel, columns }) {
  const [records, setRecords] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(endpoint)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(`Request failed: ${response.status}`)))
      .then((data) => setRecords(recordsFrom(data)))
      .catch(() => setError('Data could not be loaded. Confirm the API is running and VITE_CODESPACE_NAME is configured.'))
  }, [endpoint])

  return <section><div className="page-heading"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1></div><p className="record-count">{records.length} {countLabel}</p></div>{error ? <div className="status-panel"><p className="error-text">{error}</p></div> : <div className="data-panel table-responsive"><table className="table table-hover"><thead><tr>{columns.map((column) => <th key={column.label}>{column.label}</th>)}</tr></thead><tbody>{records.map((record, index) => <tr key={record._id ?? record.id ?? index}>{columns.map((column) => <td key={column.label}>{column.value(record, index)}</td>)}</tr>)}</tbody></table></div>}</section>
}

export default ResourceTable