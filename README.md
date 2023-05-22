## Slack clone for Avion school project
API server address: [http://206.189.91.54/](http://206.189.91.54/)

## Stack
* Node 18.16
* React 18.2


## Setup

### Requirements

* Node 18

## Installation

DB setup

```
URL: 
```

Clone the repository

```
git clone git@github.com:jaqlim/slackclone-avion.git
```


### Sample cURL commands

* User creation
```
curl -X POST -H "Content-Type: application/json" -d '{"email": "test123@user123.com", "password": "meowmeow", "password_confirmation": "meowmeow"}' http://206.189.91.54/api/v1/auth/
```

This will return:
```
{"status":"success","data":{"id":3432,"provider":"email","uid":"test123@user123.com","allow_password_change":false,"name":null,"nickname":null,"image":null,"email":"test123@user123.com","created_at":"2023-05-22T04:09:41.245Z","updated_at":"2023-05-22T04:09:41.317Z"}}
```

* Logging in
```
curl -i -X POST -H "Content-Type: application/json" -d '{"email": "test123@user123.com", "password": "meowmeow"}' http://206.189.91.54/api/v1/auth/sign_in
```

If successful, this will return:
```
{"data":{"id":3432,"email":"test123@user123.com","provider":"email","uid":"test123@user123.com","allow_password_change":false,"name":null,"nickname":null,"image":null}
```

* Sending a message
```
curl -i -X POST -H "Content-Type: application/json" -H "access-token: Z4m9ZoBIFCe0QWXk0m56fQ" -H "client: BgqF5-ybK8Wjz4d4piIVBg" -H "expiry: 1685939489" -H "uid: test123@user123.com" -d '{"receiver_id": 1, "receiver_class": "User", "body": "kamusta?"}' http://206.189.91.54/api/v1/messages
```

If successful, this will return:
```
{"data":{"id":23978,"body":"kamusta?","message_reference_id":5946,"created_at":"2023-05-22T10:01:00.416Z","updated_at":"2023-05-22T10:01:00.416Z"}}
```
Note that this will also return a `set-cookie`.

* Retrieving a message
```
curl -i -X GET -H "Content-Type: application/json" -H "access-token: Z4m9ZoBIFCe0QWXk0m56fQ" -H "client: BgqF5-ybK8Wjz4d4piIVBg" -H "expiry: 1685939489" -H "uid: test123@user123.com" "http://206.189.91.54/api/v1/messages?receiver_id=1&receiver_class=User"

```

If successful (and a message is pending), this will return:
```
{"data":[{"id":23978,"body":"kamusta?","created_at":"2023-05-22T10:01:00.416Z","sender":{"id":3432,"provider":"email","uid":"test123@user123.com","allow_password_change":false,"name":null,"nickname":null,"image":null,"email":"test123@user123.com","created_at":"2023-05-22T04:09:41.245Z","updated_at":"2023-05-22T04:31:29.617Z"},"receiver":{"id":1,"provider":"email","uid":"user2@example.com","allow_password_change":false,"name":null,"nickname":null,"image":null,"email":"user2@example.com","created_at":"2021-07-06T13:45:11.558Z","updated_at":"2022-06-03T02:19:29.151Z"}}]}
```

* Creating a channel with members
```
curl -i -X POST -H "Content-Type: application/json" -H "access-token: Z4m9ZoBIFCe0QWXk0m56fQ" -H "client: BgqF5-ybK8Wjz4d4piIVBg" -H "expiry: 1685939489" -H "uid: test123@user123.com" -d '{"name": "avion-chikahan", "user_ids": [5]}' http://206.189.91.54/api/v1/channels
```

If successful, this will return:
```
{"data":{"id":4494,"owner_id":3432,"name":"avion-chikahan","created_at":"2023-05-22T10:21:43.853Z","updated_at":"2023-05-22T10:21:43.853Z"}}
```
