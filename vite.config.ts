import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 按需引入
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://next.antdv.com/docs/vue/getting-started-cn#按需加载
// 如果你使用的 Vite，你可以使用 unplugin-vue-components 来进行按需加载。但是此插件无法处理非组件模块，如 message，这种组件需要手动加载：
// import { message } from 'ant-design-vue';
// import 'ant-design-vue/es/message/style/css'; //vite只能用 ant-design-vue/es 而非 ant-design-vue/lib

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			'@': '/src',
		},
	},
	plugins: [
		vue(),
		Components({
			resolvers: [
				// ElementPlusResolver(),
				// antd-vue按需引入
				AntDesignVueResolver(),
			],
			// `globalComponentsDeclaration` has renamed to `dts`
			// dts: true,
			// `customLoaderMatcher` is depreacted, use `include` instead
			// include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
		}),
	]
})
