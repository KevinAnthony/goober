import {format, fraction} from 'mathjs'

function splitAndUppercase(str) {
    return str.split("_").map((name) => {
        return name[0].toUpperCase() + name.slice(1)
    }).join(" ")
}

function decToFraction(length) {
    length = parseFloat(length);
    if (length < 1) {
        return format(fraction(length), {fraction: 'ratio'})
    }
    const int = parseInt(length)
    const remainder = length - int;
    return remainder > 0 ? `${int} ${format(fraction(remainder), {fraction: 'ratio'})}` : `${int}`
}

function hex2rgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    return {R: r, G: g, B: b, A: 1}
}

function rgb2hex(r, g, b) {
    var rgb = (r << 16) | (g << 8) | b
    return '#' + rgb.toString(16).padStart(6, 0)
}

export {
    hex2rgb,
    rgb2hex,
    splitAndUppercase,
    decToFraction
}
