import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react-swc";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, "./");

  if (!env.VITE_SERVER_ORIGIN || !env.VITE_PORT) {
    throw new Error("Missing required env variables");
  }

  return {
    plugins: [react()],
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        "/socket.io": {
          target: env.VITE_SERVER_ORIGIN,
          ws: true,
        },
        "/api": {
          target: env.VITE_SERVER_ORIGIN,
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
