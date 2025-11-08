---
outline: deep
---

# OpenAPI Specification

The VueFinder RemoteDriver API is fully specified using OpenAPI 3.0.3. This specification defines the contract that backend implementations must follow to work with VueFinder's RemoteDriver.

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

- [OpenAPI 3.0.3 YAML](/api-reference/openapi.yaml) - Download the raw OpenAPI specification file

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
| `GET` | `/` | List files and folders |
| `POST` | `/upload` | Upload files |
| `POST` | `/delete` | Delete files or folders |
| `POST` | `/rename` | Rename a file or folder |
| `POST` | `/copy` | Copy files or folders |
| `POST` | `/move` | Move files or folders |
| `POST` | `/archive` | Create a zip archive |
| `POST` | `/unarchive` | Extract files from archive |
| `POST` | `/create-file` | Create a new file |
| `POST` | `/create-folder` | Create a new folder |
| `GET` | `/preview` | Get file preview |
| `GET` | `/download` | Download a file |
| `GET` | `/search` | Search for files |
| `POST` | `/save` | Save content to file |

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
    list: '/',           // GET {baseUrl}/
    upload: '/upload',  // POST {baseUrl}/upload
    delete: '/delete',  // POST {baseUrl}/delete
    rename: '/rename',  // POST {baseUrl}/rename
    copy: '/copy',      // POST {baseUrl}/copy
    move: '/move',      // POST {baseUrl}/move
    archive: '/archive',      // POST {baseUrl}/archive
    unarchive: '/unarchive',  // POST {baseUrl}/unarchive
    createFile: '/create-file',    // POST {baseUrl}/create-file
    createFolder: '/create-folder', // POST {baseUrl}/create-folder
    preview: '/preview',     // GET {baseUrl}/preview
    download: '/download',   // GET {baseUrl}/download
    search: '/search',       // GET {baseUrl}/search
    save: '/save',          // POST {baseUrl}/save
  },
});
```

## Example Backend Implementation

Here's a minimal example of what a backend endpoint should return:

### List Files Request

```
GET {baseUrl}/?path=local://uploads
```

Note: `{baseUrl}` is typically `http://localhost:8000/api/files` (configurable)

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
POST {baseUrl}/delete?path=local://uploads
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

Note: `{baseUrl}` is typically `http://localhost:8000/api/files` (configurable)

### Delete Response

Note: Delete endpoint returns the updated file list (same format as list endpoint), not a list of deleted items.

```json
{
  "storages": ["local"],
  "dirname": "local://uploads",
  "read_only": false,
  "files": [
    {
      "dir": "local://uploads",
      "basename": "remaining-file.txt",
      "extension": "txt",
      "path": "local://uploads/remaining-file.txt",
      "storage": "local",
      "type": "file",
      "file_size": 2048,
      "last_modified": 1699123456,
      "mime_type": "text/plain",
      "visibility": "public"
    }
  ]
}
```

### Upload Request

```
POST {baseUrl}/upload?path=local://uploads
Content-Type: multipart/form-data

file: [binary file data]
```

### Upload Response

Returns empty JSON object on success.

```json
{}
```

### Search Request

```
GET {baseUrl}/search?path=local://uploads&filter=*.pdf&deep=true&size=large
```

### Search Response

```json
{
  "dirname": "local://uploads",
  "storages": ["local"],
  "files": [
    {
      "dir": "local://uploads",
      "basename": "document1.pdf",
      "extension": "pdf",
      "path": "local://uploads/document1.pdf",
      "storage": "local",
      "type": "file",
      "file_size": 2048,
      "last_modified": 1699123456,
      "mime_type": "application/pdf",
      "visibility": "public"
    }
  ]
}
```

### Save Request

```
POST {baseUrl}/save?path=local://uploads/file.txt
Content-Type: application/json

{
  "content": "Hello, World!\nThis is the file content."
}
```

### Save Response

Returns file content as binary stream (same as preview endpoint), not JSON.

```
[Binary file content]
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

