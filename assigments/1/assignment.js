function Event(time, place) {
    const getEvent = () => time
    const getPlace = () => place

    const toString = () => `time = ${time}, event = ${place}`
    // const copy = () => point(time, place)
  
    return {getEvent, getPlace, toString }
  }
  const e = Event('a', 'b');
  console.log(e.toString())