# art-api: a REST API to manage artworks
This project was inspired on an anki deck that reunites 651 artworks. You can grab the data from https://ankiweb.net/shared/info/685421036 (maybe not all notes contain
correct information, though).

## Technologies used:
- NodeJS / Express
- Google Cloud storage for file storage
- Multer for uploading files
- File-type for file signature checking
- Docker for container isolation

## Endpoints
There are three important routes: **artwork, period and image**. 
- ### Artwork

| Type   | Endpoint           | Description                                                                |
| ------ | ------------------ | -------------------------------------------------------------------------- |
| GET    | `/`                | Shows all artworks. **Requires limit and page query parameters.**          |
| GET    | `/:id `            | Info about artwork with given id.                                          |
| GET    | `/:id/periods`     | Lists periods of artwork with given id.                                    |
| PUT    | `/:id`             | Updates the fields of artwork with given id.                               |
| PUT    | `/:id/periods/:id` | Lists periods of artwork with given id.                                    |
| POST   | `/`                | Posts a new artwork. **Requires multipart/form-data format**.              |
| DELETE | `/:id`             | Deletes artwork with given id.                                             |
| DELETE | `/:id/periods/:id` | Deletes artwork with given id.                                             |


- ### Period
| Type   | Endpoint           | Description                                                                |
| ------ | ------------------ | -------------------------------------------------------------------------- |
| GET    | `/`                | Shows all periods. **Requires limit and page query parameters.**           |
| GET    | `/:id/artworks`    | Shows all artworks of a given period.                                      |
| PUT    | `/:id `            | Updates name of period with given id.                                      |
| POST   | `/:id `            | Posts a new period.                                                        |


- ### Image
| Type   | Endpoint           | Description                                                                |
| ------ | ------------------ | -------------------------------------------------------------------------- |
| GET    | `/:id`             | Shows the image corresponding to artwork with given id.                    |
