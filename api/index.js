const { createProxyMiddleware } = require("http-proxy-middleware");

const apiProxy = createProxyMiddleware({
  target: "https://api.myanimelist.net/",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "",
  },
  onProxyRes(proxyRes) {
    proxyRes.headers["access-control-allow-origin"] = "*";
    proxyRes.headers["access-control-allow-methods"] = "GET";
    proxyRes.headers["access-control-allow-headers"] =
      "Origin, X-Requested-With, Content-Type, Accept";
  },
});

export default function (req, res) {
  return apiProxy(req, res);
}
