# notify

> notifying client

send notification to user

notification - say a message received from some other user notification

- realtime - if user online
- delayed - trigger event

- ws for checking online status and updating in db
- send realtime notifications if user online
- add notification to background job, will store in db, and will keep checking user status and will send notification when user comes online
