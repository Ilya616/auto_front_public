export interface Marka {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface MarkaListResponse {
  data: Marka[];
  message?: string;
  status: 'success' | 'error';
  total?: number;
}

export function isMarkaListResponse(data: any): data is MarkaListResponse {
  return (
    Array.isArray(data) &&
    data.every((item: any) => 
      typeof item.id === 'number' &&
      typeof item.name === 'string'
    )
  );
}