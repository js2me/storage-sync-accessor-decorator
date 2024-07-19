interface StorageSyncConfigBase {
  /**
   * using to set\get value to\from storage
   * optional - because this key can be taken from context
   */
  key?: string;
}

type GetFromStorageConfig<
  StorageSyncConfig extends StorageSyncConfigBase,
  Value = any,
> = Omit<StorageSyncConfig, 'key'> & {
  key: Exclude<StorageSyncConfig['key'], undefined>;
  fallback?: Value;
};

type SetToStorageConfig<
  StorageSyncConfig extends StorageSyncConfigBase,
  Value = any,
> = Omit<StorageSyncConfig, 'key'> & {
  key: Exclude<StorageSyncConfig['key'], undefined>;
  fallback?: Value;
  value: Value;
};

type StorageSyncPayload<
  StorageSyncConfig extends StorageSyncConfigBase,
  Value,
> = Omit<GetFromStorageConfig<StorageSyncConfig, Value>, 'key'> & {
  key?: StorageSyncConfig['key'];
};

interface CreateStorageSyncDecoratorConfig<
  StorageSyncConfig extends StorageSyncConfigBase,
> {
  get: (config: GetFromStorageConfig<StorageSyncConfig>) => any;
  set: (config: SetToStorageConfig<StorageSyncConfig>) => void;
}

export const createStorageSyncDecorator = <
  StorageSyncConfig extends StorageSyncConfigBase,
>({
  get: getFromStorage,
  set: setToStorage,
}: CreateStorageSyncDecoratorConfig<StorageSyncConfig>) => {
  return function storageSync<Value>(
    baseConfig: StorageSyncPayload<StorageSyncConfig, Value>,
  ) {
    return function StorageSync(
      target: ClassAccessorDecoratorTarget<any, any>,
      context: ClassAccessorDecoratorContext<any, any>,
    ): ClassAccessorDecoratorResult<any, any> {
      const key = baseConfig.key ?? (context.name as string);

      const storageConfig = {
        ...baseConfig,
        key,
      } as GetFromStorageConfig<StorageSyncConfig, Value>;

      context.addInitializer(function () {
        context.access.set(this, getFromStorage(storageConfig));
      });

      return {
        set(value) {
          setToStorage({ ...storageConfig, value } satisfies SetToStorageConfig<
            StorageSyncConfig,
            Value
          >);
          target.set.call(this, value);
        },
      };
    };
  };
};
