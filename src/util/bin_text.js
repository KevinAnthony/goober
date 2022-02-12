import {splitAndUppercase, decToFraction} from './formatting.js';

function getTextForBinContent(obj, index) {
    switch (obj.content[index].content_type) {
        case "bolt":
            return getTextForBolt(obj.content[index].bolt, obj.unit)
        case "washer":
            return getTextForWasher(obj.content[index].washer, obj.unit)
        case "screw":
            return getTextForScrew(obj.content[index].screw, obj.unit)
        default:
            return `${obj.content[index].type} is undefined - getTextForBinContent`
    }
}

function getTextForBolt(bolt, unit) {
    switch (unit) {
        case "mm":
        case "in":
            return `Bolt
----------------
Size:\t${bolt.thread_size} - ${bolt.thread_pitch} X ${bolt.length}${unit}
Head:\t${splitAndUppercase(bolt.head)}
Finish:\t${splitAndUppercase(bolt.material)}`
        default:
            return `${unit} is undefined`
    }
}

function getTextForWasher(washer, unit) {
    switch (unit) {
        case "mm":
            return `Washer
----------------
Size:\t${washer.size}
Head:\t${splitAndUppercase(washer.type)}
Finish:\t${splitAndUppercase(washer.material)}`
        default:
            return `${washer.unit} is undefined`
    }
}


function getTextForScrew(screw, unit) {
    switch (unit) {
        case "in":
            return `Screw
----------------
Size:\t${screw.size} X ${decToFraction(screw.length)}${unit}
Type:\t${splitAndUppercase(screw.type)}
Head:\t${splitAndUppercase(screw.head)} - ${splitAndUppercase(screw.drive)}
Finish:\t${splitAndUppercase(screw.material)}`
        default:
            return `${screw.unit} is undefined`
    }
}

export default getTextForBinContent
