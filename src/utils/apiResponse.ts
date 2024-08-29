export interface APIResponse {
  code: number;
  error_description?: string;
  data?: any;
}

export const apiResponse = ({ code, error_description, data }: APIResponse) => {
  if (!data) {
    return {
      error_code: code,
      error_description: error_description,
    };
  } else {
    return {
      ...data,
    };
  }
};
