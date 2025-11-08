---
outline: deep
---

# OpenAPI Specification

The VueFinder RemoteDriver API is fully specified using OpenAPI 3.1. This specification defines the contract that backend implementations must follow to work with VueFinder's RemoteDriver.

## Interactive API Documentation

You can explore the API interactively using these tools:

- **[Swagger Editor](https://editor.swagger.io/?url=https://raw.githubusercontent.com/n1crack/vuefinder/master/docs/api-reference/openapi.yaml)** - View and edit the specification
- **[Swagger UI](https://petstore.swagger.io/?url=https://raw.githubusercontent.com/n1crack/vuefinder/master/docs/api-reference/openapi.yaml)** - Interactive API explorer
- **[Stoplight Elements](https://elements-demo.stoplight.io/?spec=https://raw.githubusercontent.com/n1crack/vuefinder/master/docs/api-reference/openapi.yaml)** - Professional API documentation viewer
- **[Redoc](https://redocly.github.io/redoc/?url=https://raw.githubusercontent.com/n1crack/vuefinder/master/docs/api-reference/openapi.yaml)** - Alternative API documentation viewer

::: tip Local Development
When working locally, you can also:
1. Download the [OpenAPI YAML file](/api-reference/openapi.yaml) and open it in Swagger Editor
2. Use the local file path: `file:///path/to/vuefinder/docs/api-reference/openapi.yaml`
3. Import it directly into Postman, Insomnia, or other API tools
:::

## Download Specification

- [OpenAPI 3.1 YAML](/api-reference/openapi.yaml) - Download the raw OpenAPI specification file

## Using the Specification

### For Backend Developers

If you're implementing a backend for VueFinder, use this specification as your contract:

1. **Import into API tools**: Import the OpenAPI spec into Postman, Insomnia, or other API clients
2. **Generate server stubs**: Use tools like [OpenAPI Generator](https://openapi-generator.tech/) to generate server code
3. **Validate your implementation**: Use contract testing tools to ensure your API matches the spec

### For Frontend Developers

The RemoteDriver in VueFinder already implements this contract. You can:

1. **Understand the API**: Review the endpoints and their expected request/response formats
2. **Debug integration issues**: Compare your backend responses against the specification
3. **Generate mock servers**: Use tools like [Prism](https://stoplight.io/open-source/prism) to create mock backends for testing

## Quick Reference

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/files` | List files and folders |
| `POST` | `/files/upload` | Upload files |
| `POST` | `/files/delete` | Delete files or folders |
| `POST` | `/files/rename` | Rename a file or folder |
| `POST` | `/files/copy` | Copy files or folders |
| `POST` | `/files/move` | Move files or folders |
| `POST` | `/files/archive` | Create a zip archive |
| `POST` | `/files/unarchive` | Extract files from archive |
| `POST` | `/files/create-file` | Create a new file |
| `POST` | `/files/create-folder` | Create a new folder |
| `GET` | `/files/preview` | Get file preview |
| `GET` | `/files/download` | Download a file |
| `GET` | `/files/search` | Search for files |
| `POST` | `/files/save` | Save content to file |

### Authentication

Authentication is **optional**. If you need to authenticate requests, configure a token when creating a RemoteDriver instance:

```js
const driver = new RemoteDriver({
  baseURL: '/api',
  token: 'your-token-here',
  // ...
});
```

### Error Handling

The client handles various error response formats:

- `{ "message": "error message" }`
- `{ "error": "error message" }`
- `{ "error": { "message": "error message", "code": "ERROR_CODE" } }`
- `{ "errors": [{ "message": "error message", "field": "fieldName" }] }`
- `{ "detail": "error message" }`
- `{ "title": "error message" }`

### Base URL Configuration

The base URL is configurable when creating a RemoteDriver:

```js
const driver = new RemoteDriver({
  baseURL: '/api',  // Your API base URL
  url: {
    list: '/files',           // GET /api/files
    upload: '/files/upload',  // POST /api/files/upload
    delete: '/files/delete',  // POST /api/files/delete
    rename: '/files/rename',  // POST /api/files/rename
    copy: '/files/copy',      // POST /api/files/copy
    move: '/files/move',      // POST /api/files/move
    archive: '/files/archive',      // POST /api/files/archive
    unarchive: '/files/unarchive',  // POST /api/files/unarchive
    createFile: '/files/create-file',    // POST /api/files/create-file
    createFolder: '/files/create-folder', // POST /api/files/create-folder
    preview: '/files/preview',     // GET /api/files/preview
    download: '/files/download',   // GET /api/files/download
    search: '/files/search',       // GET /api/files/search
    save: '/files/save',          // POST /api/files/save
  },
});
```

## Example Backend Implementation

Here's a minimal example of what a backend endpoint should return:

### List Files Request

```
GET /api/files?path=local://uploads
```

### List Files Response

```json
{
  "storages": ["local"],
  "dirname": "local://uploads",
  "read_only": false,
  "files": [
    {
      "dir": "local://uploads",
      "basename": "example.txt",
      "extension": "txt",
      "path": "local://uploads/example.txt",
      "storage": "local",
      "type": "file",
      "file_size": 1024,
      "last_modified": 1699123456,
      "mime_type": "text/plain",
      "visibility": "public"
    }
  ]
}
```

### Delete Request

```
POST /api/files/delete?path=local://uploads
Content-Type: application/json

{
  "items": [
    {
      "path": "local://uploads/file.txt",
      "type": "file"
    }
  ]
}
```

### Delete Response

```json
{
  "deleted": [
    {
      "dir": "local://uploads",
      "basename": "file.txt",
      "extension": "txt",
      "path": "local://uploads/file.txt",
      "storage": "local",
      "type": "file",
      "file_size": 1024,
      "last_modified": 1699123456,
      "mime_type": "text/plain",
      "visibility": "public"
    }
  ]
}
```

## Related Documentation

- [Drivers Interface](./drivers-interface.md) - TypeScript interface documentation
- [Guide: Drivers & Adapters](../guide/drivers-adapters.md) - Usage guide for drivers
- [Quick Start](../getting-started/quick-start.md) - Getting started with RemoteDriver

## Tools & Resources

- [OpenAPI Specification](https://swagger.io/specification/) - Official OpenAPI documentation
- [Swagger Editor](https://editor.swagger.io/) - Edit and validate OpenAPI specs
- [OpenAPI Generator](https://openapi-generator.tech/) - Generate code from OpenAPI specs
- [Postman](https://www.postman.com/) - Import and test APIs
- [Prism](https://stoplight.io/open-source/prism) - Mock server from OpenAPI specs

