const { ErrorCodeDescriptionRegex } = require("../Constants");
const { controllerdata } = require("../database/Models");
const { inputFormatter } = require("../Utlilities/Utilities");
const { v4: uuidv4 } = require("uuid");
const dayjs = require("dayjs");

exports.pushControllerDataIntoDatabase = async (apiControllerData) => {
  let isAdditionSuccessull = false;
  const {
    DeviceID,
    HardwareID,
    Program,
    ProgramName,
    ModeofOperation,
    Stepper,
    SpotCounter,
    Incrementofcurrent,
    WeldingPressure1,
    WeldingPressure2,
    PowerFactor,
    ActualWeldTimeCycles,
    SetCurrent,
    NominalCurrent,
    HeatPertCurrentIDgs,
    HeatPertinCurrentIp,
    ActualCurrent,
    Upslope,
    ConductionAngle,
    ErrorCodeDescription,
  } = apiControllerData;
  let error_code;
  let ErrorCodeDescriptionFormatted = ErrorCodeDescription.split("'")[1];

  try {
    if (
      ErrorCodeDescriptionFormatted &&
      ErrorCodeDescriptionFormatted.match(ErrorCodeDescriptionRegex) &&
      ErrorCodeDescriptionFormatted.match(ErrorCodeDescriptionRegex)[0]
    ) {
      error_code = ErrorCodeDescriptionFormatted.match(
        ErrorCodeDescriptionRegex
      )[0];
    }
  } catch (error) {
    console.log(error);
  }

  try {
    const deviceobj = await controllerdata.create({
      id: "device-" + uuidv4(),
      DeviceID: inputFormatter(DeviceID).split("'")[1],
      DateTime: dayjs().format("DD-MM-YYYY HH:mm:ss"),
      HardwareID: HardwareID.split("'")[1],
      Program: Program.split("'")[1],
      ProgramName: ProgramName.split("'")[1],
      ModeofOperation: ModeofOperation.split("'")[1],
      Stepper: Stepper.split("'")[1],
      SpotCounter: SpotCounter.split("'")[1],
      Incrementofcurrent: Incrementofcurrent.split("'")[1],
      WeldingPressure1: WeldingPressure1.split("'")[1],
      WeldingPressure2: WeldingPressure2.split("'")[1],
      PowerFactor: PowerFactor.split("'")[1],
      ActualWeldTimeCycles: ActualWeldTimeCycles.split("'")[1],
      SetCurrent: Number(SetCurrent.split("kA")[0].split("'")[1]),
      NominalCurrent: NominalCurrent.split("kA")[0].split("'")[1],
      HeatPertCurrentIDgs: HeatPertCurrentIDgs,
      HeatPertinCurrentIp: HeatPertinCurrentIp,
      ActualCurrent: Number(ActualCurrent.split("kA")[0].split("'")[1]),
      Upslope: Upslope,
      ConductionAngle: ConductionAngle.split("^")[0].split("'")[1],
      error_code: error_code || ErrorCodeDescriptionFormatted,
    });
    isAdditionSuccessull = true
  }
  catch (e) {
    isAdditionSuccessull = false
  }

  return isAdditionSuccessull
}
