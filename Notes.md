## Design Considerations
- Given that the challenge was to build a simple chat api, I chose to try and make things as simple as possible, which included only having 1 table in the database (which would not scale) and using only PostgreSQL, Knex, and Express.js
- The over-arching idea was to have separation of concerns (controller, data models, providers, table schema, business logic, knexfile, etc..), easy to read Data Transfer Objects, and endpoint logic that would be easy to maintain, build on, and test.
- One of the more challenging parts for me was trying to figure out some of the nuances of Express, which I haven't used in a while (since TrainingPeaks was primarily .NET shop for their backend). For instance, I was not able to figure out the async middleware (`next()`), which I would love to discuss with you.


## Future Improvements (...There's a lot of potential if I was going to scale this API)
  - More test coverage
  - Scaling error handling with express middleware using (`next()`)
    - We could potentially be losing errors, where we’re just pushing them with a status of 500 by not dealing with them gracefully. We could also potentially be blocking the server if an error happens.
    - What we would want is something like checking the user database for both the sender and the recipient and then throwing an error if one of them wasn’t found
    - Also use this for making sure messages aren’t above a certain length so that we don’t have invalid database entries or failures because of that
  - A messaging service (RabbitMQ perhaps) to queue up messages in both the direction of the server and client for a more seamless experience
  - Creating CI/CD pipeline for various environments (dev/uat/prod)
  - JWTs for authentication (if we wanted to add in a `private/v1` endpoint prefix)
  - Ability to start a group conversation
  - Ability to upload files/images/etc…
	- query params for additional sorting and filtering of messages (i.e. param for filtering for only messages with a particular word)
	- need to fix the `npm run test` script to not have to include the `API_VERSION=v1` or `NODE_ENV=test`
	- Split more business logic out from the providers
	- Put in section in readme for recommended database structure if we want to add some other functionality to the chat api
		- users
		- one-to-one messages
		- group chat
	- Put in diagram for readme showing flow of data retrieval and posting
		- maybe show different DTOs
    - Migrate and seed database in before hook for testing:
    ```before(async () => {
      await database.migrate
        .rollback()
        .then(() => database.migrate.latest())
        .catch(error => error);

        database.seed
          .run()
            .catch(error => error);
    });```

	- Some parts of testing use “magic strings” or “magic numbers”. These could definitely be extracted out into test helper files that define these constants for scaling the test suites and maintainability/ease of use for developers
