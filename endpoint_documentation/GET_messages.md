# Messages Endpoint

```
GET messages/:recipient_id/:sender_id
```

## Description

Returns the last 30 days of messages for a recipient from one sender or first 100 messages retrieved from a sender to a recipient if limit is specified.
***

## Requires authentication

No authentication required for **GET messages/:recipient_id/:sender_id** endpoints.

## Query Parameters

This endpoint can define if a limit of 100 messages is wanted.
```
/messages/:recipient_id/:sender_id/?limit=true
```
***

## Errors

- **404 Not Found** — The recipient_id or sender_id parameter entered did not match any ids in the records.
- **400 Bad Request** — Invalid request entry.

***

## Return format

One object with the following keys and values:
- **recipient_id** - ID of recipient.
- **messages** - An array of message objects containing message, timestamp (in UTC), and id of sender.

***

## Example

**Request**

```
https://quick-connect-db.herokuapp.com/public/v1/messages/12345/54321
```
**Return shortened for example purpose**

```json
{
	"recipient_id": "00002",
	"messages": [
    { "message": "Hey, how ya doing?", "created_at": "Thu Nov 14 2019 17:20:56 GMT-0700", "sender_id": "00001" }
  ]
}
```
