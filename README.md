[![npm](https://img.shields.io/npm/v/storage-sync-accessor-decorator)](https://www.npmjs.com/package/storage-sync-accessor-decorator) 
[![license](https://img.shields.io/npm/l/storage-sync-accessor-decorator)](https://github.com/js2me/storage-sync-accessor-decorator/blob/master/LICENSE)  


> [!WARNING]  
> It's fine if you use this library from NPM package with a **static versioning** in case you
> want it for some pet-project or to test it's capabilities.
>
> But for production use it's **strongly recommended** to create a fork, because I do not write
> Changelogs and may break / add some functionality without notice.  

# storage-sync-accessor-decorator  

## Usage  

```ts
import { observable } from "mobx";

const storageSync = createStorageSyncDecorator({
  get: ({ key, fallback }) => {
    return JSON.parse(localStorage.getItem(key) || '')
  },
  set: ({ key,value }) => {
    localStorage.setItem(key, JSON.stringify(value))
  }
})


class SomeModel {
  @storageSync({ key: 'foo', fallback: 10 })
  accessor foo!: number;

  @storageSync({ fallback: 10 }) // key will be 'bar'
  accessor bar!: number

  @storageSync({ fallback: '100' })
  @observable
  accessor baz!: number
}
```
