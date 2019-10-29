import { configure } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import moment from "moment-timezone"
import "reflect-metadata"

moment.tz.setDefault("Europe/London")
configure({ adapter: new Adapter() })
