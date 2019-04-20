import discord
import token

# Import the token
token = open("token.txt")

# class Client(discord.Client):
#     async def on_ready(self):
#         print("Isabelle bot is good to go!\n")
    
#     async def on_message(self, message):
#         # Don't let it respond to itself
#         if message.author == self.user:
#             return
#         if message.content == 'ping':
#             await message.channel.send("Boing-oing-oing-oing")



client = Client()
client.run(token.read())