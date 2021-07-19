import './ChartDataEditor.css'

function ChartDataEditor({
  chartData = [], addDataHandler, editDataHandler, deleteItemHandler, proceed, cancel
} = {}) {
  return (
    <div className="chart-data-editor">
      <div className="editor">
        {
          chartData.labels.map((label, i) => (
            <div className="chart-item">
              <label htmlFor={label}>{label.toUpperCase()}</label>
              <input
                type="text"
                id={label}
                value={chartData.datasets[0].data[i]}
                onChange={editDataHandler}
              />
              <button
                className="btn-danger"
                onClick={() => deleteItemHandler(label)}
              >X</button>
            </div>
          ))
        }
      </div>
      <div className="buttons-container">
        <button className="btn-success" onClick={proceed}>Proceed</button>
        <button className="btn-danger" onClick={cancel}>Cancel</button>
      </div>
    </div>
  )
}

export default ChartDataEditor