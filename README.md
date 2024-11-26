[![npm](https://img.shields.io/npm/v/storage-sync-accessor-decorator)](https://www.npmjs.com/package/storage-sync-accessor-decorator) 
[![license](https://img.shields.io/npm/l/storage-sync-accessor-decorator)](https://github.com/js2me/storage-sync-accessor-decorator/blob/master/LICENSE)  

# storage-sync-accessor-decorator  

## Usage  

```ts
import { observable } from "mobx";
import { createStorageSyncDecorator } from "storage-sync-accessor-decorator";

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

## other cases   

```ts

import { createStorage } from 'yammies/storage';

export const storage = createStorage({
  prefix: 'my-prefix',
});


interface StorageSyncDecoratorConfig<T>
  extends Omit<GetFromStorageConfig<T>, 'key' | 'prefix'> {
  /**
   * Ключ хранилища, если не указан, то будет использовано имя свойства
   */
  key?: GetFromStorageConfig<T>['key'];
}

export const storageSync = createStorageSyncDecorator<
  StorageSyncDecoratorConfig<any>
>({
  get: storage.get,
  set: storage.set,
});

```