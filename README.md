## [Bstore](https://github.com/cartersusi/bstore)

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