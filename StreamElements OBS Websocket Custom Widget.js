let fieldData, CmdsForEveryone, CmdsForAdmin;
const obs = new OBSWebSocket();

function IsModerator(array) {
  if (array.find(obj => obj["type"] == "moderator")) {
    return true;
  }
}

function IsBroadcaster(array) {
  if (array.find(obj => obj["type"] == "broadcaster")) {
    return true;
  }
}

function IsAdmin(array) {
  if (IsBroadcaster(array) || IsModerator(array)) {
    return true;
  }
  return false;
}

function PopulateCommandLists() {
  CmdsForEveryone = JSON.parse(fieldData.CommandsForEveryone);
  CmdsForAdmin = JSON.parse(fieldData.CommandsForModerators);
}

function FindCommandIn(commandArray, command) {
  return commandArray.find(
    obj => obj["Command"].toUpperCase() == command.toUpperCase()
  );
}

function IfCommandExistsExecuteIt(commandObject, obs) {
  if (commandObject && commandObject["Function"]) {
    console.log("Command Object found, has a function...");
    switch (commandObject["Function"]) {
      case "GotoScene":
        obs.send("SetCurrentScene", {
          "scene-name": commandObject["SceneName"]
        });
        console.log("SetCurrentScene executed");
        break;
      case "SourceOn":
        obs.send("SetSourceRender", {
          source: commandObject["SourceName"],
          render: true,
          "scene-name": commandObject["SceneName"]
        });
        console.log("SetSourceRender true");
        break;
      case "SourceOff":
        obs.send("SetSourceRender", {
          source: commandObject["SourceName"],
          render: false,
          "scene-name": commandObject["SceneName"]
        });
        console.log("SetSourceRender false");
        break;
      default:
        console.log("Function type not declared in the switch statement...");
    }
  }
}

const startListener = () => {
  window.addEventListener("onEventReceived", function(obj) {
    let event = obj.detail.event;
    let data = obj.detail.event.data;
    console.log("LISTENER LOADED!");
    if (obj.detail.listener == "message") {
      if (IsAdmin(data.badges)) {
        console.log("Message from administrator");
        let commandObject =
          FindCommandIn(CmdsForAdmin, data.text) ||
          FindCommandIn(CmdsForEveryone, data.text);
        IfCommandExistsExecuteIt(commandObject, obs);
      } else {
        console.log("Message from viewer");
        let commandObject = FindCommandIn(CmdsForEveryone, data.text);
        IfCommandExistsExecuteIt(commandObject, obs);
      }
    }
    console.log(obj);
  });
};
console.log("Loading Widget");
window.addEventListener("onWidgetLoad", function(obj) {
  fieldData = obj.detail.fieldData;
  PopulateCommandLists();
  obs
    .connect({
      address: `${fieldData.ip}:${fieldData.port}`,
      password: fieldData.password
    })
    .then(() => {
      console.log("Connected to OBS. Starting chat listener");
      startListener();
    });
});
