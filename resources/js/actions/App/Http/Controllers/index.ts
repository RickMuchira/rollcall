import RollcallController from './RollcallController'
import GradeController from './GradeController'
import Settings from './Settings'

const Controllers = {
    RollcallController: Object.assign(RollcallController, RollcallController),
    GradeController: Object.assign(GradeController, GradeController),
    Settings: Object.assign(Settings, Settings),
}

export default Controllers