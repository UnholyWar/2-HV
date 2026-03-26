import openOffice from './openOffice.js'
import meetingRoom from './meetingRoom.js'
import startupOffice from './startupOffice.js'

export const MAPS = {
    open_office: openOffice,
    meeting_room: meetingRoom,
    startup_office: startupOffice
}

export function getMapConfig(mapKey) {
    return MAPS[mapKey] || MAPS.open_office
}