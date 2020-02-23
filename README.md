# Isabelle Bot
## v3

When I first developed Isabelle Bot, I admittedly wrote a lot of it in a hurry, and didn't think I was going to do anything more advance than commands like `!caw` or `!hug`. Eventually, more and more commands and functionality was being added into Isabelle, and the code was getting a bit messy and harder to manage. This was when I did the first revision, where the code was refactored and restructured.

Although the code is easier and more maintainable, I've realized I can do a bit more with it, and make some other additional changes now that I've assigned the role of multiple bots into one single bot. One issue is the code is still a bit of a mess, and could use another revision. This would require me to re-write a lot, and I figured it would be easier to go back to square one again, and write everything over once more.

Instead of ditching version numbers, I'd like to finally consider this **Version 3**. For this, I have a list of things that I would like to achieve.

- [ ] Create and revise functions
    - [ ] `sendMessage()` - To replace the commonly used `msg.channel.send(str)`
    - [ ] `sendEmbed()` - To send embedded messages
- [ ] Rewrite...well, everything
    - [ ] `isa.commands.js` needs to be reserved for maintenence use only. This includes commands like `!sa test`, `!sa about`, and maybe consider adding others
    - [ ] `reg.commands.js` needs to be cleaned up for sure. Have more global variables instead of variables being exclusive to their appropriate functions. For example, `!8ball` has an array of outputs that can easily be moved outside of it.
    - [ ] There should be less comment spam
    - [ ] `app.js` needs to be cleaned up as well
- [ ] For events like `messageUpdate` and `messageDelete`, there are a couple of issues. One is a fix I need to devise, and the other is an actual issue.
    - [ ] `messageUpdate` has an issue where once in a while, the original message will be blanked out, which may be an issue with using an escape character for the codeblock part of the code.
    - [ ] `messageUpdate` and `messageDelete` both are developed where if there is a URL present in of the messages, then the whole string is replaced with "*This message contained a URL or image*." This was a quick-fix that I never got around to actually fixing. The plan is to fix it where the original message is retained, but replace any URLs with "*(URL)*". So an example output would be: "Check out this new website I found! *(URL)*"

#### Other fixes will be included over time