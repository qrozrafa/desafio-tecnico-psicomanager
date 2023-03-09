export interface SnackMsgDto {
  message: string;
  color?: 'success' | 'error';
  duration?: number;
}
