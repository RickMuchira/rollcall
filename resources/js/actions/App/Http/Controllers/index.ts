import RollcallController from './RollcallController'
import GradeController from './GradeController'
import BusController from './BusController'
import Settings from './Settings'

const Controllers = {
    RollcallController: Object.assign(RollcallController, RollcallController),
    GradeController: Object.assign(GradeController, GradeController),
    BusController: Object.assign(BusController, BusController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers