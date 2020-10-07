export default interface DiskStorageEntity {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
