// vite.config.ts
import { defineConfig } from "file:///C:/Users/amina/PROJET-PFE-GITHUB-STARTER/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/amina/PROJET-PFE-GITHUB-STARTER/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///C:/Users/amina/PROJET-PFE-GITHUB-STARTER/node_modules/vite-plugin-svgr/dist/index.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\Users\\amina\\PROJET-PFE-GITHUB-STARTER";
var vite_config_default = defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "."),
      "@src": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  server: {
    port: 3e3
    // to get images from the server
    // proxy: {
    //   '^/users': {
    //     target: 'http://localhost:8000/',
    //   },
    // },
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWluYVxcXFxQUk9KRVQtUEZFLUdJVEhVQi1TVEFSVEVSXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxhbWluYVxcXFxQUk9KRVQtUEZFLUdJVEhVQi1TVEFSVEVSXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9hbWluYS9QUk9KRVQtUEZFLUdJVEhVQi1TVEFSVEVSL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlYWN0KCksIHN2Z3IoKV0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLicpLFxuICAgICAgJ0BzcmMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAzMDAwLFxuXG4gICAgLy8gdG8gZ2V0IGltYWdlcyBmcm9tIHRoZSBzZXJ2ZXJcbiAgICAvLyBwcm94eToge1xuICAgIC8vICAgJ14vdXNlcnMnOiB7XG4gICAgLy8gICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8nLFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICB9LFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBa1QsU0FBUyxvQkFBb0I7QUFDL1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUNqQixPQUFPLFVBQVU7QUFIakIsSUFBTSxtQ0FBbUM7QUFNekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFBQSxFQUN6QixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxHQUFHO0FBQUEsTUFDaEMsUUFBUSxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3pDO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBUVI7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
