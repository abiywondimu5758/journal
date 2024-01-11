// src/queries.ts
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "react-query";
import Cookies from "universal-cookie";

// types.ts or wherever you organize your types
export interface LoginResponse {
  access: string;
  refresh: string;
  // Add other fields as needed
}

export interface LogoutResponse {
  // If there is any response needed for logout
}

const cookies = new Cookies();

export const useLogin = (): {
  loginMutation: UseMutationResult<
    LoginResponse,
    unknown,
   FormData,
    unknown
  >;
  isLoggedIn: boolean;
} => {
  // Check if tokens are already present in cookies
  const existingAccessToken = cookies.get("access_token");
  const existingRefreshToken = cookies.get("refresh_token");
  const isLoggedIn = Boolean(existingAccessToken && existingRefreshToken);

  const loginMutation = useMutation<
    LoginResponse,
    unknown,
    FormData
  >(
    (credentials: FormData) => {
      if (isLoggedIn) {
        // User is already logged in, return the existing tokens
        return Promise.resolve({
          access: existingAccessToken,
          refresh: existingRefreshToken,
        });
      }

      // User is not logged in, send the login request
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch("http://127.0.0.1:8000/api/v1/token/", {
            method: "POST",
            headers: {
              // "Content-Type": "application/x-www-form-urlencoded",
            },
            body: credentials,
          }).then((response) => {
            if (!response.ok) {
              reject(new Error("Login failed")); // Handle non-2xx responses if needed
            }
            resolve(response.json());
          });
        }, 2000); // Delay for 2 seconds, adjust as needed
      });
    },
    {
      onSuccess: (data: LoginResponse) => {
        console.log("Login successful");

        // Set cookies
        cookies.set("access_token", data.access, { path: "/" });
        cookies.set("refresh_token", data.refresh, { path: "/" });
      },
    }
  );

  return { loginMutation, isLoggedIn };
};

export const useLogout = (): UseMutationResult<
  LogoutResponse,
  unknown,
  void,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<LogoutResponse, unknown, void, unknown>(
    () => {
      // Perform logout actions, e.g., clear tokens
      cookies.remove("access_token", { path: "/" });
      cookies.remove("refresh_token", { path: "/" });

      // Optional: Invalidate queries or perform other cleanup
      queryClient.invalidateQueries("entries"); // Replace with your query key
      return Promise.resolve({} as LogoutResponse); // Resolve immediately
    },
    {
      onSuccess: (data: LogoutResponse) => {
        console.log("Logout successful", data);
        // You can perform any additional actions upon successful logout
      },
    }
  );
};

export const useRegister = () => {
  // Implement register mutation using useMutation
  const registerMutation = useMutation(
    (userData: {
      first_name: string;
      last_name: string;
      email: string;
      username: string;
      password: string;
      birth_date: string;
      // Add other registration fields as needed
    }) =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          fetch("http://127.0.0.1:8000/api/v1/register/", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
          }).then((response) => {
            if (!response.ok) {
              reject(new Error("Login failed")); // Handle non-2xx responses if needed
            }
            resolve(response.json());
          });
        }, 2000); // Delay for 2 seconds, adjust as needed
      })
  );
  console.log(registerMutation);
  return registerMutation;
};

// Add more queries as needed for other authentication-related actions

export const useEntries = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");

  return useQuery(
    "entries",
    () =>
      fetch("http://127.0.0.1:8000/api/v1/entries/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch entries"); // Handle non-2xx responses if needed
        }
        return response.json();
      }),
    {
      enabled: !!accessToken, // Fetch only if the accessToken is present
    }
  );
};

export const getEntryById = async (entryId: number) => {
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  };

  const response = await fetch(
    `http://127.0.0.1:8000/api/v1/entries/${entryId}/`,
    {
      method: "GET",
      headers,
    }
  );
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch entry details");
  }
  return response.json();
};

export const useDeleteEntry = async () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (entryId: number) => {
      const accessToken = cookies.get("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/entries/${entryId}/`,
        {
          method: "DELETE",
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }
      const responseData = await response.text();
      return responseData.trim().length > 0 ? JSON.parse(responseData) : {};
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the 'entries' query after successful deletion
        queryClient.invalidateQueries("entries");
      },
    }
  );
};

export const usePutEntry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedEntry: { id: number; title: string; content: string }) => {
      const accessToken = cookies.get("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/entries/${updatedEntry.id}/`, // Make sure to include the entry ID or whatever identifier is needed
        {
          method: "PUT",
          headers,
          body: JSON.stringify(updatedEntry),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update entry");
      }
      return response.json;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the 'entries' query after successful update
        queryClient.invalidateQueries("entries");
      },
    }
  );
};

