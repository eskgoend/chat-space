json.id @message.id
json.content @message.content
json.image @message.image
json.group_id @message.group.id
json.user_id @message.user.id
json.user_name @message.user.name
json.created_at @message.created_at.strftime("%Y/%m/%d %H:%M")
json.updated_at @message.updated_at