export interface APIResponse {
  status: number;
  error_description?: string;
  error_code?: string;
  data?: any;
}

export const apiResponse = ({
  status,
  error_description,
  error_code,
  data,
}: APIResponse) => {
  if (!data) {
    return {
      status: status,
      data: {
        error_code: error_code,
        error_description: error_description,
      },
    };
  } else {
    return {
      status,
      data,
    };
  }
};
