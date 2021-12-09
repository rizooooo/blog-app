export interface IShowModal {
  title: string;
  message: string;
  onYesClick?: (params?: any) => void;
  onNoClick?: (params?: any) => void;
}
