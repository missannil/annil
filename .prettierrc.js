module.exports = {
	printWidth: 100,

	useTabs: true,

	tabWidth: 2,

	semi: true,

	singleQuote: true,

	quoteProps: 'as-needed',

	trailingComma: 'none', // 末尾去掉逗号

	bracketSpacing: true, // 大括号内的首尾需要空格

	rangeStart: 0, // 每个文件格式化的范围是文件的全部内容

	rangeEnd: Infinity,

	overrides: [
		{
			files: '*.wxml',
			options: {
				parser: 'html'
			}
		},
		{
			files: '*.wxss',
			options: {
				parser: 'css'
			}
		},
		{
			files: '*.wxs',
			options: {
				parser: 'babel',
				quoteProps: 'preserve'
			}
		}
	],

	proseWrap: 'preserve', // 使用默认的折行标准

	htmlWhitespaceSensitivity: 'css', // 根据显示样式决定 html 要不要折行

	endOfLine: 'lf' // 行尾 lf
};
