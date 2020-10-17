export default interface IDiskStorageEntity {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
