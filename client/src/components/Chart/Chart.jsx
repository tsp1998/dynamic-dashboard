function ComponentName({ ChartType, chartData, options }) {
  return (
    <div className="chart-container">
      <ChartType data={chartData} options={options} />
    </div>
  )
}

export default ComponentName