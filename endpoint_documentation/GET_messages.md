# Messages Endpoint

```
GET messages/:recipient_id/:sender_id
```

## Description

Returns first 100 messages from a sender to a recipient or the last 30 days of messages if messages count does not exceed 100.
***

## Requires authentication

No authentication required for **GET messages/:recipient_id/:sender_id** endpoints.

## Parameters

This endpoint does not take any query parameters.
***

## Errors

- **404 Not Found** — The recipient_id or sender_id parameter entered did not match any ids in the records.
- **400 Bad Request** — Invalid request entry.

***

## Return format

One object with the following keys and values:

- **sender_id** - City where brewery is located.
- **recipient_id** - Year brewery was founded.
- **messages** - An array of message objects containing message and timestamp (in UTC).

***

## Example

**Request**

```
https://quickconnect-db.herokuapp.com/v1/messages/
```
**Return shortened for example purpose**

```json
{
	"sender_id": "00001",
	"recipient_id": "00002",
	"messages": [
    { "message": "Hey, how ya doing?", "created_at": "Thu Nov 14 2019 17:20:56 GMT-0700" }
  ]
}
```
