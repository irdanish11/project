# NodeVices

This app is an [IoT](https://en.wikipedia.org/wiki/Internet_of_things) monitoring hub that manages a set of _devices_ that run 24/7 and send periodical updates to the hub.

The current database is a plain file located in `db` folder. The first thing that the client wants is to migrate the data into a `mongo` database.

After the migration the client wants to store the monitoring updates in the database in order to analyse the data. They also want to display, in the devices list, some sort of indication of whether a device is online or offline, and get realtime updates when a device goes online or offline.

Each device will send the following data every minute:

* device id (`deviceId`, uuid string v4)
* device uptime (`uptime`, in minutes)
* device load (`load`, percentaje/integer)
* device free memory (`freeMem`, in megabytes)

Example payload:

```
{
  deviceId: '...',
  uptime: 20,
  load: 10,
  freeMem: 512
}
```

A device is considered online if it reported at least once in the last minute.

We included a task that simulates devices sending updates as a tool for development. To run it open a new terminal tab and run:

```bash
$ npm run simulation
# or with docker:
$ docker-compose run web npm run simulation
```

This dev tool is part of the code, you can change it as needed.
## Tasks

- [ ] Migrate the file devices database into a mongo database. The migration must be available for the rest of the developers so it needs to be a script that any developer can run.
- [ ] Refactor the current models to use mongo instead of the static file.
- [ ] Create the `Update` model, which contains the fields described above. The `Update` model needs to be linked to a device.
- [ ] Develop the `/api/v1/updates` endpoint. This endpoint must be called using a `POST` request and must receive the payload described above. The endpoint payload must be validated.
- [ ] Develop a page for displaying the updates of a given device.
- [ ] Display whether the devices are online or offline in the devices index page.
- [ ] Dynamically change the status of the devices in the index page according to status changes. Ie. if a device becomes active, its status must change from offline to online in realtime, without refreshing the page.
- [ ] The test suite and the linter is passing. Keep it that way.
- [ ] Add tests to your solution.
- [ ] As a plus, the clients wants to change the format timestamps `createdAt` and `updatedAt` in the index devices list to `yyyy-MM-dd HH:mm:ss`.

## Setup

This project is using tailwindcss for the styles.

- Required node >= v14

1. Install dependencies:

```bash
$ npm install
```

2. Setup the `.env` file based on `.env.example`
3. Run the web app

## Run dev mode:

```bash
$ npm run dev
# or
$  docker-compose run --service-ports web npm run dev
```

## Start server:

```bash
$ npm start
# or
$  docker-compose run --service-ports web npm start
```

## Delivery

Send your solution to [info@sinaptia.dev](mailto:info@sinaptia.dev) and mark your completed tasks in the list above. See example:

- [x] Task 1 (means completed)
- [ ] Task 2 (means not completed)
