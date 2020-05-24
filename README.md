# StreamElementsRemoteParameterWidget
A custom widget that works with OBS.Live and the OBS Websocket plugin to provide chat !command access in Twitch (for either or both moderators and regular viewers) to change scenes and turn on/off sources inside of OBS.

INSTRUCTIONS:

First of all, you'll need to ensure the OBS WebSocket plugin is installed and you'll also need to add a custom widget overlay (with this JS script and Fields data) to any scene where you want command(s) accepted by OBS; this is done by creating a new browser source, pointing the URL to this widget and making sure to check both "Shutdown source when not visible" and "Refresh browser when scene becomes active". You may experience bugs if you fail to check both of those boxes. Make sure you add the Websocket plugin IPAddress, Port and Password into this widgets "Global Settings".

Now that you've got your widget setup in OBS we need to add some commands, you can add commands for either Everyone (all visitors) and/or Moderators only. We do this by creating a simple string in the format of something called JSON and pasting it into our widgets Command settings. 

The structure we need to follow starts off very simple - "[]" (excluding the quotes). You'll want to use this empty square bracket string if you have no commands. 

If we do have a command, we'll add the following structure inside those square brackets, all together it will look like this:

[{
"Command" : "!GotoGamingScene",
"Function" : "GotoScene",
"SceneName" : "My OBS Scene name", 
"SourceName" : ""
}]

(If you noticed we left out the unnecessary quotes on the outside of our square brackets, I figure by now you're aware they are not needed)

Notice the meat of our command is grouped by these squiggly brackets "{}", this is JavaScript Object Notation (JSON). Inside the squiggly brackets we have properties and values (each property/value set separated by a comma), an example of one property and it's value in the above JSON object is "Function" : "GotoScene" - the property is called "Function", and the value given is "GotoScene" - the property name and its value are separated by a colon ":".

To add another command we simply add another JSON Object using the same format as our first command, but this time we put a comma "," between the two JSON objects - like so "{JSON-OBJECT},{JSON-OBJECT}"

For a real life example, we'll add to the first real life example:

 [{
"Command" : "!GotoGamingScene",
"Function" : "GotoScene",
"SceneName" : "My OBS Scene name", 
"SourceName" : ""
}
,
{
"Command" : "!GotoDifferentScene",
"Function" : "GotoScene",
"SceneName" : "My Different OBS Scene", 
"SourceName" : ""
}]

So now you know how to add multiple "GotoScene" commands, let's add two commands to turn an OBS source on and off at will.

Real world example:
 [{
"Command" : "!GotoGamingScene",
"Function" : "GotoScene",
"SceneName" : "My OBS Scene name", 
"SourceName" : ""
}
,
{
"Command" : "!GotoDifferentScene",
"Function" : "GotoScene",
"SceneName" : "My Different OBS Scene", 
"SourceName" : ""
}
,
{
"Command" : "!TurnOnMySource",
"Function" : "SourceOn",
"SceneName" : "", 
"SourceName" : "My OBS Source"
}
,
{
"Command" : "!TurnOffMySource",
"Function" : "SourceOff",
"SceneName" : "", 
"SourceName" : "My OBS Source"
}]

Notice we changed the function for each command to either "SourceOn" or "SourceOff" depending on our goal, we left the SceneName blank and we filled out the name of our OBS Source. Note: The sceneName is optional if you need to direct the command to a specific scene then please be sure to add it. 

If you found the widget helpful and or you have suggestions for future built in functions - please let me know! Come visit me (or look up my social media contact info) at my twitch page: Twitch.tv/TheFunVampire_LIVE
