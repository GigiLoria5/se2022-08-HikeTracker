import Chip from '@mui/material/Chip';

const handleStartPointTypes = (value) => {
    let chipStartPoint
    if (value.start_point_type === "parking_lot") {
        chipStartPoint = <Chip label={[value.start[0].city, ' ', value.start[0].province, ' ', value.start[0].country, " : ", value.start[0].address]} color="primary" variant="outlined" key={"sp_parking_lot" + value.id} />
    } else if (value.start_point_type === "location") {
        chipStartPoint = <Chip label={[value.start[0].description, " : ", value.start[0].value]} color="primary" variant="outlined" key={"sp_location" + value.id} />
    } else if (value.start_point_type === "hut") {
        chipStartPoint = <Chip label={[value.start[0].name, " ", value.start[0].city, ' ', value.start[0].province, ' ', value.start[0].country, " : ", value.start[0].address]} color="primary" variant="outlined" key={"sp_hut" + value.id} />
    }
    return chipStartPoint
}

const handleEndPointTypes = (value) => {
    let chipEndPoint
    if (value.end_point_type === "parking_lot") {
        chipEndPoint = <Chip label={[value.end[0].city, ' ', value.end[0].province, ' ', value.end[0].country, " : ", value.end[0].address]} color="primary" variant="outlined" key={"ep_parking_lot" + value.id} />
    } else if (value.end_point_type === "location") {
        chipEndPoint = <Chip label={[value.end[0].description, " : ", value.end[0].value]} color="primary" variant="outlined" key={"ep_location" + value.id} />
    } else if (value.end_point_type === "hut") {
        chipEndPoint = <Chip label={[value.end[0].name, " ", value.end[0].city, ' ', value.end[0].province, ' ', value.end[0].country, " : ", value.end[0].address]} color="primary" variant="outlined" key={"ep_hut" + value.id} />
    }
    return chipEndPoint
}

const handleRef = (value) => {
    let tab = []
    for (var i = 0; i < value.reference_points.length; i++) {
        value.reference_points[i].map((valuee) => {
            let chipsRefPoints;
            if (valuee.ref_point_type === "parking_lot") {
                chipsRefPoints = <Chip label={[valuee.city, ' ', valuee.province, ' ', valuee.country, " : ", valuee.address]} color="primary" variant="outlined" key={"rp_parking_lot_" + valuee.id} />
            }
            else if (valuee.ref_point_type === "location") {
                chipsRefPoints = <Chip label={[valuee.description, ' : ', valuee.value]} color="primary" variant="outlined" key={"rp_location_" + valuee.id} />
            }
            else if (valuee.ref_point_type === "hut") {
                chipsRefPoints = <Chip label={[valuee.name, ' ', valuee.city, ' ', valuee.province, ' ', valuee.country, " : ", valuee.address]} color="primary" variant="outlined" key={"rp_hut_" + valuee.id} />
            }
            return tab.push(chipsRefPoints)
        })
    }
    return tab
}

export { handleStartPointTypes, handleEndPointTypes, handleRef };