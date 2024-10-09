<div align="center">
  <img width="192px" height="auto" src="public/favicon.ico" alt="Bstore Logo">
  <h1>Bstore</h1>
  <p>A simple blob storage.</p>
</div>

<div align="center">

  [![bstore](https://img.shields.io/badge/go-bstore-00ADD8?style=flat-square&logo=go)](https://github.com/cartersusi/bstore)
  [![NPM Package](https://img.shields.io/badge/npm-bstorejs-red?style=flat-square&logo=npm)](https://www.npmjs.com/package/bstorejs)
  [![React Package](https://img.shields.io/badge/react-bstorejs--react-61DAFB?style=flat-square&logo=react)](https://www.npmjs.com/package/bstorejs-react)
  [![Demo](https://img.shields.io/badge/demo-bstorejs--demo-brightgreen?style=flat-square)](https://github.com/cartersusi/bstore-demo)

</div>


### Install
```sh
npm i bstorejs-react
```

### Import
```ts
import { Put, Get, Del } from 'bstorejs-react'; //Functions
import { BstoreImage, BstoreVideo, BstoreApplication } from 'bstorejs-react'; // Component
```

### Functions

```ts
// Upload a File
const res = await Put(file.name, file, 'public');

// Download a File
const res = await Get(file.name, 'public');

// Delete a File
const res = await Del(file.name, 'public');
```

### Components

1. Image

```tsx
return ( 
    <BstoreImage 
        path={"http://localhost:8080/bstore/images/image.png"}
        alt="Uploaded file"
        className="max-w-full max-h-full object-contain" 
    />
)
```

2. Video
```tsx
return ( 
    <BstoreVideo
        path={"http://localhost:8080/bstore/videos/video.mp4"}
        controls={true}
        className="max-w-full max-h-full"
    />
)
```

3. Application
```tsx
return ( 
    <BstoreApplication
        path={"http://localhost:8080/bstore/books/book.pdf"}
        type={file?.type || ''}
        className="max-w-full max-h-full"
    />
)
```