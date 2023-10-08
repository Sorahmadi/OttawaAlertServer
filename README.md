# Ottawa Alert Server

### This alert server can easily be modified to connect with different messaging API's, or can be modified to use different GEOJSON data.

This tool alerts users whenever there is a new power outage, when a power outage has been resolved, and when there are no more outages.

Discord was used because it was readily available for my friend and his co-workers to use.

# Set-up

1. To get started, create a Discord bot, add it to a server, copy its `TOKEN` and replace the text `"REDACTED"` in `main.js` on `line 73`.
2. Replace the channel ID in `main.js` `(1126037711678079028)` with the channel's ID you want the bot to write to.
3. Run with `node main.js` while focusing on the `src` folder.
