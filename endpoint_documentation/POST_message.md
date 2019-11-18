# Messages Endpoint

```
POST /messages
```

## Description

Post a message from a sender to a recipient.
***

## Requires authentication

No authentication required for **POST /messages** endpoints.

## Query Parameters

No query parameters for this endpoint.

## Errors

- **400 Bad Request** — Invalid request entry, missing key/value pairs for body.

***

## Request Body

- **message** - The sender's text message (**limit 255 characters**)
- **sender_id** - ID of sender
- **recipient_id** - ID of recipient

## Return Format

One object with the following keys and values:
- **message** - An object containing the response from a successful posted message (detail below)

***

## Example

**Request**

```
https://quickconnect-db.herokuapp.com/v1/messages

```
**Request Body**

```json
    {
    	"message": "Sweet Action",
    	"sender_id": "12345",
    	"recipient_id": "54321",
    }
```

**Return shortened for example purpose**

```json
{
  "message": {
        "message": "Heres a test message",
        "created_at": "2019-11-18T02:48:57.317Z",
        "sender_id": 98765,
        "id": 3013,
        "recipient_id": 56789,
        "updated_at": "2019-11-18T02:48:57.317Z"
    }
}
```
