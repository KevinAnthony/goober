function BackgroundGrid({style, x = 0, y = 0, width = 1, height = 1, r = 0, g = 0, b = 0, a = .5}) {
    x = parseInt(x) + 1
    y = parseInt(y) + 1
    const stopX = x + parseInt(width)
    const stopY = y + parseInt(height)
    return <div
        className='grid-grid'
        style={{
            gridColumnStart: x,
            gridColumnEnd: stopX,
            gridRowStart: y,
            gridRowEnd: stopY,
            backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
            ...style
        }}
    >
    </div>
}

export default BackgroundGrid
