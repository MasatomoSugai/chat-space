json.(@message, :content, :image)
<<<<<<< Updated upstream
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M")
=======
json.created_at @message.created_at.strftime('%Y/%m/%d %H:%M:%S')
>>>>>>> Stashed changes
json.user_name @message.user.name
json.id @message.id