export const usePostEntry = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (updatedEntry: { title: string; content: string }) => {
      const accessToken = cookies.get("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      return new Promise((resolve, reject) => {
        // Simulate a delay of 3 seconds
        setTimeout(async () => {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/entries/`, // Make sure to include the entry ID or whatever identifier is needed
            {
              method: "POST",
              headers,
              body: JSON.stringify(updatedEntry),
            }
          );

          if (!response.ok) {
            reject(new Error("Failed to update entry"));
          }

          resolve(response.json());
        }, 3000); // 3-second delay
      });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the 'entries' query after successful update
        queryClient.invalidateQueries("entries");
      },
    }
  );
};

export const useUser = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("access_token");

  return useQuery(
    "User",
    () =>
      fetch("http://127.0.0.1:8000/api/v1/user/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user"); // Handle non-2xx responses if needed
        }
        return response.json();
      }),
    {
      enabled: !!accessToken, // Fetch only if the accessToken is present
    }
  );
};

export const usePutUser = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (formData: FormData) => {
      const accessToken = cookies.get("access_token");
      const headers = {
        // 'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch("http://127.0.0.1:8000/api/v1/user/update/", {
        method: "PUT",
        headers,
        body: formData,
      });
      if (!response.ok) {
        console.log(response.body);
        return response
      }
      return response;
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the 'user' query after successful update
        queryClient.invalidateQueries("user");
      },

    }
  );
};


export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteUserMutation = useMutation(
    async () => {
      const accessToken = cookies.get("access_token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/user/`,
        {
          method: "DELETE",
          headers,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }
      const responseData = await response.text();
      return responseData.trim().length > 0 ? JSON.parse(responseData) : {};
    },
    {
      onSuccess: () => {
        // Invalidate and refetch the 'user' query after successful deletion
        queryClient.invalidateQueries("user");
      },
    }
  );
  return deleteUserMutation;
};

export const usePostForgotPassword = () => {
  return useMutation(
    async (formData:FormData) => {
      // const accessToken = cookies.get("access_token");
      const headers = {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      };

      return new Promise((resolve, reject) => {
        // Simulate a delay of 3 seconds
        setTimeout(async () => {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/forgot-password/`, // Make sure to include the entry ID or whatever identifier is needed
            {
              method: "POST",
              headers,
              body: formData,
            }
          );

          if (!response.ok) {
            reject(new Error("Failed to send otp"));
          }

          resolve(response.json());
        }, 3000); // 3-second delay
      });
    },
    
  );
};

export const usePostVerifyOtp = () => {
  return useMutation(
    async (formData:FormData) => {
      // const accessToken = cookies.get("access_token");
      const headers = {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      };

      return new Promise((resolve, reject) => {
        // Simulate a delay of 3 seconds
        setTimeout(async () => {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/verify-forgot-password/`, // Make sure to include the entry ID or whatever identifier is needed
            {
              method: "POST",
              headers,
              body: formData,
            }
          );

          if (!response.ok) {
            reject(new Error("Failed to verify otp"));
          }

          resolve(response.json());
        }, 3000); // 3-second delay
      });
    },
    
  );
};

export const usePostChangePassword = () => {
  return useMutation(
    async (formData:FormData) => {
      // const accessToken = cookies.get("access_token");
      const headers = {
        // "Content-Type": "application/json",
        // Authorization: `Bearer ${accessToken}`,
      };

      return new Promise((resolve, reject) => {
        // Simulate a delay of 3 seconds
        setTimeout(async () => {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/change-forgot-password/`, // Make sure to include the entry ID or whatever identifier is needed
            {
              method: "POST",
              headers,
              body: formData,
            }
          );

          if (!response.ok) {
            reject(new Error("Failed to change password"));
          }

          resolve(response.json());
        }, 3000); // 3-second delay
      });
    },
    
  );
};

export const useEmailVerificationOtp = () => {
  return useMutation(
    async (formData:FormData) => {
      const accessToken = cookies.get("access_token");
      const headers = {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      return new Promise((resolve, reject) => {
        // Simulate a delay of 3 seconds
        setTimeout(async () => {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/generate-otp/`, // Make sure to include the entry ID or whatever identifier is needed
            {
              method: "POST",
              headers,
              body: formData,
            }
          );

          if (!response.ok) {
            reject(new Error("Failed to generate otp"));
          }

          resolve(response.json());
        }, 3000); // 3-second delay
      });
    },
    
  );
};

export const useVerifyEmail = () => {
  return useMutation(
    async (formData:FormData) => {
      const accessToken = cookies.get("access_token");
      const headers = {
        // "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      return new Promise((resolve, reject) => {
        // Simulate a delay of 3 seconds
        setTimeout(async () => {
          const response = await fetch(
            `http://127.0.0.1:8000/api/v1/verify-otp/`, // Make sure to include the entry ID or whatever identifier is needed
            {
              method: "POST",
              headers,
              body: formData,
            }
          );

          if (!response.ok) {
            reject(new Error("Failed to verify email"));
          }

          resolve(response.json());
        }, 3000); // 3-second delay
      });
    },
    
  );
};