export interface UserConfig {
  devto?: {
    token?: string | null;
  };
}

export const defaultUserConfig: UserConfig = {
  devto: {
    token: null,
  },
};
