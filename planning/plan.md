# How dirty is your electricity?

Using the [Carbon Intensity API](https://api.carbonintensity.org.uk) to help consumers make informed choices.

## Components

- Heading
- PostcodeSearch
- DayView
- GraphView
- Explanation

### Structure

- Root
  - Heading
  - DataView
    - PostcodeSearch
    - DayView
    - GraphView
  - Explanation

## States

- postcode
- dayData
- graphData

### State users

- Root
  - Heading
  - DataView (postcode, setDayData, setGraphData)
    - PostcodeSearch (postcode, setPostcode)
    - DayView (dayData)
    - GraphView (graphData)
  - Explanation

### State owners

- Root
  - Heading
  - DataView (postcode, dayData, graphData)
    - PostcodeSearch
    - DayView
    - GraphView
  - Explanation

## Visualisation

Using [react-chartjs-2](https://react-chartjs-2-two.vercel.app)
